import { createContext, useCallback, useContext, useState } from "react"

const ThemeContext = createContext({
	darkMode: false,
	toggleTheme: () => {}
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [darkMode, setDarkMode] = useState(false)
	// const toggleTheme = () => setDarkMode((prev) => !prev)
	const toggleTheme = useCallback(() => {
		setDarkMode((prev) => !prev)
	}, [])

	return <ThemeContext.Provider value={{ darkMode, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
	return useContext(ThemeContext)
}
