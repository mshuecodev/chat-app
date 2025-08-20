import { API_BASE_URL } from "@/constants/env"
import { AuthTokens, User } from "@/lib/types"

export type AuthPayload = { email: string; password: string }

export async function login(payload: AuthPayload): Promise<{ user: User } & AuthTokens> {
	const res = await fetch(`${API_BASE_URL}/auth/signin`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload)
	})
	if (!res.ok) throw new Error("Invalid credentials")
	return res.json()
}

export async function fetchWithAuth<T>(url: string, accessToken?: string, init?: RequestInit): Promise<T> {
	const res = await fetch(`${API_BASE_URL}${url}`, {
		...init,
		headers: {
			...(init?.headers || {}),
			Authorization: accessToken ? `Bearer ${accessToken}` : "",
			"Content-Type": "application/json"
		}
	})
	if (!res.ok) throw new Error(`Request failed: ${res.status}`)
	return res.json()
}

export async function refreshToken(refreshToken: string): Promise<AuthTokens> {
	const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ refreshToken })
	})
	if (!res.ok) throw new Error("Refresh failed")
	return res.json()
}

export async function signUp(payload: AuthPayload): Promise<{ user: User }> {
	const res = await fetch(`${API_BASE_URL}/auth/signup`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload)
	})

	if (!res.ok) {
		const err = await res.json().catch(() => ({}))
		throw new Error(err.message || "Signup failed")
	}

	return res.json()
}
