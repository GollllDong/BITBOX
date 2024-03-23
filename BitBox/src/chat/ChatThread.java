package chat;

import java.util.HashMap;

import org.java_websocket.WebSocket;
import org.json.JSONObject;


public class ChatThread extends Thread {
	private int room_id;
    private HashMap<String, WebSocket> userList = new HashMap<String, WebSocket>();
    
    public ChatThread(int room_id) {
        this.room_id = room_id;
    }
    
    public void addUser(String user_id, WebSocket socket) {
    	this.userList.put(user_id, socket);
    }

    public void run(String message) {
        while(true) {
        	
        }
    }

//    public HashMap<Integer, WebSocket> getChatList() {
//        return userList;
//    }
//	public ChatRoom(ChatRoomDto dto, User user) {
//	this.userList.put(dto.getRoom_id(), user.getUser_id());
//}

}
