import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import {
  getCurrentUser,
  fetchUserAttributes,
  updateUserAttributes,
} from 'aws-amplify/auth'

const Profile = () => {
  const { user, setUser } = useAuth()
  const [name, setName] = useState('')
  const [preview, setPreview] = useState(null)
  const [file, setFile] = useState(null)
  const [saving, setSaving] = useState(false)

 useEffect(() => {
  if (!user) return

  const loadAttributes = async () => {
    try {
      const attrs = await fetchUserAttributes()
      setName(attrs.name || user.username || attrs.email || '')
      setPreview(attrs.picture || null)
    } catch (err) {
      console.error('Failed to load attributes', err)
    }
  }

  loadAttributes()
}, [user])


  if (!user) {
    return <div className="p-10">Not logged in</div>
  }

  const handleFile = (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    const reader = new FileReader()
    reader.onload = (ev) => setPreview(ev.target.result)
    reader.readAsDataURL(f)
  }

  const handleSave = async (e) => {
  e.preventDefault()
  setSaving(true)

  try {
    const attributes = { name }

    await updateUserAttributes({
      userAttributes: attributes,
    })

    // refetch updated attributes
    const refreshedAttributes = await fetchUserAttributes()

    setUser((prev) => ({
      ...prev,
      attributes: refreshedAttributes,
    }))
  } catch (err) {
    console.error('Update failed', err)
    alert('Failed to update profile')
  } finally {
    setSaving(false)
  }
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSave} className="bg-white p-8 rounded shadow w-full max-w-sm">
        <div className="flex flex-col items-center">
          <img
            src={preview || `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&background=random`}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4 object-cover"
          />

          <label className="text-sm text-gray-600 mb-2">Change profile picture</label>
          <input type="file" accept="image/*" onChange={handleFile} />
        </div>

        <div className="mt-4">
          <label className="block text-sm text-gray-700">Display name</label>
          <input
            className="mt-1 block w-full rounded border-gray-300 shadow-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Profile
