import { Avatar, Button, ButtonText, Divider, HStack, Text, VStack } from "@/components/ui"
import { useRouter } from "expo-router"

const ACTIVE_CHATS = [
	{ id: 1, name: "Gabrial", lastMessage: "I'm good, thanks!", avatar: "https://i.pravatar.cc/150?img=1" },
	{ id: 2, name: "Tom", lastMessage: "Hello! How are you?", avatar: "https://i.pravatar.cc/150?img=2" }
]

export default function ChatListScreen() {
	const router = useRouter()

	return (
		<VStack
			className="flex-1 bg-background-50 p-4"
			space="lg"
		>
			<Text
				size="2xl"
				className="font-bold mb-2"
			>
				Chats
			</Text>
			<Divider />
			<VStack
				space="md"
				className="flex-1"
			>
				{ACTIVE_CHATS.map((chat) => (
					<HStack
						key={chat.id}
						space="md"
						alignItems="center"
						className="bg-background-100 rounded-xl p-3"
						onPress={() => router.push(`/chat/${chat.id}`)}
						style={{ cursor: "pointer" }}
					>
						<Avatar
							source={{ uri: chat.avatar }}
							size="md"
						/>
						<VStack className="flex-1">
							<Text
								size="lg"
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
						<Button
							variant="outline"
							size="sm"
							onPress={() => router.push(`/chat/${chat.id}`)}
						>
							<ButtonText>Open</ButtonText>
						</Button>
					</HStack>
				))}
			</VStack>
		</VStack>
	)
}
