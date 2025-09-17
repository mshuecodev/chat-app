// hooks/useConversations.ts
import { ConversationQuery, createConversation, getConversations } from "@/lib/api/chat"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export function useConversations(params?: ConversationQuery) {
	return useQuery({
		queryKey: ["conversations", params],
		queryFn: () => getConversations(params)
	})
}

export function useCreateConversation() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: createConversation,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["conversations"] })
		}
	})
}
