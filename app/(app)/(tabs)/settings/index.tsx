import { Button, ButtonText, Divider, HStack, Icon, Pressable, Text, VStack } from "@/components/ui"
import { useAuth } from "@/providers/AuthProvider"
import { useRouter } from "expo-router"
import { Clock, CreditCard, Download, Globe, Heart, LogOut, MapPin, Settings, Trash2 } from "lucide-react-native"

export default function ProfileScreen() {
	const { user, signOut } = useAuth()
	const router = useRouter()

	const menuItems = [
		{ label: "Favourites", icon: Heart },
		{ label: "Downloads", icon: Download },
		{ label: "Language", icon: Globe },
		{ label: "Location", icon: MapPin },
		{ label: "Subscription", icon: CreditCard },
		{ label: "Clear cache", icon: Trash2 },
		{ label: "Clear history", icon: Clock }
	]

	return (
		<VStack className="flex-1 bg-background-50">
			{/* Header */}
			<HStack className="items-center justify-between p-4">
				<Text
					size="xl"
					className="font-bold"
				>
					My Profile
				</Text>
				<Icon
					as={Settings}
					size="lg"
				/>
			</HStack>

			{/* Profile Card */}
			<VStack className="items-center px-4 py-6">
				{/* <Avatar
					size="2xl"
					source={{ uri: "https://i.pravatar.cc/300?u=" + user?.email }}
				/> */}
				<Text
					size="lg"
					className="mt-4 font-semibold"
				>
					{user?.name ?? "User"}
				</Text>
				<Text
					size="sm"
					className="text-background-600"
				>
					@{user?.email?.split("@")[0]}
				</Text>
				<Button
					className="mt-4 w-40 rounded-full bg-error-500"
					onPress={() => router.push(`/settings/${user.id}`)}
				>
					<ButtonText>Edit Profile</ButtonText>
				</Button>
			</VStack>

			<Divider />

			{/* Menu Items */}
			<VStack
				className="px-4"
				space="md"
			>
				{menuItems.map((item, idx) => (
					<Pressable
						key={idx}
						className="flex-row items-center justify-between py-3 border-b border-background-200"
					>
						<HStack
							space="md"
							className="items-center"
						>
							<Icon
								as={item.icon}
								size="md"
							/>
							<Text size="md">{item.label}</Text>
						</HStack>
						<Text className="text-background-500">{">"}</Text>
					</Pressable>
				))}
			</VStack>

			{/* Logout */}
			<Pressable
				onPress={signOut}
				className="flex-row items-center px-4 py-4 mt-auto"
			>
				<Icon
					as={LogOut}
					size="md"
					className="text-error-500 mr-2"
				/>
				<Text className="text-error-500 font-semibold">Log out</Text>
			</Pressable>
		</VStack>
	)
}
