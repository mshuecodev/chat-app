import { API_BASE_URL } from "@/constants/env"
import { AuthTokens, User } from "@/lib/types"
import axios from "axios"
// Attach access token to every request if available
import type { InternalAxiosRequestConfig } from "axios"

export type AuthPayload = { email: string; password: string }
export type SignUpResponse = {
	message: string // e.g., "Verification email sent"
}

// In-memory token storage (avoid localStorage for XSS safety)
let accessToken: string | null = null
let refreshToken: string | null = null

// Axios instance
const api = axios.create({
	baseURL: API_BASE_URL,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json"
	}
})

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	if (accessToken && config.headers) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}
	return config
})

// Handle token refresh on 401 errors
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config
		if (error.response?.status === 401 && !originalRequest._retry && refreshToken) {
			originalRequest._retry = true
			try {
				const res = await api.post<AuthTokens>("/sb/auth/refresh", { refreshToken })
				accessToken = res.data.accessToken
				refreshToken = res.data.refreshToken
				if (originalRequest.headers) originalRequest.headers.Authorization = `Bearer ${accessToken}`
				return api(originalRequest)
			} catch (refreshError) {
				// Optionally: logout user or redirect to login
				accessToken = null
				refreshToken = null
				return Promise.reject(refreshError)
			}
		}
		const message = error.response?.data?.message || error.message || "An error occurred"
		return Promise.reject(new Error(message))
	}
)

// Auth API functions

export async function signUp(payload: AuthPayload): Promise<SignUpResponse> {
	const res = await api.post<SignUpResponse>("/sb/auth/signup", payload)
	return res.data
}

export async function login(payload: AuthPayload): Promise<{ user: User } & AuthTokens> {
	const res = await api.post<{ user: User } & AuthTokens>("/sb/auth/signin", payload)
	
	accessToken = res.data.accessToken
	refreshToken = res.data.refreshToken
	return res.data
}

export async function logout(): Promise<void> {
	await api.post("/sb/auth/logout")
	accessToken = null
	refreshToken = null
}

export async function getCurrentUser(): Promise<User> {
	const res = await api.get<{ user: User }>("/sb/profile")
	return res.data.user
}
