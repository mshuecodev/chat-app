import { login, logout, signUp } from "@/lib/api/auth"
import { storage } from "@/lib/storage"
import type { User } from "@/lib/types"
import * as SplashScreen from "expo-splash-screen"
import React, { createContext, useContext, useMemo, useState } from "react"

SplashScreen.preventAutoHideAsync().catch(() => {})

type AuthState = {
	user: User | null
	accessToken?: string
	isBootstrapping: boolean
	loading: boolean
}

type AuthContextValue = {
	user: User | null
	accessToken?: string
	isBootstrapping: boolean
	loading: boolean
	signIn: (email: string, password: string) => Promise<void>
	signUpUser: (email: string, password: string) => Promise<string>
	signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [state, setState] = useState<AuthState>({
		user: null,
		accessToken: undefined,
		isBootstrapping: false,
		loading: false
	})

	// useEffect(() => {
	// 	const init = async () => {
	// 		console.log("AuthProvider init")
	// 		try {
	// 			await refresh()
	// 		} catch {
	// 			setState((s) => ({ ...s, user: null }))
	// 		} finally {
	// 			setState((s) => ({ ...s, isBootstrapping: false }))
	// 			SplashScreen.hideAsync().catch(() => {})
	// 		}
	// 	}
	// 	init()
	// }, [])

	const signIn = async (email: string, password: string) => {
		setState((s) => ({ ...s, loading: true }))
		try {
			const { accessToken, refreshToken, user } = await login({ email, password })
			setState({ user, accessToken, isBootstrapping: false, loading: false })
		} catch (e) {
			setState((s) => ({ ...s, loading: false }))
			throw e
		}
	}

	const signUpUser = async (email: string, password: string) => {
		setState((s) => ({ ...s, loading: true }))
		try {
			const { message } = await signUp({ email, password })
			return message
		} finally {
			setState((s) => ({ ...s, loading: false }))
		}
	}

	const signOut = async () => {
		setState((s) => ({ ...s, loading: true }))
		try {
			await logout()
			await storage.clearAll()
			setState({ user: null, accessToken: undefined, isBootstrapping: false, loading: false })
		} catch (e) {
			setState((s) => ({ ...s, loading: false }))
			throw e
		}
	}

	const value = useMemo<AuthContextValue>(
		() => ({
			user: state.user,
			accessToken: state.accessToken,
			isBootstrapping: state.isBootstrapping,
			loading: state.loading,
			signIn,
			signUpUser,
			signOut
		}),
		[state.user, state.accessToken, state.isBootstrapping, state.loading]
	)

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
	const ctx = useContext(AuthContext)
	if (!ctx) throw new Error("useAuth must be used within AuthProvider")
	return ctx
}
