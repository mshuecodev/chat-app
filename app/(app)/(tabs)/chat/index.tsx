import { Avatar, Divider, HStack, Icon, Pressable, Text, VStack } from "@/components/ui"
import { useRouter } from "expo-router"
import { ChevronRight } from "lucide-react-native"

const ACTIVE_CHATS = [
	{ id: 1, name: "Gabriel", lastMessage: "I'm good, thanks!", avatar: "https://i.pravatar.cc/150?img=1" },
	{ id: 2, name: "Tom", lastMessage: "Hello! How are you?", avatar: "https://i.pravatar.cc/150?img=2" }
]

export default function ChatListScreen() {
	const router = useRouter()

	return (
		<VStack className="flex-1 bg-background-50">
			{/* Header */}
			<HStack className="items-center justify-between px-4 py-3">
				<Text
					size="xl"
					className="font-bold"
				>
					Chats
				</Text>
			</HStack>
			<Divider />

			{/* Chat List */}
			<VStack
				className="px-4"
				space="md"
			>
				{ACTIVE_CHATS.map((chat) => (
					<Pressable
						key={chat.id}
						className="flex-row items-center justify-between bg-background-100 rounded-xl px-4 py-3"
						onPress={() => router.push(`/chat/${chat.id}`)}
					>
						<HStack
							space="md"
							className="items-center flex-1"
						>
							<Avatar
								source={{ uri: chat.avatar }}
								size="md"
							/>
							<VStack className="flex-1">
								<Text
									size="md"
									className="font-semibold"
								>
									{chat.name}
								</Text>
								<Text
									size="sm"
									className="text-background-600"
									numberOfLines={1}
								>
									{chat.lastMessage}
								</Text>
							</VStack>
						</HStack>
						<Icon
							as={ChevronRight}
							size="md"
							className="text-background-500"
						/>
					</Pressable>
				))}
			</VStack>
		</VStack>
	)
}
