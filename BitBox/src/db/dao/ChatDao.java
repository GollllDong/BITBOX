package db.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import db.DBConnection;
import dto.Chat;

public class ChatDao {
    Connection conn = null;
    PreparedStatement pstmt = null;
    Statement stmt = null;
    ResultSet rs = null;

    public void saveChatRoom(Chat dto) {
        String sql = "INSERT INTO chatroom (ROOM_ID, ROOM_NAME) VALUES (?, ?)";
        try {
            conn = DBConnection.getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, dto.getRoom_id());
            pstmt.setString(2, dto.getRoom_name());

            pstmt.executeUpdate();

            System.out.println("채팅방 저장 완료");

        } catch (Exception e) {
            System.out.println("채팅방 저장 실패");
            e.getStackTrace();
        }
    }
    
    public List<Chat> showChatRoom() {
        String sql = "SELECT * FROM chatroom";
        List<Chat> chatList = new ArrayList<>();
        try {
            conn = DBConnection.getConnection();
            stmt = conn.createStatement();
            rs = stmt.executeQuery(sql);
            while (rs.next()) {
                int room_id = rs.getInt("ROOM_ID");
                String room_name = rs.getString("ROOM_NAME");
                Chat chat = new Chat(room_id, room_name);
                chatList.add(chat);
            }
            System.out.println("채팅방 불러오기 성공");

        } catch (Exception e) {
            System.out.println("채팅방 불러오기 실패");
            e.getStackTrace();
        }
        return chatList;
    }
}
