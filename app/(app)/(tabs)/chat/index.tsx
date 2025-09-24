import NotFoundComponent from "@/components/NotFound"
import { Avatar, AvatarFallbackText, AvatarImage, Divider, HStack, Icon, Pressable, Text, VStack } from "@/components/ui"
import { Fab, FabIcon } from "@/components/ui/fab"
import { EditIcon } from "@/components/ui/icon"
import { useConversations } from "@/hooks/useConversations"
import { useRouter } from "expo-router"
import { ChevronRight } from "lucide-react-native"

const ACTIVE_CHATS = [
	{ id: 1, name: "Gabriel", lastMessage: "I'm good, thanks!", avatar: "https://i.pravatar.cc/150?img=1" },
	{ id: 2, name: "Tom", lastMessage: "Hello! How are you?", avatar: "https://i.pravatar.cc/150?img=2" }
]

export default function ChatListScreen() {
	const router = useRouter()
	const { data: conversations, isLoading, error } = useConversations({ page: 1, limit: 20 })

	console.log("list chat screen here", conversations, conversations?.length)

	if (isLoading) return <Text>Loading...</Text>
	if (error) return <Text>Error loading conversations</Text>

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
				className="px-4 "
				space="md"
			>
				{conversations?.map((chat) => (
					<Pressable
						key={chat.id}
						className="flex-row items-center justify-between bg-background-100 rounded-xl px-4 py-3"
						onPress={() => router.push(`/chat/${chat.id}`)}
					>
						<HStack
							space="md"
							className="items-center flex-1"
						>
							<Avatar>
								<AvatarFallbackText>{chat?.title}</AvatarFallbackText>
								<AvatarImage source={{ uri: chat?.avatar }} />
							</Avatar>

							<VStack className="flex-1">
								<Text
									size="md"
									className="font-semibold"
								>
									{chat?.title}
								</Text>
								<Text
									size="sm"
									className="text-background-600"
									numberOfLines={1}
								>
									{chat?.lastMessage?.body || ""}
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
			{!conversations || conversations.length === 0 ? <NotFoundComponent /> : null}
			<Fab
				size="lg"
				onPress={() => router.replace("/contacts")}
				className="bg-primary-600 hover:bg-primary-700 active:bg-primary-800 mb-20 mx-5"
			>
				<FabIcon as={EditIcon} />
			</Fab>
		</VStack>
	)
}
