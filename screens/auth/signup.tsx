import { Button, ButtonText } from "@/components/ui/button"
import { Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from "@/components/ui/checkbox"
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control"
import { Heading } from "@/components/ui/heading"
import { HStack } from "@/components/ui/hstack"
import { CheckIcon, EyeIcon, EyeOffIcon } from "@/components/ui/icon"
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input"
import { LinkText } from "@/components/ui/link"
import { Spinner } from "@/components/ui/spinner"
import { Text } from "@/components/ui/text"
import { Toast, ToastTitle, useToast } from "@/components/ui/toast"
import { VStack } from "@/components/ui/vstack"
import { useAuth } from "@/providers/AuthProvider"
import { AntDesign } from "@expo/vector-icons"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useRouter } from "expo-router"
import { AlertTriangle } from "lucide-react-native"
import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { SafeAreaView } from "react-native"
import { z } from "zod"

const signUpSchema = z.object({
	email: z.string().min(1, "Email is required").email(),
	password: z.string().min(6, "Must be at least 8 characters in length").regex(new RegExp(".*[A-Z].*"), "One uppercase character").regex(new RegExp(".*[a-z].*"), "One lowercase character").regex(new RegExp(".*\\d.*"), "One number").regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"), "One special character"),
	confirmpassword: z.string().min(6, "Must be at least 8 characters in length").regex(new RegExp(".*[A-Z].*"), "One uppercase character").regex(new RegExp(".*[a-z].*"), "One lowercase character").regex(new RegExp(".*\\d.*"), "One number").regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"), "One special character"),
	rememberme: z.boolean().optional()
})

type SignUpSchemaType = z.infer<typeof signUpSchema>

const SignUpWithBottomCard = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
		watch
	} = useForm<SignUpSchemaType>({
		resolver: zodResolver(signUpSchema)
	})
	const toast = useToast()
	const router = useRouter()
	const { signUpUser, loading } = useAuth()

	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const rememberMeChecked = watch("rememberme", false)

	const onSubmit = async (data: SignUpSchemaType) => {
		if (data.password !== data.confirmpassword) {
			toast.show({
				placement: "bottom right",
				render: ({ id }) => (
					<Toast
						nativeID={id}
						variant="solid"
						action="error"
					>
						<ToastTitle>Passwords do not match</ToastTitle>
					</Toast>
				)
			})
			return
		}

		try {
			const message = await signUpUser(data.email, data.password)
			toast.show({
				placement: "bottom right",
				render: ({ id }) => (
					<Toast
						nativeID={id}
						variant="solid"
						action="success"
					>
						<ToastTitle>{message || "Account created successfully"}</ToastTitle>
					</Toast>
				)
			})
			router.replace("/(app)/(tabs)/contacts")
		} catch (err: any) {
			toast.show({
				placement: "bottom right",
				render: ({ id }) => (
					<Toast
						nativeID={id}
						variant="solid"
						action="error"
					>
						<ToastTitle>{err.message || "Signup failed"}</ToastTitle>
					</Toast>
				)
			})
		}
	}

	return (
		<SafeAreaView className="flex-1 bg-[#E53935]">
			<VStack className="flex-1 items-center">
				{/* Welcome text */}
				<VStack className="flex-1 items-center mt-10">
					<Heading
						className="text-white"
						size="3xl"
					>
						Create Account
					</Heading>
					<Text className="text-white mt-2">Sign up to get started</Text>
				</VStack>

				{/* White Card */}
				<VStack className="bg-white absolute bottom-0 w-full h-3/4 p-6 rounded-t-3xl shadow-lg space-y-5">
					<Heading size="lg">Sign Up</Heading>

					{/* Email */}
					<FormControl isInvalid={!!errors.email}>
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
									/>
								</Input>
							)}
						/>
						<FormControlError>
							<FormControlErrorIcon
								size="md"
								as={AlertTriangle}
							/>
							<FormControlErrorText>{errors?.email?.message}</FormControlErrorText>
						</FormControlError>
					</FormControl>

					{/* Password */}
					<FormControl isInvalid={!!errors.password}>
						<FormControlLabel>
							<FormControlLabelText>Password</FormControlLabelText>
						</FormControlLabel>
						<Controller
							name="password"
							control={control}
							render={({ field }) => (
								<Input className="rounded-full">
									<InputField
										placeholder="Enter password"
										type={showPassword ? "text" : "password"}
										value={field.value}
										onChangeText={field.onChange}
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
						<FormControlError>
							<FormControlErrorIcon
								size="md"
								as={AlertTriangle}
							/>
							<FormControlErrorText>{errors?.password?.message}</FormControlErrorText>
						</FormControlError>
					</FormControl>

					{/* Confirm Password */}
					<FormControl isInvalid={!!errors.confirmpassword}>
						<FormControlLabel>
							<FormControlLabelText>Confirm Password</FormControlLabelText>
						</FormControlLabel>
						<Controller
							name="confirmpassword"
							control={control}
							render={({ field }) => (
								<Input className="rounded-full">
									<InputField
										placeholder="Confirm password"
										type={showConfirmPassword ? "text" : "password"}
										value={field.value}
										onChangeText={field.onChange}
									/>
									<InputSlot
										onPress={() => setShowConfirmPassword(!showConfirmPassword)}
										className="pr-3"
									>
										<InputIcon as={showConfirmPassword ? EyeIcon : EyeOffIcon} />
									</InputSlot>
								</Input>
							)}
						/>
						<FormControlError>
							<FormControlErrorIcon
								size="md"
								as={AlertTriangle}
							/>
							<FormControlErrorText>{errors?.confirmpassword?.message}</FormControlErrorText>
						</FormControlError>
					</FormControl>

					{/* Terms Checkbox */}
					<Controller
						name="rememberme"
						defaultValue={false}
						control={control}
						render={({ field: { onChange, value } }) => (
							<Checkbox
								size="sm"
								value="Remember me"
								isChecked={value}
								onChange={onChange}
							>
								<CheckboxIndicator>
									<CheckboxIcon as={CheckIcon} />
								</CheckboxIndicator>
								<CheckboxLabel>I accept the Terms of Use & Privacy Policy</CheckboxLabel>
							</Checkbox>
						)}
					/>

					{/* Sign Up Button */}
					<Button
						className="rounded-full bg-[#E53935] w-full"
						onPress={handleSubmit(onSubmit)}
						disabled={loading || !rememberMeChecked}
					>
						{loading ? (
							<Spinner
								size="large"
								color="white"
							/>
						) : (
							<ButtonText className="text-white font-medium">Sign Up</ButtonText>
						)}
					</Button>

					{/* Social Buttons */}
					<HStack className="justify-center space-x-4 mt-2">
						<Button
							variant="outline"
							className="flex-1 rounded-full border border-gray-300"
							onPress={() => {}}
						>
							<AntDesign
								name="google"
								size={20}
								color="#DB4437"
							/>
							<ButtonText className="ml-2">Continue with Google</ButtonText>
						</Button>
					</HStack>

					{/* Login link */}
					<HStack className="justify-center space-x-1 mt-4">
						<Text size="md">Already have an account?</Text>
						<Link href="/(auth)/sign-in">
							<LinkText className="text-[#E53935] font-medium">Login</LinkText>
						</Link>
					</HStack>
				</VStack>
			</VStack>
		</SafeAreaView>
	)
}

export const SignUp = () => {
	return <SignUpWithBottomCard />
}
