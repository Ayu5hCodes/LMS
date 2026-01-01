import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

const Navbar = () => {
  const location = useLocation()
  const isCourseListPage = location.pathname.includes('/course-list')

  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${
        isCourseListPage ? 'bg-white' : 'bg-gray-100/70'
      }`}
    >
      <img
        src={assets.logo}
        alt="Logo"
        className="w-40 lg:w-52 cursor-pointer"
      />

      <div className="hidden md:flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-5">
          { user &&
          <>  
            <button>Become Educator</button>
          <Link to="/my-enrollments">My Enrollments</Link>
          </>}
        </div>

        {/* LOGGED OUT */}
        {!user && (
          <Link to="/signup">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-full">
              Create Account
            </button>
          </Link>
        )}

        {/* LOGGED IN */}
        {user && (
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="w-9 h-9 rounded-full overflow-hidden border"
            >
              <img
                src={
                user?.attributes?.picture ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user?.signInDetails?.loginId || 'User'
                    )}&background=random`
                            }
                      alt="User"
                      className="w-full h-full object-cover"
              />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow-md z-50">
                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Manage account
                </Link>

                <button
                  onClick={() => {
                    logout()
                    setOpen(false)
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
