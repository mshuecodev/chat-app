// app/index.tsx
import { useAuth } from "@/providers/AuthProvider"
import { Redirect } from "expo-router"

export default function Index() {
	const { user, isBootstrapping } = useAuth()

	if (isBootstrapping) return null // could show splash screen here

	// If logged in → send to app, otherwise → sign-in
	return user ? <Redirect href="/(app)/(tabs)/chat" /> : <Redirect href="/(auth)/sign-in" />
}
