import { Ionicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"
import { useMemo } from "react"
import { useWindowDimensions } from "react-native"

export default function TabsLayout() {
	const { width } = useWindowDimensions()
	const isLargeScreen = width >= 768 // Tablet & Web breakpoint

	const screenOptions = useMemo(
		() => ({
			tabBarShowLabel: false,
			tabBarActiveTintColor: "#2563eb",
			tabBarInactiveTintColor: "#64748b",
			tabBarLabelStyle: {
				fontSize: isLargeScreen ? 16 : 12
			},
			tabBarIconStyle: {
				marginBottom: isLargeScreen ? 0 : -2
			},
			tabBarStyle: {
				height: isLargeScreen ? 70 : 60,
				paddingHorizontal: isLargeScreen ? 20 : 10
			},
			tabBarItemStyle: {
				justifyContent: "center",
				alignItems: "center"
			},
			headerShown: false
		}),
		[isLargeScreen]
	)

	return (
		<Tabs screenOptions={screenOptions}>
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
