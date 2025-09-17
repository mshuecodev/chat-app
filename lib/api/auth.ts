import { api } from "@/lib/api"
import { AuthTokens, User } from "@/lib/types"

export type AuthPayload = { email: string; password: string }
export type SignUpResponse = {
	message: string // e.g., "Verification email sent"
}

// Auth API functions
export async function signUp(payload: AuthPayload): Promise<SignUpResponse> {
	const res = await api.post<SignUpResponse>("/sb/auth/signup", payload)
	return res.data
}

export async function login(payload: AuthPayload): Promise<{ user: User } & AuthTokens> {
	const res = await api.post<{ user: User } & AuthTokens>("/sb/auth/signin", payload)
	return res.data
}

// export async function logout(): Promise<void> {
// 	await api.post("/sb/auth/logout")
// }

export async function getCurrentUser(): Promise<User> {
	const res = await api.get<{ user: User }>("/sb/profile")
	return res.data.user
}
