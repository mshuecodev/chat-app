import { useTheme } from "@/providers/ThemeProvider"
import { Ionicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"
import { useMemo } from "react"
import { useWindowDimensions } from "react-native"

export default function TabsLayout() {
	const { width } = useWindowDimensions()
	const isLargeScreen = width >= 768 // Tablet & Web breakpoint
	const { darkMode } = useTheme()

	const themeColors = useMemo(
		() => ({
			active: darkMode ? "#60a5fa" : "#2563eb",
			inactive: darkMode ? "#94a3b8" : "#64748b",
			background: darkMode ? "#0f172a" : "#f8fafc"
		}),
		[darkMode]
	)

	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarActiveTintColor: themeColors.active,
				tabBarInactiveTintColor: themeColors.inactive,
				tabBarStyle: {
					backgroundColor: themeColors.background,
					height: isLargeScreen ? 70 : 60
					// paddingHorizontal: isLargeScreen ? 20 : 10,
					// borderTopWidth: 0
					// paddingBottom: 10
				},
				// tabBarItemStyle: {
				// 	justifyContent: "center",
				// 	alignItems: "center"
				// },
				// tabBarIconStyle: {
				// 	marginBottom: isLargeScreen ? 0 : -2
				// },
				headerShown: false
			}}
		>
			<Tabs.Screen
				name="chat/index"
				options={{
					title: "Chats",
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name="chatbubble-ellipses-outline"
							size={size}
							color={color}
						/>
					)
				}}
			/>
			<Tabs.Screen
				name="contacts"
				options={{
					title: "Contacts",
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name="people-outline"
							size={size}
							color={color}
						/>
					)
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: "Settings",
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name="settings-outline"
							size={size}
							color={color}
						/>
					)
				}}
			/>
			<Tabs.Screen
				name="chat/[id]"
				options={{
					href: null
				}}
			/>
		</Tabs>
	)
}
