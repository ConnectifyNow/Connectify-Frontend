'use client'

import {Link, useNavigate} from 'react-router-dom'
// import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const router = useNavigate()

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary">Connectify</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              to="/home"
              className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link to="/filter" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Find Help
            </Link>
            <Link to="/chat" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Chat
            </Link>
            <Link to="/profile" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Profile
            </Link>
            <Button variant="outline" className="ml-4" onClick={() =>  router('/signin')}>Sign In</Button>
            <Button className="ml-2" onClick={() => router('/signup')}>Sign Up</Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

