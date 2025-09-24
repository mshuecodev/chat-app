import { Button, ButtonText, HStack, Icon, Input, InputField, Pressable, Text, VStack } from "@/components/ui"
import { Avatar, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar"
import { getMessages, sendMessage } from "@/lib/api/chat"
import { Messages } from "@/lib/types"
import { useAuth } from "@/providers/AuthProvider"
import { useFocusEffect } from "@react-navigation/native"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useLocalSearchParams, useRouter } from "expo-router"
import { ArrowLeft } from "lucide-react-native"
import { useCallback, useState } from "react"

export default function ChatDetailScreen() {
	const { id } = useLocalSearchParams()
	const chatId = String(id)
	const router = useRouter()
	const { user } = useAuth()
	// const [messages, setMessages] = useState<Messages[]>([])
	const [input, setInput] = useState("")
	// const [loading, setLoading] = useState(true)

	const queryClient = useQueryClient()

	// Fetch messages
	const { data, isLoading, isError, refetch } = useQuery({
		queryKey: ["messages", chatId],
		queryFn: () => getMessages(chatId),
		enabled: !!chatId // only run if chatId exists
	})

	// Refetch when screen comes back into focus
	useFocusEffect(
		useCallback(() => {
			refetch()
		}, [chatId])
	) // Mutation for sending message
	const mutation = useMutation({
		mutationFn: (text: string) => sendMessage({ conversationId: chatId, body: text }),
		onSuccess: (newMessage) => {
			// Update cache instantly
			queryClient.setQueryData<Messages[]>(["messages", chatId], (old = []) => [...old, newMessage])
			setInput("")
		}
	})

	const handleSend = () => {
		if (!input.trim()) return
		mutation.mutate(input)
	}

	const profile = data?.conversation?.profile
	const messages = data?.messages

	// Find chat partner (first non-You sender)
	const partner = messages?.find((m) => m.sender?.id !== profile?.id)
	const chatTitle = profile ? profile.display_name : "Chat"
	const chatAvatar = profile ? profile.avatar_url : "https://i.pravatar.cc/150?img=5"

	console.log("chatTitle", data, data?.conversation)
	return (
		<VStack className="flex-1 bg-white">
			{/* Header */}
			<HStack
				className="px-4 py-3 border-b border-gray-200 bg-white item-center"
				// alignItems="center"
				space="md"
			>
				<Pressable onPress={() => router.back()}>
					<Icon
						as={ArrowLeft}
						size="lg"
						className="text-black"
					/>
				</Pressable>
				<Avatar>
					<AvatarFallbackText>{chatTitle}</AvatarFallbackText>
					<AvatarImage source={{ uri: chatAvatar }} />
				</Avatar>

				<VStack>
					<Text
						size="md"
						className="font-bold text-black"
					>
						{chatTitle}
					</Text>
					<Text
						size="xs"
						className="text-gray-500"
					>
						Online
					</Text>
				</VStack>
			</HStack>

			{/* Messages */}
			<VStack
				className="flex-1 px-4 py-3"
				space="md"
			>
				{messages?.map((msg: Messages) => {
					const isMe = msg.sender?.id === user?.id // adjust `authUser` to whatever you use for logged-in user

					return (
						<HStack
							key={msg.id}
							space="sm"
							className={`${isMe ? "justify-end" : ""} items-center`}
						>
							{!isMe && (
								<Avatar
									source={{ uri: msg.sender?.avatar_url }}
									size="sm"
								/>
							)}

							<VStack className={`rounded-xl px-3 py-2 max-w-[70%] ${isMe ? "bg-[#E53935] self-end" : "bg-[#F2F2F2]"}`}>
								<Text
									size="sm"
									className={`font-semibold ${isMe ? "text-white" : "text-black"}`}
								>
									{msg.sender?.display_name}
								</Text>
								<Text
									size="md"
									className={isMe ? "text-white" : "text-gray-800"}
								>
									{msg.body}
								</Text>
							</VStack>

							{isMe && (
								<Avatar
									source={{ uri: msg.sender?.avatar_url }}
									size="sm"
								/>
							)}
						</HStack>
					)
				})}
			</VStack>

			{/* Input Area */}
			<HStack
				className="px-4 py-3 border-t border-gray-200"
				space="sm"
				// alignItems="center"
			>
				<Input className="flex-1 border item-center border-gray-300 rounded-full px-3">
					<InputField
						placeholder="Type a message..."
						value={input}
						onChangeText={setInput}
						onSubmitEditing={handleSend}
						returnKeyType="send"
					/>
				</Input>
				<Button
					variant="solid"
					className="bg-[#E53935] rounded-full px-5"
					onPress={handleSend}
				>
					<ButtonText className="text-white">Send</ButtonText>
				</Button>
			</HStack>
		</VStack>
	)
}
