import { API_BASE_URL } from "@/constants/env"
import { AuthTokens, Profiles } from "@/lib/types"
import type { InternalAxiosRequestConfig } from "axios"
import axios from "axios"

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
		config.headers["authorization"] = `Bearer ${accessToken}`
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
				if (originalRequest.headers) originalRequest.headers["authorization"] = `Bearer ${accessToken}`
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

// Get all user profiles (optionally add pagination/filtering)
export async function getAllProfiles(params?: { page?: number; limit?: number; search?: string }): Promise<Profiles[]> {
	const res = await api.get<{ profiles: Profiles[] }>("/sb/admin/users", { params })
	return res.data.profiles
}
