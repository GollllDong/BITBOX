package server;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.java_websocket.WebSocket;

import db.dao.ChatDao;


public class ChatRoom extends Thread {
//    private int room_id;
    private HashMap<Integer, WebSocket> chatList;
//    private List<WebSocket> participants;

    //	public ChatRoom(ChatRoomDto dto, User user) {
//		this.userList.put(dto.getRoom_id(), user.getUser_id());
//	}
    public ChatRoom(int room_id, WebSocket socket) {
//        this.room_id = room_id;
        this.chatList.put(room_id, socket);
    }

    public void run() {
        while(true) {

        }
    }

    public HashMap<Integer, WebSocket> getChatList() {
        return chatList;
    }
    // 채팅방에 참여자 추가
//    public void joinChat(WebSocket participant) {
//        participants.add(participant);
//        ChatDao dao = new ChatDao();
//    }

    // 채팅방에서 메시지 전달
//    public void broadcastMessage(String message) {
//        for (WebSocket participant : participants) {
//            participant.send(message);
//        }
//    }

}
