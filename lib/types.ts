export type User = {
	id: string
	email: string
	name?: string
	avatarUrl?: string
	// add roles/permissions here if needed
}

export type Profiles = {
	id: string
	user_id: string
	display_name: string
	avatar_url: string
	full_name: string
	email: string
}

export type Conversations = {
	id: string
	is_group: boolean
	title: string
	created_by: string
	created_at: Date
}

export type AuthTokens = {
	accessToken: string
	refreshToken: string
}

export type LoginResponse = {
	user: User
} & AuthTokens
