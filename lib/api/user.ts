import { api } from "@/lib/api"
import { Profiles } from "@/lib/types"

// Get all user profiles (optionally add pagination/filtering)
export async function getAllProfiles(params?: { page?: number; limit?: number; search?: string }): Promise<Profiles[]> {
	const res = await api.get<{ profiles: Profiles[] }>("/sb/admin/users", { params })
	return res.data.profiles
}
