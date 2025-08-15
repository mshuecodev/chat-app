import { Ionicons } from "@expo/vector-icons"
import { Tabs } from "expo-router"

export default function TabsLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: "#2563eb",
				tabBarInactiveTintColor: "#64748b",
				tabBarStyle: {
					height: 60,
					paddingBottom: 8,
					paddingTop: 8,
					backgroundColor: "#f8fafc",
					borderTopWidth: 0
				},
				headerShown: false
			}}
		>
			<Tabs.Screen
				name="chat"
				options={{
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
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name="settings-outline"
							size={size}
							color={color}
						/>
					)
				}}
			/>
		</Tabs>
	)
}
