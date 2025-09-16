import { HStack, Icon, Input, InputField, Pressable, Text, VStack } from "@/components/ui"
import { useRouter } from "expo-router"
import { ArrowLeft, Camera, Check, Eye, EyeOff } from "lucide-react-native"
import { useState } from "react"

export default function EditProfileScreen() {
	const router = useRouter()
	const [showPassword, setShowPassword] = useState(false)

	return (
		<VStack className="flex-1 bg-background-50">
			{/* Header */}
			<HStack className="items-center justify-between px-4 py-3">
				<Pressable onPress={() => router.back()}>
					<Icon
						as={ArrowLeft}
						size="lg"
					/>
				</Pressable>
				<Text
					size="xl"
					className="font-bold"
				>
					Edit Profile
				</Text>
				<Pressable onPress={() => router.back()}>
					<Icon
						as={Check}
						size="lg"
						className="text-success-500"
					/>
				</Pressable>
			</HStack>

			{/* Avatar */}
			<VStack className="items-center my-6">
				<Pressable>
					{/* <Avatar
						size="2xl"
						source={{ uri: "https://i.pravatar.cc/300" }}
					/> */}
					<Pressable className="absolute bottom-0 right-0 bg-background-100 p-2 rounded-full">
						<Icon
							as={Camera}
							size="sm"
						/>
					</Pressable>
				</Pressable>
			</VStack>

			{/* Form Fields */}
			<VStack className="px-4 space-y-4">
				{/* Name */}
				<VStack space="xs">
					<Text className="font-semibold">Name</Text>
					<Input
						variant="outline"
						className="rounded-xl bg-background-100"
					>
						<InputField placeholder="Charlotte King" />
					</Input>
				</VStack>

				{/* Email */}
				<VStack space="xs">
					<Text className="font-semibold">Email address</Text>
					<Input
						variant="outline"
						className="rounded-xl bg-background-100"
					>
						<InputField
							placeholder="@johnkinggraphics.gmail.com"
							keyboardType="email-address"
						/>
					</Input>
				</VStack>

				{/* Username */}
				<VStack space="xs">
					<Text className="font-semibold">User name</Text>
					<Input
						variant="outline"
						className="rounded-xl bg-background-100"
					>
						<InputField placeholder="@johnkinggraphics" />
					</Input>
				</VStack>

				{/* Password */}
				<VStack space="xs">
					<Text className="font-semibold">Password</Text>
					<Input
						variant="outline"
						className="rounded-xl bg-background-100"
					>
						<InputField
							placeholder="********"
							secureTextEntry={!showPassword}
						/>
						<Pressable
							onPress={() => setShowPassword(!showPassword)}
							className="px-2"
						>
							<Icon
								as={showPassword ? EyeOff : Eye}
								size="sm"
							/>
						</Pressable>
					</Input>
				</VStack>

				{/* Phone Number */}
				<VStack space="xs">
					<Text className="font-semibold">Phone number</Text>
					<Input
						variant="outline"
						className="rounded-xl bg-background-100"
					>
						<InputField
							placeholder="+91 6895312"
							keyboardType="phone-pad"
						/>
					</Input>
				</VStack>
			</VStack>
		</VStack>
	)
}
