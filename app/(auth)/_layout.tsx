import { useAuth } from "@/providers/AuthProvider"
import { Redirect, Stack } from "expo-router"

export default function PublicLayout() {
	const { user, isBootstrapping } = useAuth()

	if (isBootstrapping) return null
	if (user) return <Redirect href="/(app)" />

	console.log("PublicLayout rendered, user is not authenticated", user) // Debugging log to check layout rendering;

	return <Stack screenOptions={{ headerShown: false }} />
}
