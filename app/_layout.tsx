import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider"
import { AuthProvider } from "@/providers/AuthProvider"
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { useFonts } from "expo-font"
import { Slot } from "expo-router"
import "react-native-reanimated"
import "../global.css"

import { useColorScheme } from "@/hooks/useColorScheme"

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
		<GluestackUIProvider mode={(colorScheme ?? "light") as "light" | "dark"}>
			<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
				<AuthProvider>
					<Slot />
				</AuthProvider>
			</ThemeProvider>
		</GluestackUIProvider>
	)
}
