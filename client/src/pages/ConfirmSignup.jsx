import React, { useState } from 'react'
import { confirmSignUp } from 'aws-amplify/auth'
import { useNavigate } from 'react-router-dom'

export default function ConfirmSignup() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      await confirmSignUp({
        username: email,
        confirmationCode: code,
      })
      setSuccess('Confirmation successful. Redirecting to login...')
      setTimeout(() => navigate('/login'), 1000)
    } catch (err) {
      setError(err?.message || 'Confirmation failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Confirm Sign Up
        </h2>

        {error && <div className="mb-4 text-red-600">{error}</div>}
        {success && <div className="mb-4 text-green-600">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />

          <input
            type="text"
            placeholder="Verification Code"
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-indigo-600 text-white rounded"
          >
            {loading ? 'Confirming…' : 'Confirm'}
          </button>
        </form>
      </div>
    </div>
  )
}
 