import { User } from "../types";

export async function fetchUsers(): Promise<User[]> {
  return fetch("http://localhost:3001/get_users")
    .then((res) => {
      if (!res.ok) {
        throw new Error('Failed to fetch users');
      }
      return res.json();
    })
    .then((data) => data.data)
    .catch((error) => {
      console.error('Error fetching users:', error);
      throw error;
    });
}
