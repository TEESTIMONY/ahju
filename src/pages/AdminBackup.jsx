import React, { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'

const AdminBackup = () => {
  const location = useLocation()
  const [downloading, setDownloading] = useState(false)
  const [importing, setImporting] = useState(false)
  const [backupFile, setBackupFile] = useState(null)
  const [message, setMessage] = useState('')

  const urlPasskey = useMemo(() => {
    const params = new URLSearchParams(location.search)
    return (params.get('passkey') || '').trim()
  }, [location.search])

  const expectedPasskey = (import.meta.env.VITE_ADMIN_BACKUP_PASSKEY || '').trim()
  const isPasskeyValid = Boolean(expectedPasskey) && urlPasskey === expectedPasskey

  const handleDownload = async () => {
    const accessToken = localStorage.getItem('ahju_access_token')
    if (!accessToken) {
      setMessage('Admin access token not found. Please login as admin first.')
      return
    }

    setDownloading(true)
    setMessage('')

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://ahju-backend-api.onrender.com'
      const response = await fetch(`${apiBaseUrl}/api/admin/export/full/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (!response.ok) {
        let errorText = 'Backup download failed.'
        try {
          const data = await response.json()
          errorText = data?.detail || errorText
        } catch {
          // ignore json parse errors
        }
        throw new Error(errorText)
      }

      const blob = await response.blob()
      const contentDisposition = response.headers.get('Content-Disposition') || ''
      const filenameMatch = contentDisposition.match(/filename="?([^";]+)"?/i)
      const filename = filenameMatch?.[1] || `ahju-full-backup-${new Date().toISOString().slice(0, 10)}.json`

      const downloadUrl = URL.createObjectURL(blob)
      const anchor = document.createElement('a')
      anchor.href = downloadUrl
      anchor.download = filename
      document.body.appendChild(anchor)
      anchor.click()
      document.body.removeChild(anchor)
      URL.revokeObjectURL(downloadUrl)

      setMessage('Backup downloaded successfully.')
    } catch (err) {
      setMessage(err.message || 'Backup download failed.')
    } finally {
      setDownloading(false)
    }
  }

  const handleImport = async () => {
    const accessToken = localStorage.getItem('ahju_access_token')
    if (!accessToken) {
      setMessage('Admin access token not found. Please login as admin first.')
      return
    }
    if (!backupFile) {
      setMessage('Please choose a backup JSON file first.')
      return
    }

    setImporting(true)
    setMessage('')

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://ahju-backend-api.onrender.com'
      const formData = new FormData()
      formData.append('file', backupFile)

      const response = await fetch(`${apiBaseUrl}/api/admin/import/full/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      })

      let detail = 'Import completed.'
      try {
        const data = await response.json()
        detail = data?.detail || detail
      } catch {
        // ignore JSON parse failures
      }

      if (!response.ok) {
        throw new Error(detail || 'Import failed.')
      }

      setMessage(detail)
      setBackupFile(null)
    } catch (err) {
      setMessage(err.message || 'Import failed.')
    } finally {
      setImporting(false)
    }
  }

  if (!isPasskeyValid) {
    return (
      <div className="min-h-screen bg-site flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-300 bg-white p-6 text-center">
          <h1 className="text-xl font-bold text-red-600">Access denied</h1>
          <p className="mt-2 text-sm text-brand-slate/80">Valid passkey is required in URL.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-site flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-brand-slate/10 bg-white p-6 text-center shadow-sm">
        <h1 className="text-xl font-bold text-brand-charcoal">Admin Backup</h1>
        <p className="mt-2 text-sm text-brand-slate/75">Download full database backup JSON.</p>

        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading || importing}
          className="mt-5 w-full rounded-xl bg-brand-green px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#489b2d] disabled:opacity-70"
        >
          {downloading ? 'Downloading...' : 'Download Backup'}
        </button>

        <div className="mt-4 rounded-xl border border-brand-slate/15 p-3 text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-brand-slate/70">Restore backup</p>
          <input
            type="file"
            accept="application/json,.json"
            onChange={(e) => setBackupFile(e.target.files?.[0] || null)}
            className="mt-2 block w-full text-xs text-brand-slate file:mr-3 file:rounded-lg file:border-0 file:bg-brand-slate/10 file:px-3 file:py-2 file:text-xs file:font-medium file:text-brand-charcoal"
          />
          <button
            type="button"
            onClick={handleImport}
            disabled={importing || downloading}
            className="mt-3 w-full rounded-xl border border-brand-slate/20 px-4 py-2.5 text-sm font-semibold text-brand-charcoal hover:bg-brand-slate/5 disabled:opacity-70"
          >
            {importing ? 'Importing...' : 'Import Backup'}
          </button>
        </div>

        {message && <p className="mt-3 text-sm text-brand-slate/85">{message}</p>}
      </div>
    </div>
  )
}

export default AdminBackup
