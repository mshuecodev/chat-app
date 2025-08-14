import { login, refreshToken } from "@/lib/api"
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
	signOut: () => Promise<void>
	refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [state, setState] = useState<AuthState>({ user: null, accessToken: undefined, isBootstrapping: true })

	// Bootstrap session from SecureStore
	useEffect(() => {
		;(async () => {
			try {
				const [accessToken, user] = await Promise.all([storage.getAccessToken(), storage.getUser<User>()])
				setState((s) => ({ ...s, user: user ?? null, accessToken: accessToken ?? undefined }))
			} finally {
				setState((s) => ({ ...s, isBootstrapping: false }))
				SplashScreen.hideAsync().catch(() => {})
			}
		})()
	}, [])

	const signIn = async (email: string, password: string) => {
		const { accessToken, refreshToken: rToken, user } = await login({ email, password })
		await Promise.all([storage.setAccessToken(accessToken), storage.setRefreshToken(rToken), storage.setUser(user)])
		setState({ user, accessToken, isBootstrapping: false })
	}

	const signOut = async () => {
		await storage.clearAll()
		setState({ user: null, accessToken: undefined, isBootstrapping: false })
	}

	const refresh = async () => {
		const rToken = await storage.getRefreshToken()
		if (!rToken) return signOut()
		const { accessToken, refreshToken: newR } = await refreshToken(rToken)
		await Promise.all([storage.setAccessToken(accessToken), storage.setRefreshToken(newR)])
		setState((s) => ({ ...s, accessToken }))
	}

	const value = useMemo<AuthContextValue>(
		() => ({
			user: state.user,
			accessToken: state.accessToken,
			isBootstrapping: state.isBootstrapping,
			signIn,
			signOut,
			refresh
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
