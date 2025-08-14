import { useAuth } from "@/providers/AuthProvider"
import { Redirect, Stack } from "expo-router"

export default function ProtectedLayout() {
	const { user, isBootstrapping } = useAuth()

	if (isBootstrapping) return null // splash is shown
	if (!user) return <Redirect href="/(auth)/sign-in" />

	return <Stack screenOptions={{ headerShown: false }} />
}
