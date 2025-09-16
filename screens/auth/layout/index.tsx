import { SafeAreaView } from "react-native-safe-area-context"
import { VStack } from "@/components/ui/vstack"

type AuthLayoutProps = {
  children: React.ReactNode
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-background-50">
      <VStack className="flex-1">{children}</VStack>
    </SafeAreaView>
  )
}
