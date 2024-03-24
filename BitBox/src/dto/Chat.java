package dto;

import org.java_websocket.WebSocket;
import org.json.JSONObject;

public class Chat {
    private int room_id;
    private String room_name;
    private String user_id;
    private WebSocket conn;
    
    public Chat(JSONObject msgObj, WebSocket conn){
        this.room_id = msgObj.getInt("room");
        this.room_name = msgObj.getString("name");
        this.user_id = msgObj.getString("id");
        this.conn = conn;
    }


    public Chat(int room_id, String room_name) {
        this.room_id = room_id;
        this.room_name = room_name;

    }

    public int getRoom_id() {
        return room_id;
    }

    public void setRoom_id(int room_id) {
        this.room_id = room_id;
    }

    public String getRoom_name() {
        return room_name;
    }

    public void setRoom_name(String room_name) {
        this.room_name = room_name;
    }

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public WebSocket getConn() {
		return conn;
	}

	public void setConn(WebSocket conn) {
		this.conn = conn;
	}
    
}
