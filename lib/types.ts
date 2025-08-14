export type User = {
	id: string
	email: string
	name?: string
	avatarUrl?: string
	// add roles/permissions here if needed
}

export type AuthTokens = {
	accessToken: string
	refreshToken: string
}

export type LoginResponse = {
	user: User
} & AuthTokens
