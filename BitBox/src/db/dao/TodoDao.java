package db.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

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
         pstmt.setString(3, todo.getUser_id());

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
         sql = "UPDATE todolist SET todo_isDeleted = 1 WHERE todolist_id AND user_id = ?";

         // 쿼리 실행
         pstmt = conn.prepareStatement(sql);

         pstmt.setInt(1, todo.getTodolist_id());
         pstmt.setString(2, todo.getUser_id());

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

   public static List<TodoList> showDailyTodo(Connection conn) throws SQLException {
      List<TodoList> dailyContent = new ArrayList<>();
      String sql = "SELECT todolist_id, todolist_content, todolist_category " +
                "FROM todolist " +
                "WHERE todolist_category = '일상' AND todolist_isDeleted = 0 " +
                "LIMIT 100";

      try (PreparedStatement pstmt = conn.prepareStatement(sql); ResultSet rs = pstmt.executeQuery()) {

         while (rs.next()) {
            TodoList todoList = new TodoList();
            todoList.setTodolist_category(rs.getString("todolist_category"));
            todoList.setTodolist_content(rs.getString("todolist_content"));
            
            
            dailyContent.add(todoList);
         }
      }
      return dailyContent;
   }
   
   public static List<TodoList> showStudyTodo(Connection conn) throws SQLException {
      List<TodoList> studyContent = new ArrayList<>();
      String sql = "SELECT todolist_id, todolist_content, todolist_category " +
                "FROM todolist " +
                "WHERE todolist_category = '공부' AND todolist_isDeleted = 0 " +
                "LIMIT 100";

      try (PreparedStatement pstmt = conn.prepareStatement(sql); ResultSet rs = pstmt.executeQuery()) {

         while (rs.next()) {
            TodoList todoList = new TodoList();
            todoList.setTodolist_category(rs.getString("todolist_category"));
            todoList.setTodolist_content(rs.getString("todolist_content"));
            
            
            studyContent.add(todoList);
         }
      }
      return studyContent;
   }
   
   public static List<TodoList> showEtcTodo(Connection conn) throws SQLException {
      List<TodoList> etcContent = new ArrayList<>();
      String sql = "SELECT todolist_id, todolist_content, todolist_category " +
                "FROM todolist " +
                "WHERE todolist_category = '기타' AND todolist_isDeleted = 0 " +
                "LIMIT 10";

      try (PreparedStatement pstmt = conn.prepareStatement(sql); ResultSet rs = pstmt.executeQuery()) {

         while (rs.next()) {
            TodoList todoList = new TodoList();
            todoList.setTodolist_category(rs.getString("todolist_category"));
            todoList.setTodolist_content(rs.getString("todolist_content"));
            
            
            etcContent.add(todoList);
         }
      }
      return etcContent;
   }
}
