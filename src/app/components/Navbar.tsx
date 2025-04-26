'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      })
  
      console.log('Logout status:', res.status)
  
      if (res.ok) {
        router.push('/login')
      } else {
        alert('Đăng xuất thất bại')
      }
    } catch (error) {
      console.error('Lỗi đăng xuất:', error)
    }
  }
  

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="cursor-pointer" onClick={() => router.push('/')}>
        <img src="/hopper.jpg" alt="Logo" className="h-[50px] w-[50px] object-contain" />
      </div>
      <button
        onClick={handleLogout}
        className="bg-white text-blue-600 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition"
      >
        Đăng xuất
      </button>
    </nav>
  )
  
}

export default Navbar
