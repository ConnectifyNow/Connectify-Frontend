import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import { Chat, User } from "@/types";
import { addConversation, getConversationWith } from "@/services/chatService";
import {
  GET_CONVERSATION_WITH,
  GET_CONVERSATIONS
} from "@/utils/constants/queries";

const useConversationWith = (userId?: User["_id"]) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { refetch: getConversationWithQuery } = useQuery(
    [GET_CONVERSATION_WITH, userId],
    () => getConversationWith(userId),
    {
      enabled: false
    }
  );

  const startConversationWithMutation = useMutation(
    () => addConversation(userId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_CONVERSATIONS);
      }
    }
  );

  const goToConversation = (conversationId: Chat["_id"]) => {
    navigate(`/inbox/${conversationId}`, { replace: true });
  };

  const getConversation = async () => {
    const conversation = await getConversationWithQuery();
    if (conversation.data?.data?._id) {
      return conversation.data.data;
    }
    return null;
  };

  const createConversation = async () => {
    return (await startConversationWithMutation.mutateAsync()).data;
  };

  const startConversation = async () => {
    let conversation = await getConversation();
    if (!conversation) {
      conversation = await createConversation();
    }

    goToConversation(conversation._id);
  };

  return { startConversation };
};

export default useConversationWith;
