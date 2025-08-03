package com.gupta.chatapp.chatroom;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Document
public class ChatRoom {


    @Id
    private String chatId;

    private String senderId;

    private String recipientId;



}
