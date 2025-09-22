import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider"
import { ThemeProvider as AppThemeProvider, useTheme } from "@/providers/ThemeProvider"
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
// import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { Fab, FabIcon } from "@/components/ui/fab"
import { MoonIcon, SunIcon } from "@/components/ui/icon"
import { Providers } from "@/providers/index"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useFonts } from "expo-font"
import { Slot, usePathname } from "expo-router"
import "react-native-reanimated"

import "../global.css"

import { useColorScheme } from "@/hooks/useColorScheme"
// Create a client
const queryClient = new QueryClient()

function ThemedProviders({ children }: { children: React.ReactNode }) {
	const { darkMode } = useTheme()
	return (
		<GluestackUIProvider mode={darkMode ? "dark" : "light"}>
			<ThemeProvider value={darkMode ? DarkTheme : DefaultTheme}>{children}</ThemeProvider>
		</GluestackUIProvider>
	)
}

export default function RootLayout() {
	const colorScheme = useColorScheme()
	const pathname = usePathname()
	const { darkMode, toggleTheme } = useTheme()
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf")
	})

	if (!loaded) {
		// Async font loading only occurs in development.
		console.log("Font is not loaded yet")
		return null
	}

	return (
		<AppThemeProvider>
			<ThemedProviders>
				<QueryClientProvider client={queryClient}>
					<Providers>
						<Slot />
						{pathname === "/" && (
							<Fab
								onPress={toggleTheme}
								className="m-6"
								size="lg"
							>
								<FabIcon as={darkMode ? MoonIcon : SunIcon} />
							</Fab>
						)}
					</Providers>
				</QueryClientProvider>
			</ThemedProviders>
		</AppThemeProvider>
	)
}
