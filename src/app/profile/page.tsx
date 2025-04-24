'use client'

import { Save } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { ClipLoader, MoonLoader, RingLoader } from 'react-spinners';
import { toast, Toaster } from 'sonner';

interface User {
    id: number
    username: string
    email: string
    password: string
    role: number
    createdAt: string
    updatedAt: string
    deleted: boolean
}

const initialUser: User = {
    id: 0,
    username: '',
    email: '',
    password: '',
    role: 0,
    createdAt: '',
    updatedAt: '',
    deleted: false,
}

export default function ProfilePage() {
    // localStorage.setItem('mock-user', JSON.stringify({
    //     id: 1,
    //     username: 'leminhtuan',
    //     email: 'tuan.le@hikari.vn',
    //     password: 'hashedpass123',
    //     role: 1,
    //     createdAt: '2024-01-01T08:00:00Z',
    //     updatedAt: '2024-02-01T08:00:00Z',
    //     deleted: false
    // }))
    // console.log('Đã lưu lại dữ liệu mock-user ')
    const [activeSection, setActiveSection] = useState<'profile' | 'password' | 'payment'>('profile');
    const [isLoading, setIsLoading] = useState(true);

    const [user, setUser] = useState<User>(initialUser)
    const [newUsername, setNewUsername] = useState(user.username)
    const [newEmail, setNewEmail] = useState(user.email)

    useEffect(() => {
        const storedUser = localStorage.getItem('mock-user')

        if (storedUser) {
            const parsedUser = JSON.parse(storedUser) as User
            const userId = parsedUser.id

            const fetchUser = async () => {
                try {
                    const response = await fetch(`http://localhost:3001/users/${userId}`)
                    const data = await response.json()
                    setUser(data)
                    setNewUsername(data.username)
                    setNewEmail(data.email)
                } catch (error) {
                    console.error('Lỗi khi fetch user:', error)
                } finally {
                    setIsLoading(false)
                }
            }

            // timeout test
            setTimeout(() => {
                fetchUser()
            }, 1000)
        } else {
            setIsLoading(false)
        }
    }, [])


    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault()

        const updatedUser = {
            ...user,
            username: newUsername,
            email: newEmail,
            updatedAt: new Date().toISOString()
        }

        try {
            const res = await fetch(`http://localhost:3001/users/${user.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUser),
            })

            if (res.ok) {
                setUser(updatedUser)
                toast.success('Cập nhật thành công!')
            } else {
                toast.error('Cập nhật thất bại!')
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật user:', error)
            toast.error('Có lỗi xảy ra khi cập nhật!')
        }
    }


    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-gray-100 flex justify-center items-center z-50">
                <MoonLoader
                    color="#3B82F6" size={30} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
            <Toaster
                position="top-right"
                richColors
                closeButton={false}
                expand={true}
                duration={4000}
            />

            <div className="max-w-screen-xl mx-auto bg-white p-8 rounded-2xl shadow-md space-y-10">
                <h1 className="text-4xl font-bold text-center text-gray-900 tracking-tight">
                    Thông tin người dùng
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
                    {/* Left Column */}
                    <div className="md:col-span-1 flex flex-col items-center space-y-6 min-w-[300px] max-w-[350px] mx-auto">
                        {/* Avatar ở giữa */}
                        <div className="relative">
                            <img
                                src="https://i.pravatar.cc/150?img=4"
                                alt="Avatar"
                                className="w-32 h-32 rounded-full border-4 border-indigo-200 object-cover shadow-lg"
                            />
                        </div>

                        {/* Tên và Email */}
                        <div className="text-center">
                            <p className="text-2xl font-semibold text-gray-800">{user.username}</p>
                            <p className="text-sm text-gray-600 mt-1 break-words">{user.email}</p>
                        </div>

                        {/* Info dưới (không còn email) */}
                        <div className="space-y-4 text-sm text-gray-600 w-full">
                            <div className="border-t border-gray-200 pt-4">
                                <p>{user.role === 1 ? 'Quản trị viên' : 'Người dùng'}</p>
                            </div>
                            <div className="border-t border-gray-200 pt-4">
                                <p className="font-medium text-gray-800">Ngày tạo: {new Date(user.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="border-t border-b border-gray-200 py-4">
                                <p className="font-medium text-gray-800">Cập nhật gần nhất: {new Date(user.updatedAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Navigation Tabs */}
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={() => setActiveSection('profile')}
                                className={`px-4 py-2 rounded-md text-sm font-medium ${activeSection === 'profile'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                Cập nhật thông tin
                            </button>
                            <button
                                onClick={() => setActiveSection('password')}
                                className={`px-4 py-2 rounded-md text-sm font-medium ${activeSection === 'password'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                Đổi mật khẩu
                            </button>
                            <button
                                onClick={() => setActiveSection('payment')}
                                className={`px-4 py-2 rounded-md text-sm font-medium ${activeSection === 'payment'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                Thông tin thanh toán
                            </button>
                        </div>

                        {/* Cập nhật thông tin */}
                        {activeSection === 'profile' && (
                            <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-5">Cập nhật thông tin</h2>
                                <form onSubmit={handleProfileUpdate} className="space-y-5">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                            Email
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={newEmail}
                                            onChange={(e) => setNewEmail(e.target.value)}
                                            className="mt-1 block w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-200 text-sm shadow-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                            Tên người dùng
                                        </label>
                                        <input
                                            id="username"
                                            type="text"
                                            value={newUsername}
                                            onChange={(e) => setNewUsername(e.target.value)}
                                            className="mt-1 block w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-200 focus:border-blue-200 text-sm shadow-sm"
                                            required
                                        />
                                    </div>
                                    <div className="flex justify-end pt-2">
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center py-2.5 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-200 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            <Save className="h-5 w-5 mr-2" />
                                            Lưu thay đổi
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Đổi mật khẩu */}
                        {activeSection === 'password' && (
                            <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-5">Đổi mật khẩu</h2>
                                <p className="text-sm text-gray-600">Chức năng này sẽ được cập nhật sau.</p>
                                {/* <form onSubmit={(e) => { e.preventDefault(); alert('Mật khẩu đã được cập nhật!') }} className="space-y-5">
                                    <input type="password" placeholder="Mật khẩu hiện tại" className="w-full px-4 py-2.5 border rounded-lg text-sm" required />
                                    <input type="password" placeholder="Mật khẩu mới" className="w-full px-4 py-2.5 border rounded-lg text-sm" required />
                                    <input type="password" placeholder="Xác nhận mật khẩu" className="w-full px-4 py-2.5 border rounded-lg text-sm" required />
                                    <div className="flex justify-end pt-2">
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center py-2.5 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                        >
                                            <Save className="h-5 w-5 mr-2" />
                                            Đổi mật khẩu
                                        </button>
                                    </div>
                                </form> */}
                            </div>
                        )}

                        {/* Thông tin thanh toán */}
                        {activeSection === 'payment' && (
                            <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-5">Thông tin thanh toán</h2>
                                <p className="text-sm text-gray-600">Chức năng này sẽ được cập nhật sau.</p>
                            </div>
                        )}
                    </div>


                </div>
            </div>
        </div>

    )
}
