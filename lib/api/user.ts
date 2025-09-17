import { API_BASE_URL } from "@/constants/env"
import { storage } from "@/lib/storage"
import { Profiles } from "@/lib/types"
import type { InternalAxiosRequestConfig } from "axios"
import axios from "axios"

// Axios instance
const api = axios.create({
	baseURL: API_BASE_URL,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json"
	}
})

api.interceptors.request.use(
	async (config: InternalAxiosRequestConfig) => {
		const token = await storage.getAccessToken()
		if (token && config.headers) {
			config.headers["authorization"] = `Bearer ${token}`
		}
		return config
	},
	(error) => Promise.reject(error)
)

// api.interceptors.response.use(
// 	(response) => response,
// 	async (error) => {
// 		const originalRequest = error.config as any

// 		if (error.response?.status === 401 && !originalRequest._retry) {
// 			originalRequest._retry = true
// 			try {
// 				const refreshToken = await storage.getRefreshToken()
// 				if (!refreshToken) throw new Error("No refresh token available")

// 				const res = await axios.post<AuthTokens>(`${API_BASE_URL}/sb/auth/refresh`, { refreshToken }, { headers: { "Content-Type": "application/json" } })

// 				await storage.setAccessToken(res.data.accessToken, res.data.refreshToken)

// 				originalRequest.headers["authorization"] = `Bearer ${res.data.accessToken}`
// 				return api(originalRequest)
// 			} catch (err) {
// 				await storage.setAccessToken("", "") // clear
// 				return Promise.reject(err)
// 			}
// 		}

// 		return Promise.reject(error)
// 	}
// )

// Get all user profiles (optionally add pagination/filtering)
export async function getAllProfiles(params?: { page?: number; limit?: number; search?: string }): Promise<Profiles[]> {
	const res = await api.get<{ profiles: Profiles[] }>("/sb/admin/users", { params })
	return res.data.profiles
}
