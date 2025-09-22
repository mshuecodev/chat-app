import { Text, VStack } from "@/components/ui"
import React from "react"

const NotFoundComponent = () => {
	return (
		<VStack className="flex-1 items-center justify-center bg-background-50 px-4">
			<Text className="text-background-600 text-lg">No conversations found</Text>
			{/* <Text className="text-background-400 mt-2 text-sm">Start a new chat to see it here.</Text> */}
		</VStack>
	)
}

export default NotFoundComponent
