package db.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import db.DBConnection;
import dto.TodoList;

public class todoDao {
	Connection conn = null;
	PreparedStatement pstmt = null;
	ResultSet rs = null;

	public static int categoryDaily(TodoList todo) throws Exception {
		int result = 0;

		// SQL 쿼리문 작성
		String sql = "INSERT INTO todolist (todolist_category, todolist_content, user_id ) VALUES ('일상', ?, ?)";
		try (PreparedStatement pstmt = DBConnection.getConnection().prepareStatement(sql)) {
			// PreparedStatement에 값 설정
			pstmt.setString(1, todo.getTodolist_content());
			pstmt.setString(2, todo.getUser_id());

			// 쿼리 실행 및 결과값 반환
			result = pstmt.executeUpdate();
		} catch (Exception e) {
			// 예외 발생 시 오류 출력
			e.printStackTrace();
		}
		// 가입 성공 여부 반환
		return result;
	}

//	public static int categoryStudy(TodoList todo) throws Exception {
//		int result = 0;
//
//		// SQL 쿼리문 작성
//		String sql = "INSERT INTO todolist (todolist_category, todolist_content) VALUES (공부, ?, ?)";
//		try (PreparedStatement pstmt = DBConnection.getConnection().prepareStatement(sql)) {
//			// PreparedStatement에 값 설정
//			pstmt.setString(1, todo.getTodolist_category());
//			pstmt.setString(2, todo.getTodolist_content());
//
//			// 쿼리 실행 및 결과값 반환
//			result = pstmt.executeUpdate();
//		} catch (Exception e) {
//			// 예외 발생 시 오류 출력
//			e.printStackTrace();
//		}
//		// 가입 성공 여부 반환
//		return result;
//	}
//	
//	public static int categoryEtc(TodoList todo) throws Exception {
//		int result = 0;
//
//		// SQL 쿼리문 작성
//		String sql = "INSERT INTO todolist (todolist_category, todolist_content) VALUES (기타, ?, ?)";
//		try (PreparedStatement pstmt = DBConnection.getConnection().prepareStatement(sql)) {
//			// PreparedStatement에 값 설정
//			pstmt.setString(1, todo.getTodolist_category());
//			pstmt.setString(2, todo.getTodolist_content());
//
//			// 쿼리 실행 및 결과값 반환
//			result = pstmt.executeUpdate();
//		} catch (Exception e) {
//			// 예외 발생 시 오류 출력
//			e.printStackTrace();
//		}
//		// 가입 성공 여부 반환
//		return result;
//	}
}
