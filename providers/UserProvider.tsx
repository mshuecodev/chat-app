import { getAllProfiles } from "@/lib/api/user"
import type { User } from "@/lib/types"
import React, { createContext, useCallback, useContext, useState } from "react"

type UserContextValue = {
	users: User[] | null
	selectedUser: User | null
	loading: boolean
	error: string | null
	fetchUsers: (params?: { page?: number; limit?: number; search?: string }) => Promise<void>
	// selectUser: (userId: string) => Promise<void>
	// updateUser: (userId: string, data: Partial<User>) => Promise<User | null>
	// deleteUser: (userId: string) => Promise<void>
	// clearSelectedUser: () => void
}

const UserContext = createContext<UserContextValue | null>(null)

export function UserProvider({ children }: { children: React.ReactNode }) {
	const [users, setUsers] = useState<User[] | null>(null)
	const [selectedUser, setSelectedUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const fetchUsers = useCallback(async (params?: { page?: number; limit?: number; search?: string }) => {
		setLoading(true)
		setError(null)
		try {
			const data = await getAllProfiles(params)
			setUsers(data)
		} catch (e: any) {
			setError(e?.message || "Failed to fetch users")
		} finally {
			setLoading(false)
		}
	}, [])

	// const selectUser = useCallback(async (userId: string) => {
	//     setLoading(true)
	//     setError(null)
	//     try {
	//         const user = await getProfileById(userId)
	//         setSelectedUser(user)
	//     } catch (e: any) {
	//         setError(e?.message || "Failed to fetch user")
	//     } finally {
	//         setLoading(false)
	//     }
	// }, [])

	// const updateUser = useCallback(async (userId: string, data: Partial<User>) => {
	//     setLoading(true)
	//     setError(null)
	//     try {
	//         const updated = await updateProfile(userId, data)
	//         setSelectedUser(updated)
	//         // Optionally update users list
	//         setUsers((prev) =>
	//             prev ? prev.map((u) => (u.id === userId ? updated : u)) : prev
	//         )
	//         return updated
	//     } catch (e: any) {
	//         setError(e?.message || "Failed to update user")
	//         return null
	//     } finally {
	//         setLoading(false)
	//     }
	// }, [])

	// const deleteUser = useCallback(async (userId: string) => {
	//     setLoading(true)
	//     setError(null)
	//     try {
	//         await deleteProfile(userId)
	//         setUsers((prev) => (prev ? prev.filter((u) => u.id !== userId) : prev))
	//         if (selectedUser?.id === userId) setSelectedUser(null)
	//     } catch (e: any) {
	//         setError(e?.message || "Failed to delete user")
	//     } finally {
	//         setLoading(false)
	//     }
	// }, [selectedUser])

	// const clearSelectedUser = () => setSelectedUser(null)

	const value: UserContextValue = {
		users,
		selectedUser,
		loading,
		error,
		fetchUsers
		// selectUser,
		// updateUser,
		// deleteUser,
		// clearSelectedUser
	}

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
	const ctx = useContext(UserContext)
	if (!ctx) throw new Error("useUser must be used within UserProvider")
	return ctx
}
