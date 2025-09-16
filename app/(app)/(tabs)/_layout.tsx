import { useTheme } from "@/providers/ThemeProvider"
import { Ionicons } from "@expo/vector-icons"
import { Tabs, useSegments } from "expo-router"
import { useMemo } from "react"
import { Platform, useWindowDimensions } from "react-native"

export default function TabsLayout() {
	const { width } = useWindowDimensions()
	const isLargeScreen = width >= 768 // Tablet & Web breakpoint
	const { darkMode } = useTheme()
	const segments = useSegments()

	const themeColors = useMemo(
		() => ({
			active: "#E53935",
			inactive: darkMode ? "#94a3b8" : "#64748b",
			background: darkMode ? "#0f172a" : "#ffffff",
			border: darkMode ? "#1e293b" : "#e5e7eb"
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
					borderTopLeftRadius: 20,
					borderTopRightRadius: 20,
					borderTopWidth: 1,
					borderTopColor: themeColors.border,
					shadowColor: "#000",
					shadowOpacity: 0.05,
					shadowOffset: { width: 0, height: -2 },
					shadowRadius: 6,
					elevation: 5,
					display: hideTabBar ? "none" : "flex",
					position: "absolute",
					overflow: "hidden"
				},
				headerShown: false,
				tabBarHideOnKeyboard: Platform.OS === "android" // auto hide on keyboard open
			}}
		>
			<Tabs.Screen
				name="chat/index"
				options={{
					title: "Chats",
					tabBarIcon: ({ color, size, focused }) => (
						<Ionicons
							name={focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"}
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
					tabBarIcon: ({ color, size, focused }) => (
						<Ionicons
							name={focused ? "people" : "people-outline"}
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
					tabBarIcon: ({ color, size, focused }) => (
						<Ionicons
							name={focused ? "settings" : "settings-outline"}
							size={size}
							color={color}
						/>
					)
				}}
			/>

			{/* Hidden routes */}
			<Tabs.Screen
				name="chat/[id]"
				options={{ href: null }}
			/>
			<Tabs.Screen
				name="settings/[id]"
				options={{ href: null }}
			/>
		</Tabs>
	)
}
