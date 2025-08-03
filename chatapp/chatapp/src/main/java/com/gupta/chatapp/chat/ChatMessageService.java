package com.gupta.chatapp.chat;


import com.gupta.chatapp.chatroom.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatMessageService {

    private final ChatRepository chatRepository;
    private final ChatRoomService chatRoomService;


    public ChatMessage save(ChatMessage chatMessage){
        var chatId = chatRoomService.getChatRoomId(chatMessage.getSenderId(), chatMessage.getRecipentId(), true)
                .orElseThrow()



                ;
        chatMessage.setChatId(chatId);
        chatRepository.save(chatMessage);
        return chatMessage;

    }


    public List<ChatMessage> findChatMessages(
            String senderId,
            String  recipentId
    ){
        var chatId = chatRoomService.getChatRoomId(senderId , recipentId ,false);
        return chatId.map(chatRepository::findByChatId).orElse(new ArrayList<>());

    }
}
