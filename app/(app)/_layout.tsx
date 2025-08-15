import { useAuth } from "@/providers/AuthProvider"
import { Slot, useRouter } from "expo-router"
import { useEffect } from "react"

export default function ProtectedLayout() {
	const { user, isBootstrapping } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!isBootstrapping && !user) {
			router.replace("/(auth)/sign-in")
		}
	}, [isBootstrapping, user])

	if (isBootstrapping) return null
	if (!user) return null // Prevent rendering children while redirecting

	console.log("ProtectedLayout rendered, user is authenticated", user) // Debugging log to check layout rendering

	// return <Stack screenOptions={{ headerShown: false }} />
	return <Slot />
}
