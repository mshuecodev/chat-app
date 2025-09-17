import * as SecureStore from "expo-secure-store"
import { Platform } from "react-native"

const ACCESS_KEY = "access_token" as const
const REFRESH_KEY = "refresh_token" as const
const USER_KEY = "auth_user" as const

// const isWeb = typeof window !== "undefined"
const isWeb = Platform.OS === "web"

// Use in-memory storage for web for better security (tokens are lost on refresh, but not exposed to XSS)
const memoryStore: Record<string, string | null> = {}

const webMemoryStorage = {
	getItem: async (key: string) => memoryStore[key] ?? null,
	setItem: async (key: string, value: string) => {
		memoryStore[key] = value
	},
	deleteItem: async (key: string) => {
		memoryStore[key] = null
	}
}

const store = isWeb
	? webMemoryStorage
	: {
			getItem: SecureStore.getItemAsync,
			setItem: SecureStore.setItemAsync,
			deleteItem: SecureStore.deleteItemAsync
	  }

export const storage = {
	getAccessToken: () => store.getItem(ACCESS_KEY),
	setAccessToken: (v: string) => store.setItem(ACCESS_KEY, v),
	delAccessToken: () => store.deleteItem(ACCESS_KEY),

	getRefreshToken: () => store.getItem(REFRESH_KEY),
	setRefreshToken: (v: string) => store.setItem(REFRESH_KEY, v),
	delRefreshToken: () => store.deleteItem(REFRESH_KEY),

	getUser: async <T = unknown>() => {
		const raw = await store.getItem(USER_KEY)
		return raw ? (JSON.parse(raw) as T) : null
	},
	setUser: (u: unknown) => store.setItem(USER_KEY, JSON.stringify(u)),
	delUser: () => store.deleteItem(USER_KEY),

	clearAll: async () => {
		await Promise.all([store.deleteItem(ACCESS_KEY), store.deleteItem(REFRESH_KEY), store.deleteItem(USER_KEY)])
	}
}
