import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider"
import { ThemeProvider as AppThemeProvider, useTheme } from "@/providers/ThemeProvider"
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
// import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { Providers } from "@/providers/index"
import { useFonts } from "expo-font"
import { Slot } from "expo-router"
import "react-native-reanimated"
import "../global.css"

import { useColorScheme } from "@/hooks/useColorScheme"

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
				<Providers>
					<Slot />
				</Providers>
			</ThemedProviders>
		</AppThemeProvider>
	)
}
