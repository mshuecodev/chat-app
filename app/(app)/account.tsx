import { fetchWithAuth } from "@/lib/api"
import { useAuth } from "@/providers/AuthProvider"
import React, { useEffect, useState } from "react"
import { Text, View } from "react-native"

export default function AccountScreen() {
	const { accessToken } = useAuth()
	const [profile, setProfile] = useState<any>(null)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		;(async () => {
			try {
				const me = await fetchWithAuth<any>("/me", accessToken)
				setProfile(me)
			} catch (e: any) {
				setError(e?.message ?? "Failed to load profile")
			}
		})()
	}, [accessToken])

	return (
		<View style={{ flex: 1, padding: 24, gap: 12, justifyContent: "center" }}>
			<Text style={{ fontSize: 22, marginBottom: 8 }}>Account</Text>
			{error ? <Text style={{ color: "red" }}>{error}</Text> : null}
			<Text>{JSON.stringify(profile, null, 2)}</Text>
		</View>
	)
}
