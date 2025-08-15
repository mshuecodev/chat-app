import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider"
import { AuthProvider } from "@/providers/AuthProvider"
import { ThemeProvider as AppThemeProvider, useTheme } from "@/providers/ThemeProvider"
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
// import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { useFonts } from "expo-font"
import { Slot } from "expo-router"
import "react-native-reanimated"
import "../global.css"

import { useColorScheme } from "@/hooks/useColorScheme"

function InnerRootLayout() {
	const { darkMode } = useTheme()

	return (
		<GluestackUIProvider mode={darkMode ? "dark" : "light"}>
			<ThemeProvider value={darkMode ? DarkTheme : DefaultTheme}>
				<AuthProvider>
					<Slot />
				</AuthProvider>
			</ThemeProvider>
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
		return null
	}

	return (
		<AppThemeProvider>
			<InnerRootLayout />
		</AppThemeProvider>
	)
}
