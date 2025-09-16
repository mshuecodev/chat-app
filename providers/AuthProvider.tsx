import { login, logout, signUp } from "@/lib/api/auth"
import { storage } from "@/lib/storage"
import type { User } from "@/lib/types"
import * as SplashScreen from "expo-splash-screen"
import React, { createContext, useContext, useEffect, useMemo, useState } from "react"

SplashScreen.preventAutoHideAsync().catch(() => {})

type AuthState = {
	user: User | null
	accessToken?: string
	isBootstrapping: boolean
}

type AuthContextValue = {
	user: User | null
	accessToken?: string
	isBootstrapping: boolean
	signIn: (email: string, password: string) => Promise<void>
	signUpUser: (email: string, password: string) => Promise<string>
	signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [state, setState] = useState<AuthState>({
		user: null,
		accessToken: undefined,
		isBootstrapping: false
	})

	useEffect(() => {
		const init = async () => {
			console.log("AuthProvider init")
			// try {
			// 	await refresh()
			// } catch {
			// 	setState((s) => ({ ...s, user: null }))
			// } finally {
			// 	setState((s) => ({ ...s, isBootstrapping: false }))
			// 	SplashScreen.hideAsync().catch(() => {})
			// }
		}
		init()
	}, [])

	const signIn = async (email: string, password: string) => {
		const { accessToken, refreshToken, user } = await login({ email, password })
		// Optionally persist tokens/user in storage if needed
		// await Promise.all([storage.setAccessToken(accessToken), storage.setRefreshToken(rToken), storage.setUser(user)]);
		setState({ user, accessToken, isBootstrapping: false })
	}

	const signUpUser = async (email: string, password: string) => {
		const { message } = await signUp({ email, password })
		// Do not set user or tokens, just return the message for UI
		return message
	}

	const signOut = async () => {
		await logout()
		await storage.clearAll()
		setState({ user: null, accessToken: undefined, isBootstrapping: false })
	}

	const value = useMemo<AuthContextValue>(
		() => ({
			user: state.user,
			accessToken: state.accessToken,
			isBootstrapping: state.isBootstrapping,
			signIn,
			signUpUser,
			signOut
		}),
		[state.user, state.accessToken, state.isBootstrapping]
	)

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
	const ctx = useContext(AuthContext)
	if (!ctx) throw new Error("useAuth must be used within AuthProvider")
	return ctx
}
