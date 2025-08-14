import * as SecureStore from "expo-secure-store"

const ACCESS_KEY = "access_token" as const
const REFRESH_KEY = "refresh_token" as const
const USER_KEY = "auth_user" as const

const isWeb = typeof window !== "undefined"

const webStorage = {
	getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
	setItem: (key: string, value: string) => Promise.resolve(localStorage.setItem(key, value)),
	deleteItem: (key: string) => Promise.resolve(localStorage.removeItem(key))
}

const store = isWeb
	? webStorage
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
