import { Avatar, Button, ButtonText, Divider, HStack, Switch, Text, VStack } from "@/components/ui"
import { useAuth } from "@/providers/AuthProvider"
import { useTheme } from "@/providers/ThemeProvider"
import { useState } from "react"

export default function SettingsScreen() {
	const { user, signOut } = useAuth()
	const { darkMode, toggleTheme } = useTheme()
	const [notifications, setNotifications] = useState(true)

	return (
		<VStack
			className="flex-1 bg-background-50 p-4"
			space="lg"
		>
			<Text
				size="2xl"
				className="font-bold mb-4"
			>
				Settings
			</Text>
			<VStack
				space="lg"
				className="bg-background-100 rounded-xl p-4"
			>
				<HStack
					space="md"
					alignItems="center"
				>
					<Avatar
						source={{ uri: "https://i.pravatar.cc/150?u=" + user?.email }}
						size="md"
					/>
					<VStack>
						<Text
							size="lg"
							className="font-semibold"
						>
							{user?.name ?? "User"}
						</Text>
						<Text
							size="sm"
							className="text-background-600"
						>
							{user?.email}
						</Text>
					</VStack>
				</HStack>
				<Divider />
				<HStack
					alignItems="center"
					justifyContent="between"
				>
					<Text size="md">Enable Notifications</Text>
					<Switch
						value={notifications}
						onValueChange={setNotifications}
					/>
				</HStack>
				<HStack
					alignItems="center"
					justifyContent="between"
				>
					<Text size="md">Dark Mode</Text>
					<Switch
						value={darkMode}
						onValueChange={toggleTheme}
					/>
				</HStack>
				<Divider />
				<Button
					variant="outline"
					color="error"
					onPress={signOut}
				>
					<ButtonText>Sign Out</ButtonText>
				</Button>
			</VStack>
		</VStack>
	)
}
