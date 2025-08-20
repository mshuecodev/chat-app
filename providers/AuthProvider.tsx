import { login, refreshToken, signUp } from "@/lib/api/auth"
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

// Dummy user data for demonstration purposes
const DUMMY_USERS = [
	{ id: "1", email: "admin@gmail.com", password: "admin123", name: "Admin Check" },
	{ id: "2", email: "test@gmail.com", password: "test123", name: "John Doe" }
]

// Dummy login function
async function dummyLogin(email: string, password: string) {
	const user = DUMMY_USERS.find((u) => u.email === email && u.password === password)
	if (!user) throw new Error("Invalid credentials")
	// Simulate tokens
	return {
		accessToken: "dummy-access-token",
		refreshToken: "dummy-refresh-token",
		user: { id: user.id, email: user.email, name: user.name }
	}
}

// Dummy signup function
async function dummySignup(email: string, password: string, name: string) {
	const exists = DUMMY_USERS.some((u) => u.email === email)
	if (exists) throw new Error("Email already exists")
	const id = (DUMMY_USERS.length + 1).toString()
	DUMMY_USERS.push({ id, email, password, name })
	return {
		accessToken: "dummy-access-token",
		refreshToken: "dummy-refresh-token",
		user: { id, email, name }
	}
}

type AuthContextValue = {
	user: User | null
	accessToken?: string
	isBootstrapping: boolean
	signIn: (email: string, password: string) => Promise<void>
	signUpUser: (email: string, password: string) => Promise<void>
	signOut: () => Promise<void>
	// refresh: () => Promise<void>
	dummySignIn: (email: string, password: string) => Promise<void> // Add this
	dummySignUp: (email: string, password: string, name: string) => Promise<void> // Add this
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [state, setState] = useState<AuthState>({ user: null, accessToken: undefined, isBootstrapping: true })

	useEffect(() => {
		const init = async () => {
			try {
				await refresh()
			} catch {
				setState((s) => ({ ...s, user: null }))
			} finally {
				setState((s) => ({ ...s, isBootstrapping: false }))
				SplashScreen.hideAsync().catch(() => {})
			}
		}

		init()
	}, [])

	const signIn = async (email: string, password: string) => {
		const { accessToken, refreshToken: rToken, user } = await login({ email, password })
		// await Promise.all([storage.setAccessToken(accessToken), storage.setRefreshToken(rToken), storage.setUser(user)])
		setState({ user, accessToken, isBootstrapping: false })
	}

	const signUpUser = async (email: string, password: string) => {
		const { user } = await signUp({ email, password })

		await storage.setUser(user)
		setState({ user, accessToken: undefined, isBootstrapping: false })
	}

	const signOut = async () => {
		await storage.clearAll()
		setState({ user: null, accessToken: undefined, isBootstrapping: false })
	}

	/**
	 * Refresh → call backend with cookie to get new access token
	 */
	const refresh = async () => {
		const res = await refreshToken()
		if (res.ok) {
			const { accessToken } = await res.json()
			console.log("Refreshed access token:", accessToken)
			// const me = await fetchMe(accessToken)
			// setState({ user: me.user, accessToken, isBootstrapping: false })
		} else {
			setState({ user: null, accessToken: undefined, isBootstrapping: false })
		}
	}

	// 	const refresh = async () => {
	//     const res = await refreshToken() // backend uses cookies to refresh session
	//     if (res.ok) {
	//       // optionally fetch the user again from /me endpoint
	//       const me = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/me`, {
	//         credentials: "include",
	//       }).then((r) => r.json())
	//       setState((s) => ({ ...s, user: me.user }))
	//     } else {
	//       setState((s) => ({ ...s, user: null }))
	//     }
	//   }

	// DUMMY FUNCTIONS

	const dummySignIn = async (email: string, password: string) => {
		const { accessToken, refreshToken: rToken, user } = await dummyLogin(email, password)
		console.log("Dummy sign in successful:", user)
		await Promise.all([storage.setAccessToken(accessToken), storage.setRefreshToken(rToken), storage.setUser(user)])
		setState({ user, accessToken, isBootstrapping: false })
	}

	const dummySignUp = async (email: string, password: string, name: string) => {
		const { accessToken, refreshToken: rToken, user } = await dummySignup(email, password, name)
		await Promise.all([storage.setAccessToken(accessToken), storage.setRefreshToken(rToken), storage.setUser(user)])
		setState({ user, accessToken, isBootstrapping: false })
	}

	const value = useMemo<AuthContextValue>(
		() => ({
			user: state.user,
			accessToken: state.accessToken,
			isBootstrapping: state.isBootstrapping,
			signIn,
			signUpUser,
			signOut,
			// refresh,
			dummySignIn,
			dummySignUp
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
