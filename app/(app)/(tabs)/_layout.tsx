import { useTheme } from "@/providers/ThemeProvider"
import { Ionicons } from "@expo/vector-icons"
import { Tabs, useSegments } from "expo-router"
import { useMemo } from "react"
import { useWindowDimensions } from "react-native"

export default function TabsLayout() {
	const { width } = useWindowDimensions()
	const isLargeScreen = width >= 768 // Tablet & Web breakpoint
	const { darkMode } = useTheme()
	const segments = useSegments()

	const themeColors = useMemo(
		() => ({
			active: darkMode ? "#60a5fa" : "#2563eb",
			inactive: darkMode ? "#94a3b8" : "#64748b",
			background: darkMode ? "#0f172a" : "#f8fafc"
		}),
		[darkMode]
	)

	// Hide tab bar on detail screens
	const hideTabBar = (segments[segments.length - 2] === "chat" && segments[segments.length - 1]) || (segments[segments.length - 2] === "settings" && segments[segments.length - 1])

	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarActiveTintColor: themeColors.active,
				tabBarInactiveTintColor: themeColors.inactive,
				tabBarStyle: {
					backgroundColor: themeColors.background,
					height: isLargeScreen ? 70 : 60,
					display: hideTabBar ? "none" : "flex"
				},
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
				name="settings/index"
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
			<Tabs.Screen
				name="settings/[id]"
				options={{
					href: null
				}}
			/>
		</Tabs>
	)
}
