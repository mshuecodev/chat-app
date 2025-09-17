import { Button, ButtonText } from "@/components/ui/button"
import { FormControl, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control"
import { Heading } from "@/components/ui/heading"
import { HStack } from "@/components/ui/hstack"
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon"
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input"
import { Pressable } from "@/components/ui/pressable"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { useAuth } from "@/providers/AuthProvider"
import { AntDesign, FontAwesome } from "@expo/vector-icons"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "expo-router"
import React, { useRef, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Keyboard, SafeAreaView, TextInputProps } from "react-native"
import { z } from "zod"

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1, "Password is required")
})

type LoginSchemaType = z.infer<typeof loginSchema>

const LoginWithBottomCard = () => {
	const { control, handleSubmit } = useForm<LoginSchemaType>({
		resolver: zodResolver(loginSchema)
	})
	const [showPassword, setShowPassword] = useState(false)
	const { signIn } = useAuth()
	const passwordRef = useRef<TextInputProps>(null)

	const router = useRouter()

	const onSubmit = async (data: LoginSchemaType) => {
		await signIn(data.email, data.password)
		router.replace("/(app)/(tabs)/chat")
	}

	const handleKeyPress = () => {
		Keyboard.dismiss()
		handleSubmit(onSubmit)()
	}

	return (
		<SafeAreaView className="flex-1 bg-[#E53935]">
			<VStack className="flex-1 items-center ">
				{/* Welcome text */}
				<VStack className="flex-1 items-center mt-10 ">
					<Heading
						className="text-white"
						size="3xl"
					>
						Hello!
					</Heading>
					<Text className="text-white mt-2">Welcome back to my chat application.</Text>
				</VStack>

				{/* White Card */}
				<VStack
					className="flex-2 bg-white absolute bottom-0 w-full 
			h-2/3
			
			p-6 rounded-t-3xl shadow-lg space-y-6"
				>
					<Heading size="lg">Login</Heading>

					{/* Email */}
					<FormControl>
						<FormControlLabel>
							<FormControlLabelText>Email</FormControlLabelText>
						</FormControlLabel>
						<Controller
							name="email"
							control={control}
							render={({ field }) => (
								<Input className="rounded-full">
									<InputField
										placeholder="Enter email"
										value={field.value}
										onChangeText={field.onChange}
										onSubmitEditing={() => {
											// move focus to password field
											passwordRef.current?.focus()
										}}
									/>
								</Input>
							)}
						/>
					</FormControl>

					{/* Password */}
					<FormControl>
						<FormControlLabel>
							<FormControlLabelText>Password</FormControlLabelText>
						</FormControlLabel>
						<Controller
							name="password"
							control={control}
							render={({ field }) => (
								<Input className="rounded-full">
									<InputField
										ref={passwordRef}
										type={showPassword ? "text" : "password"}
										placeholder="Enter password"
										value={field.value}
										onChangeText={field.onChange}
										returnKeyType="done"
										onSubmitEditing={handleSubmit(onSubmit)}
									/>
									<InputSlot
										onPress={() => setShowPassword(!showPassword)}
										className="pr-3"
									>
										<InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
									</InputSlot>
								</Input>
							)}
						/>
					</FormControl>

					{/* Forgot Password */}
					<Pressable onPress={() => router.push("/(auth)/forgot-password")}>
						<Text className="text-[#E53935] text-sm self-end">Forgot Password?</Text>
					</Pressable>

					{/* Login Button */}
					<Button
						className="rounded-full bg-[#E53935] w-full"
						onPress={handleSubmit(onSubmit)}
					>
						<ButtonText className="text-white font-medium">Login</ButtonText>
					</Button>

					{/* Divider */}
					<HStack className="justify-center my-2">
						<Text className="text-gray-500">Or login with</Text>
					</HStack>

					{/* Social Buttons */}
					<HStack className="justify-center space-x-4">
						<Pressable className="w-12 h-12 rounded-full border border-gray-200 items-center justify-center shadow-sm">
							<FontAwesome
								name="facebook"
								size={22}
								color="#1877F2"
							/>
						</Pressable>
						<Pressable className="w-12 h-12 rounded-full border border-gray-200 items-center justify-center shadow-sm">
							<AntDesign
								name="google"
								size={22}
								color="#DB4437"
							/>
						</Pressable>
						<Pressable className="w-12 h-12 rounded-full border border-gray-200 items-center justify-center shadow-sm">
							<AntDesign
								name="apple1"
								size={22}
								color="#000"
							/>
						</Pressable>
					</HStack>

					{/* Sign Up */}
					<HStack className="justify-center space-x-1 mt-4">
						<Text size="md">Don’t have an account?</Text>
						<Pressable onPress={() => router.push("/(auth)/sign-up")}>
							<Text className="text-[#E53935] font-medium">Sign Up</Text>
						</Pressable>
					</HStack>
				</VStack>
			</VStack>
		</SafeAreaView>
	)
}

export const SignIn = () => {
	return <LoginWithBottomCard />
}
