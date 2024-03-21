package dto;

import org.json.JSONObject;

public class Chat {
    private int room_id;
    private String room_name;

    public Chat(int room_id, String room_name) {
        this.room_id = room_id;
        this.room_name = room_name;

    }

    public Chat(JSONObject msgObj){
        this.room_id = msgObj.getInt("room");
        this.room_name = msgObj.getString("name");
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
}
