package db.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import dto.TodoList;

public class TodoDao {

	public static int insertTodo(Connection conn, TodoList todo) throws Exception {
		String sql;
		PreparedStatement pstmt = null;
		int result = 0;

		try {
			// SQL 쿼리문 작성
			sql = "INSERT INTO todolist (todolist_category, todolist_content, user_id ) VALUES (?, ?, ?)";

			// PreparedStatement에 값 설정
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, todo.getTodolist_category());
			pstmt.setString(2, todo.getTodolist_content());
			pstmt.setInt(3, todo.getUser_id());

			// 쿼리 실행 및 결과값 반환
			result = pstmt.executeUpdate();
		} catch (Exception e) {
			// 예외 발생 시 오류 출력
			e.printStackTrace();
		}
		// 가입 성공 여부 반환
		return result;
	}

	public static int deleteTodo(Connection conn, TodoList todo) throws Exception {
		String sql;
		PreparedStatement pstmt = null;
		int result = 0;

		try {
			// todo_isDeleted = 1로 변경 + category, content, user_id 이 3가지의 값이
			sql = "UPDATE todolist SET todo_isDeleted = 1 WHERE todolist_category = ? AND todolist_content = ? AND user_id = ?";

			// 쿼리 실행
			pstmt = conn.prepareStatement(sql);

			pstmt.setString(1, todo.getTodolist_category());
			pstmt.setString(2, todo.getTodolist_content());
			pstmt.setInt(3, todo.getUser_id());

			result = pstmt.executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (pstmt != null)
				pstmt.close();
		}

		System.out.println("deleteTodo 성공여부" + result);
		return result;
	}

//	public static TodoList showTodo(Connection conn, int todolist_id) throws SQLException {
//
//		String sql = "SELECT todolist_category, todolist_content" + "FROM todolist WHERE todolist_isDeleted = 0";
//
//		try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
//			pstmt.setInt(1, todolist_id);
//
//			try (ResultSet rs = pstmt.executeQuery()) {
//				if (rs.next()) {
//
//					TodoList todo = new TodoList();
//					todo.setTodolist_id(todolist_id);
//					todo.setTodolist_category(rs.getString("Todolist_category"));
//					todo.setTodolist_content(rs.getString("Todolist_content"));
//
//					return todo;
//				}
//			}
//
//		} catch (Exception e) {
//			// 예외 발생 시 오류 출력
//			e.printStackTrace();
//		} finally {
//			return null;
//		}
//	}
}
