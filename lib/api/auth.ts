// lib/api/auth.ts
import { API_BASE_URL } from "@/constants/env"
import { AuthTokens, User } from "@/lib/types"

export type AuthPayload = { email: string; password: string }

export async function signUp(payload: AuthPayload): Promise<{ user: User }> {
	const res = await fetch(`${API_BASE_URL}/auth/signup`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include", // ✅ cookies handled automatically
		body: JSON.stringify(payload)
	})

	if (!res.ok) {
		const err = await res.json().catch(() => ({}))
		throw new Error(err.message || "Signup failed")
	}

	return res.json()
}

export async function login(payload: AuthPayload): Promise<{ user: User } & AuthTokens> {
	const res = await fetch(`${API_BASE_URL}/auth/signin`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include", // ✅ ensures cookies are sent/received
		body: JSON.stringify(payload)
	})

	if (!res.ok) throw new Error("Invalid credentials")

	return res.json()
}

export const refreshToken = async () => {
	return fetch(`${API_BASE_URL}/auth/refresh`, {
		method: "POST",
		credentials: "include" // send cookie
	})
}
