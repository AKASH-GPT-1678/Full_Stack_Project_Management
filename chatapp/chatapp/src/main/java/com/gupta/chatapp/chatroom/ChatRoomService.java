package com.gupta.chatapp.chatroom;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatRoomService {


    private final ChatRoomRepository chatRoomRepository;

    public Optional<String> getChatRoomId(
            String senderId,
            String recipientId,
            boolean createRoomIfNotExists
    ) {
        return chatRoomRepository.findBySenderIdAndRecipientId(senderId, recipientId)
                .map(ChatRoom::getChatId)
                .or(() -> {
                    if (createRoomIfNotExists) {
                        var chatId = createChat(senderId, recipientId);
                        return Optional.of(chatId);
                    }
                    return Optional.empty();
                });
    }


    private String createChat(String senderId, String recipientId) {

        var chatId = String.format("%s_%s", senderId , recipientId);
        ChatRoom senderRecipent = ChatRoom.builder()
                .senderId(senderId)
                .recipientId(recipientId)
                .chatId(chatId)
                .build();


        ChatRoom recipentSender = ChatRoom.builder()
                .senderId(recipientId)
                .recipientId(senderId)
                .chatId(chatId)
                .build();

        chatRoomRepository.save(senderRecipent);
        chatRoomRepository.save(recipentSender);
        return chatId;
    }
}
