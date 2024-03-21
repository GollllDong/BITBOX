package db.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import db.DBConnection;
import dto.Chat;

public class ChatDao {
    Connection conn = null;
    PreparedStatement pstmt = null;
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
}
