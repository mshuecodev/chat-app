import { Avatar, Button, ButtonText, HStack, Input, InputField, Text, VStack } from "@/components/ui"
import { useState } from "react"

const DUMMY_MESSAGES = [
	{ id: 1, sender: "Gabrial", text: "Hi there!", avatar: "https://i.pravatar.cc/150?img=1" },
	{ id: 2, sender: "Tom", text: "Hello! How are you?", avatar: "https://i.pravatar.cc/150?img=2" },
	{ id: 3, sender: "Gabrial", text: "I'm good, thanks!", avatar: "https://i.pravatar.cc/150?img=1" }
]

export default function ChatScreen() {
	const [messages, setMessages] = useState(DUMMY_MESSAGES)
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
				{messages.map((msg) => (
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
