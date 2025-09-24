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
	avatar: string
	lastMessage: string
	created_by: string
	created_at: Date
	memberIds: string[]
	profile: Profiles
}

export type Messages = {
	id: string
	body: string
	created_at: Date
	sender: Profiles
}

export type GetMessagesResponse = {
	conversation: Conversations
	messages: Messages[]
}

export type AuthTokens = {
	accessToken: string
	refreshToken: string
}

export type LoginResponse = {
	user: User
} & AuthTokens
