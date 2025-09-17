import { api } from "@/lib/api"
import { Conversations } from "@/lib/types"

export type ConversationQuery = {
	page?: number
	limit?: number
	search?: string
}

export const conversationService = {
	async getConversations(params?: ConversationQuery): Promise<Conversations[]> {
		const res = await api.get<{ conversation: Conversations[] }>("/sb/conversation", { params })
		return res.data.conversation
	},

	async createConversation(payload: Partial<Conversations>): Promise<Conversations> {
		const res = await api.post<Conversations>("/sb/conversation", payload)
		return res.data
	},

	async signAttachmentUrl(id: string, payload: { fileName: string; fileType: string }) {
		const res = await api.post<{ url: string }>(`/sb/conversation/${id}/attachments/sign`, payload)
		return res.data
	}
}
