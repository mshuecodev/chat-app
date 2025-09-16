import { Avatar, Button, ButtonText, HStack, Icon, Input, InputField, Pressable, Text, VStack } from "@/components/ui"
import { useLocalSearchParams, useRouter } from "expo-router"
import { ArrowLeft } from "lucide-react-native"
import { Key, useState } from "react"

type Message = {
	id: number
	sender: string
	text: string
	avatar: string
}

const DUMMY_MESSAGES: Record<string, Message[]> = {
	"1": [
		{
			id: 1,
			sender: "Gabrial",
			text: "Hi there!",
			avatar: "https://i.pravatar.cc/150?img=1"
		},
		{
			id: 2,
			sender: "You",
			text: "Hello Gabrial!",
			avatar: "https://i.pravatar.cc/150?img=3"
		}
	],
	"2": [
		{
			id: 1,
			sender: "Tom",
			text: "Hello!",
			avatar: "https://i.pravatar.cc/150?img=2"
		},
		{
			id: 2,
			sender: "You",
			text: "Hi Tom!",
			avatar: "https://i.pravatar.cc/150?img=3"
		}
	]
}

export default function ChatDetailScreen() {
	const { id } = useLocalSearchParams()
	const chatId = String(id)
	const router = useRouter()
	const [messages, setMessages] = useState(DUMMY_MESSAGES[chatId] || [])
	const [input, setInput] = useState("")

	const handleSend = () => {
		if (!input.trim()) return
		setMessages([
			...messages,
			{
				id: messages.length + 1,
				sender: "You",
				text: input,
				avatar: "https://i.pravatar.cc/150?img=3"
			}
		])
		setInput("")
	}

	// Find chat partner (first non-You sender)
	const partner = messages.find((m) => m.sender !== "You")
	const chatTitle = partner ? partner.sender : "Chat"
	const chatAvatar = partner ? partner.avatar : "https://i.pravatar.cc/150?img=5"

	return (
		<VStack className="flex-1 bg-white">
			{/* Header */}
			<HStack
				className="px-4 py-3 border-b border-gray-200 bg-white"
				alignItems="center"
				space="md"
			>
				<Pressable onPress={() => router.back()}>
					<Icon
						as={ArrowLeft}
						size="lg"
						className="text-black"
					/>
				</Pressable>
				<Avatar
					source={{ uri: chatAvatar }}
					size="sm"
				/>
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
				{messages.map((msg: { id: Key | null | undefined; sender: string; avatar: string; text: string }) => (
					<HStack
						key={msg.id}
						space="sm"
						alignItems="center"
						className={msg.sender === "You" ? "justify-end" : ""}
					>
						{msg.sender !== "You" && (
							<Avatar
								source={{ uri: msg.avatar }}
								size="sm"
							/>
						)}
						<VStack className={`rounded-xl px-3 py-2 max-w-[70%] ${msg.sender === "You" ? "bg-[#E53935] self-end" : "bg-[#F2F2F2]"}`}>
							<Text
								size="sm"
								className={`font-semibold ${msg.sender === "You" ? "text-white" : "text-black"}`}
							>
								{msg.sender}
							</Text>
							<Text
								size="md"
								className={msg.sender === "You" ? "text-white" : "text-gray-800"}
							>
								{msg.text}
							</Text>
						</VStack>
						{msg.sender === "You" && (
							<Avatar
								source={{ uri: msg.avatar }}
								size="sm"
							/>
						)}
					</HStack>
				))}
			</VStack>

			{/* Input Area */}
			<HStack
				className="px-4 py-3 border-t border-gray-200"
				space="sm"
				alignItems="center"
			>
				<Input className="flex-1 border border-gray-300 rounded-full px-3">
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
