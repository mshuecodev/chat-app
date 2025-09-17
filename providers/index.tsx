import { AuthProvider } from "@/providers/AuthProvider"
import { UserProvider } from "@/providers/UserProvider"
// import more providers as needed

type ProviderProps = { children: React.ReactNode }

const providers = [
	AuthProvider,
	UserProvider
	// Add more providers here as your app grows
]

export function Providers({ children }: ProviderProps) {
	return providers.reduceRight((acc, Provider) => <Provider>{acc}</Provider>, children)
}
