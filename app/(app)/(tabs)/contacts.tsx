import { Avatar, Button, ButtonText, Divider, HStack, Input, InputField, Text, VStack } from "@/components/ui"
import { useState } from "react"

const DUMMY_CONTACTS = [
	{ id: 1, name: "Gabrial", email: "gabrial@gmail.com", avatar: "https://i.pravatar.cc/150?img=1" },
	{ id: 2, name: "Tom", email: "tom@gmail.com", avatar: "https://i.pravatar.cc/150?img=2" },
	{ id: 3, name: "Thomas", email: "thomas@gmail.com", avatar: "https://i.pravatar.cc/150?img=3" }
]

export default function ContactsScreen() {
	const [search, setSearch] = useState("")

	const filteredContacts = DUMMY_CONTACTS.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()))

	return (
		<VStack
			className="flex-1 bg-background-50 p-4"
			space="lg"
		>
			<Text
				size="2xl"
				className="font-bold mb-2"
			>
				Contacts
			</Text>
			<Input className="mb-2">
				<InputField
					placeholder="Search contacts..."
					value={search}
					onChangeText={setSearch}
				/>
			</Input>
			<Divider />
			<VStack
				space="md"
				className="flex-1"
			>
				{filteredContacts.length === 0 ? (
					<Text
						size="md"
						className="text-background-600"
					>
						No contacts found.
					</Text>
				) : (
					filteredContacts.map((contact) => (
						<HStack
							key={contact.id}
							space="md"
							alignItems="center"
							className="bg-background-100 rounded-xl p-3"
						>
							<Avatar
								source={{ uri: contact.avatar }}
								size="md"
							/>
							<VStack className="flex-1">
								<Text
									size="lg"
									className="font-semibold"
								>
									{contact.name}
								</Text>
								<Text
									size="sm"
									className="text-background-600"
								>
									{contact.email}
								</Text>
							</VStack>
							<Button
								variant="outline"
								size="sm"
							>
								<ButtonText>Message</ButtonText>
							</Button>
						</HStack>
					))
				)}
			</VStack>
		</VStack>
	)
}
