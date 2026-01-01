import React, { useState } from 'react'
import { signUp } from 'aws-amplify/auth'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


export default function Signup() {
    const navigate = useNavigate()
    
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await signUp({
        username: email,
        password,
      })
      setSuccess('Account created. Check your email to verify.')
      navigate('/confirm-signup')
    } catch (err) {
      setError(err?.message || 'Sign up failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Sign Up</h2>

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
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-green-600 text-white rounded"
          >
            {loading ? 'Signing up…' : 'Sign Up'}
          </button>
            <p className="text-sm text-center text-gray-600 mt-4">
                  Already have an account?{' '}
                  <Link to="/login" className="text-blue-600 hover:underline">
                      Log in
                  </Link>
              </p>

        </form>
      </div>
    </div>
  )
}
