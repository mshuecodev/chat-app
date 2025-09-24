import { api } from "@/lib/api"
import { Conversations, GetMessagesResponse } from "@/lib/types"

export type ConversationQuery = {
	page?: number
	limit?: number
	search?: string
}

export async function getConversations(params?: ConversationQuery): Promise<Conversations[]> {
	const res = await api.get<{ conversations: Conversations[] }>("/sb/conversation", { params })
	return res.data?.conversations
}

export async function createConversation(payload: Partial<Conversations>): Promise<Conversations> {
	const res = await api.post<Conversations>("/sb/conversation", payload)
	return res.data
}

export async function signAttachmentUrl(id: string, payload: { fileName: string; fileType: string }) {
	const res = await api.post<{ url: string }>(`/sb/conversation/${id}/attachments/sign`, payload)
	return res.data
}

export async function getMessages(convoId: string): Promise<GetMessagesResponse> {
	const res = await api.get<GetMessagesResponse>(`/sb/chat/${convoId}`)
	// console.log("get messages:", res.data)
	return res.data
}
