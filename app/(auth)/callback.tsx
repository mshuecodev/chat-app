import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { useToast } from "@/components/ui/toast"
import { VStack } from "@/components/ui/vstack"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useEffect, useState } from "react"

export default function EmailCallback() {
	const router = useRouter()
	const toast = useToast()
	const { access_token, refresh_token, expires_at, expires_in } = useLocalSearchParams<{
		access_token?: string
		refresh_token?: string
		expires_at?: string
		expires_in?: string
	}>()

	const [status, setStatus] = useState<"pending" | "success" | "error">("pending")
	const [message, setMessage] = useState<string>("Verifying your email...")

	useEffect(() => {
		if (access_token) {
			setStatus("success")
			setMessage("Your email has been verified! You can now log in.")
			toast.show({
				placement: "bottom right",
				render: ({ id }) => (
					<Text
						nativeID={id}
						className="text-green-600"
					>
						Email verified! Please log in.
					</Text>
				)
			})
			setTimeout(() => {
				router.replace("/(auth)/sign-in")
			}, 2000)
		} else {
			setStatus("error")
			setMessage("Invalid or missing verification token.")
		}
	}, [access_token])

	return (
		<VStack className="flex-1 justify-center items-center">
			<Text>{message}</Text>
			{status === "error" && <Button onPress={() => router.replace("/(auth)/sign-up")}>Sign up again</Button>}
		</VStack>
	)
}
