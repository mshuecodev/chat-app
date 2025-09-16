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
		<VStack className="flex-1 bg-background-50">
			{/* Header */}
			<HStack className="items-center justify-between p-4">
				<Text
					size="xl"
					className="font-bold"
				>
					Contacts
				</Text>
			</HStack>

			{/* Search */}
			<VStack className="px-4 mb-2">
				<Input className="rounded-full bg-background-100">
					<InputField
						placeholder="Search contacts..."
						value={search}
						onChangeText={setSearch}
					/>
				</Input>
			</VStack>

			<Divider />

			{/* Contacts list */}
			<VStack
				className="flex-1 px-4 py-2"
				space="md"
			>
				{filteredContacts.length === 0 ? (
					<Text
						size="md"
						className="text-background-600 text-center mt-10"
					>
						No contacts found.
					</Text>
				) : (
					filteredContacts.map((contact) => (
						<HStack
							key={contact.id}
							space="md"
							alignItems="center"
							className="bg-background-50 rounded-2xl p-4 border border-background-200 shadow-[0_2px_6px_rgba(0,0,0,0.05)] active:bg-background-100"
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
								size="sm"
								className="rounded-full bg-[#E53935]"
							>
								<ButtonText className="text-white">Message</ButtonText>
							</Button>
						</HStack>
					))
				)}
			</VStack>
		</VStack>
	)
}
