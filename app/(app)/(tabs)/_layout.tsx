import { Ionicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"
import { useWindowDimensions } from "react-native"

export default function TabsLayout() {
	const { width } = useWindowDimensions()
	const isLargeScreen = width >= 768 // Tablet & Web breakpoint

	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarActiveTintColor: "#2563eb",
				tabBarInactiveTintColor: "#64748b",
				tabBarLabelStyle: {
					fontSize: isLargeScreen ? 16 : 12 // Bigger labels on large screen
				},
				tabBarIconStyle: {
					marginBottom: isLargeScreen ? 0 : -2
				},
				tabBarStyle: {
					height: isLargeScreen ? 70 : 60,
					paddingHorizontal: isLargeScreen ? 20 : 10
				},

				// tabBarStyle: {
				// 	height: 70, // slightly taller for tap area
				// 	paddingBottom: 12, // center icon vertically
				// 	paddingTop: 12,
				// 	backgroundColor: "#f8fafc",
				// 	borderTopWidth: 0
				// },
				tabBarItemStyle: {
					justifyContent: "center", // center icon
					alignItems: "center"
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
