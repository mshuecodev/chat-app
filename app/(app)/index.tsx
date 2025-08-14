import { useAuth } from "@/providers/AuthProvider"
import React from "react"
import { Pressable, Text, View } from "react-native"

export default function HomeScreen() {
	const { user, signOut } = useAuth()

	return (
		<View style={{ flex: 1, padding: 24, gap: 12, justifyContent: "center" }}>
			<Text style={{ fontSize: 22 }}>Hello, {user?.name ?? user?.email}</Text>
			<Pressable
				onPress={signOut}
				style={{ padding: 14, borderRadius: 8, borderWidth: 1, alignItems: "center" }}
			>
				<Text>Sign out</Text>
			</Pressable>
		</View>
	)
}
