import AsyncStorage from "@react-native-async-storage/async-storage" // For RN
import { createContext, useCallback, useContext, useEffect, useState } from "react"
// For web fallback
const storage = {
	getItem: async (key: string) => {
		if (typeof window !== "undefined" && window.localStorage) {
			return localStorage.getItem(key)
		}
		return await AsyncStorage.getItem(key)
	},
	setItem: async (key: string, value: string) => {
		if (typeof window !== "undefined" && window.localStorage) {
			localStorage.setItem(key, value)
		} else {
			await AsyncStorage.setItem(key, value)
		}
	}
}

type ThemeContextType = {
	darkMode: boolean
	toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
	darkMode: false,
	toggleTheme: () => {}
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [darkMode, setDarkMode] = useState(false)

	// Load theme from storage
	useEffect(() => {
		;(async () => {
			const storedTheme = await storage.getItem("darkMode")
			if (storedTheme !== null) {
				setDarkMode(storedTheme === "true")
			}
		})()
	}, [])

	const toggleTheme = useCallback(() => {
		setDarkMode((prev) => {
			const newValue = !prev
			storage.setItem("darkMode", String(newValue))
			return newValue
		})
	}, [])

	return <ThemeContext.Provider value={{ darkMode, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
	return useContext(ThemeContext)
}
