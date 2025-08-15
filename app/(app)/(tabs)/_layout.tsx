import { Tabs } from "expo-router"

export default function TabsLayout() {
	return (
		<Tabs>
			<Tabs.Screen
				name="chat"
				options={{ headerShown: false }}
			/>
			<Tabs.Screen
				name="contacts"
				options={{ headerShown: false }}
			/>
			<Tabs.Screen
				name="settings"
				options={{ headerShown: false }}
			/>
		</Tabs>
	)
}
