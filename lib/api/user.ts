import { API_BASE_URL } from "@/constants/env"
import { Profiles } from "@/lib/types"
import axios from "axios"

const api = axios.create({
	baseURL: API_BASE_URL,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json"
	}
})

// Get all user profiles (optionally add pagination/filtering)
export async function getAllProfiles(params?: { page?: number; limit?: number; search?: string }): Promise<Profiles[]> {
	const res = await api.get<{ profiles: Profiles[] }>("/sb/admin/users", { params })
	return res.data.profiles
}
