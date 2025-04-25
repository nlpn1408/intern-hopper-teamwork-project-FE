'use client';

import Link from 'next/link';
import Form from 'next/form';
import { useSearchParams, useRouter } from 'next/navigation';

import React, { Usable, useEffect, useState } from 'react';
import { fetchUsers } from '@/services/api';
import { User } from '@/type';

type SearchParams = {
  query: string;
};

export default function UserListPage({ searchParams }: { searchParams: SearchParams }) {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { query = "" } = React.use<SearchParams>(searchParams as unknown as Usable<SearchParams>);

  const [filterUsers, setFilterUsers] = useState<User[]>([]);


  const usersPerPage = 5;
  const searchParamsHook = useSearchParams();
  const router = useRouter();
  const pageParam = searchParamsHook.get('page');
  const currentPage = pageParam ? parseInt(pageParam) : 1;

  const [paginatedUsers, setPaginatedUsers] = useState<User[]>([]);

  useEffect(() => {
    const start = (currentPage - 1) * usersPerPage;
    const end = start + usersPerPage;
    setPaginatedUsers(filterUsers.slice(start, end));
  }, [filterUsers, currentPage]);

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParamsHook.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };

  const totalPages = Math.ceil(filterUsers.length / usersPerPage);


  useEffect(() => {
    const getUsers = async () => {
      try {
        setIsLoading(true);

        const users = await fetchUsers();
        setUsers(users);

        const filteredUsers = users.filter(user => {
          return user.username.toLowerCase().includes(query.toLowerCase()) || user.email.toLowerCase().includes(query.toLowerCase());
        });
        setFilterUsers(filteredUsers);
      } catch (err: any) {
        console.error('Error fetching users:', err);
        setError(err.message || 'Đã xảy ra lỗi không xác định.');
      } finally {
        setIsLoading(false);
      }
    };

    getUsers();
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      if (query.trim().length === 0) {
        setFilterUsers(users);
        return;
      }
      const filteredUsers = users.filter(user => {
        return user.username.toLowerCase().includes(query.toLowerCase()) || user.email.toLowerCase().includes(query.toLowerCase());
      });
      setFilterUsers(filteredUsers);
    };

    getUsers();
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:rounded-2xl shadow w-full">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Danh sách người dùng</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded">
            {error}
          </div>
        )}

        <div className="mb-6">
          <Link
            href="/users/add"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Thêm người dùng
          </Link>
        </div>

        <Form action="/users" className="mb-6 flex flex-col sm:flex-row gap-4 sm:items-center">
          <input
            name="query"
            placeholder="Tìm kiếm theo tên hoặc email..."
            className="flex-1 text-black placeholder:text-gray-300 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
          >
            Tìm kiếm
          </button>
        </Form>

        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <ul className="space-y-4">
            {paginatedUsers.map(user => (
              <li
                key={user.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 p-4 rounded shadow-sm space-y-2 sm:space-y-0"
              >
                <div>
                  <p className="font-semibold text-black">{user.username}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-xs text-gray-400">Tạo lúc: {new Date(user.createdAt).toLocaleString()}</p>
                </div>
                <div className="space-x-2">
                  <Link
                    href={`/users/${user.id}`}
                    className="inline-block px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </li>
            ))}

          </ul>
        )}

        {!isLoading && (
          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={() => goToPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
            >
              Trang trước
            </button>
            <span className="text-gray-700">
              Trang {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50 hover:cursor-pointer disabled:cursor-not-allowed"
            >
              Trang sau
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
