import { Button, ButtonText, Divider, HStack, Input, InputField, Text, VStack } from "@/components/ui"
import { Avatar, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar"
import type { Profiles } from "@/lib/types"
import { useUser } from "@/providers/UserProvider"
import { useEffect, useMemo, useState } from "react"

function ContactItem({ contact }: { contact: Profiles }) {
	return (
		<HStack
			key={contact.id}
			space="md"
			className="items-center bg-background-50 rounded-2xl p-4 border border-background-200 shadow-[0_2px_6px_rgba(0,0,0,0.05)] active:bg-background-100"
		>
			<Avatar>
				<AvatarFallbackText>{contact.display_name?.slice(0, 2).toUpperCase()}</AvatarFallbackText>
				{contact.avatar_url && <AvatarImage source={{ uri: contact.avatar_url }} />}
			</Avatar>

			<VStack className="flex-1">
				<Text
					size="lg"
					className="font-semibold"
				>
					{contact.display_name}
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
	)
}

export default function ContactsScreen() {
	const [search, setSearch] = useState("")
	const { users, loading, error, fetchUsers } = useUser()

	console.log("Users in ContactsScreen:", users)

	useEffect(() => {
		fetchUsers()
	}, [fetchUsers])

	const filteredContacts = useMemo(() => {
		if (!users) return []
		return users.filter((c) => c.display_name?.toLowerCase().includes(search.toLowerCase()) || c.email?.toLowerCase().includes(search.toLowerCase()))
	}, [users, search])

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

			{/* Content */}
			<VStack
				className="flex-1 px-4 py-2"
				space="md"
			>
				{loading && (
					<Text
						size="md"
						className="text-background-600 text-center mt-10"
					>
						Loading contacts...
					</Text>
				)}

				{error && (
					<Text
						size="md"
						className="text-red-500 text-center mt-10"
					>
						Failed to load contacts.
					</Text>
				)}

				{!loading && !error && filteredContacts.length === 0 && (
					<Text
						size="md"
						className="text-background-600 text-center mt-10"
					>
						No contacts found.
					</Text>
				)}

				{!loading &&
					!error &&
					filteredContacts.map((contact) => (
						<ContactItem
							key={contact.id}
							contact={contact}
						/>
					))}
			</VStack>
		</VStack>
	)
}
