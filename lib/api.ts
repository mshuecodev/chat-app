// lib/api.ts
import { API_BASE_URL } from "@/constants/env"
import { storage } from "@/lib/storage"
import axios, { InternalAxiosRequestConfig } from "axios"

const api = axios.create({
	baseURL: API_BASE_URL,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json"
	}
})

// Attach token automatically
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

// ✅ Optionally: attach refresh-token interceptor (if not already in global api setup)

export { api }
