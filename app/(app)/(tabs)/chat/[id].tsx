import { Avatar, Button, ButtonText, HStack, Input, InputField, Text, VStack } from "@/components/ui"
import { useLocalSearchParams } from "expo-router"
import { Key, useState } from "react"

const DUMMY_MESSAGES = {
	"1": [
		{ id: 1, sender: "Gabrial", text: "Hi there!", avatar: "https://i.pravatar.cc/150?img=1" },
		{ id: 2, sender: "You", text: "Hello Gabrial!", avatar: "https://i.pravatar.cc/150?img=3" }
	],
	"2": [
		{ id: 1, sender: "Tom", text: "Hello!", avatar: "https://i.pravatar.cc/150?img=2" },
		{ id: 2, sender: "You", text: "Hi Tom!", avatar: "https://i.pravatar.cc/150?img=3" }
	]
}

export default function ChatDetailScreen() {
	const { id } = useLocalSearchParams()
	const chatId = String(id)
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

	return (
		<VStack
			className="flex-1 bg-background-50 p-4"
			space="lg"
		>
			<Text
				size="2xl"
				className="font-bold mb-2"
			>
				Chat
			</Text>
			<VStack
				className="flex-1"
				space="md"
			>
				{messages.map((msg: { id: Key | null | undefined; sender: unknown; avatar: any; text: unknown }) => (
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
						<VStack className={`rounded-xl px-3 py-2 ${msg.sender === "You" ? "bg-primary-100 self-end" : "bg-background-200"}`}>
							<Text
								size="sm"
								className="font-semibold"
							>
								{msg.sender}
							</Text>
							<Text size="md">{msg.text}</Text>
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
			<HStack
				space="sm"
				alignItems="center"
			>
				<Input className="flex-1">
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
					onPress={handleSend}
				>
					<ButtonText>Send</ButtonText>
				</Button>
			</HStack>
		</VStack>
	)
}
