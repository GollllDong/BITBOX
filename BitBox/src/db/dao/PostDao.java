package db.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import dto.Post;

public class PostDao {

	public static int insertPost(Connection conn, Post post) throws Exception {
		String sql;
		PreparedStatement pstmt = null;
		int result = 0;

		try {
			sql = "INSERT INTO post (food_category, post_title, content_location, post_content, likes, user_id)";
			sql += "VALUES (?, ?, ?, ?, ?, ?)";

			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, post.getFood_category());
			pstmt.setString(2, post.getPost_title());
			pstmt.setString(3, post.getContent_location());
			pstmt.setString(4, post.getPost_content());
			pstmt.setString(5, post.getLikes());
			pstmt.setString(6, post.getUser_id());
			

			result = pstmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (pstmt != null)
				pstmt.close();
		}

		System.out.println("insertPost 성공여부 " + result);
		return result;
	}

	public static int updatePost(Connection conn, Post post) throws Exception {
		String sql;
		PreparedStatement pstmt = null;
		int result = 0;

		try {
			sql = "UPDATE post SET food_category = ?, post_title = ?, content_location = ?, post_content = ?, likes = ? ";
			sql += " WHERE user_id = ? AND post_id = ?";

			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, post.getFood_category());
			pstmt.setString(2, post.getPost_title());
			pstmt.setString(3, post.getContent_location());
			pstmt.setString(4, post.getPost_content());
			pstmt.setString(5, post.getLikes());
			pstmt.setString(6, post.getUser_id());
			pstmt.setInt(7, post.getPost_id());

			result = pstmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (pstmt != null)
				pstmt.close();
		}

		System.out.println("updatePost 성공여부 " + result);
		return result;
	}

	public static int deletePost(Connection conn, Post post) throws Exception {
		String sql;
		PreparedStatement pstmt = null;
		int result = 0;

		try {
			sql = "UPDATE post SET post_isDeleted = 1 WHERE post_id = ? AND user_id = ?";

			pstmt = conn.prepareStatement(sql);

			pstmt.setInt(1, post.getPost_id());
			pstmt.setString(2, post.getUser_id());

			result = pstmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (pstmt != null)
				pstmt.close();
		}

		System.out.println("deletePost 성공여부 " + result);
		return result;
	}

	public static List<Post> getAllPost(Connection conn) throws SQLException {
		List<Post> postList = new ArrayList<>();
		String sql = "SELECT post.post_id, post.food_category, post.post_title, user.course_id, user.user_name, post.post_createDate, likes "
				+ "FROM post, user WHERE post.user_id = user.user_id AND post.post_isDeleted=0 ORDER BY post.post_createDate ASC";
		;

		try (PreparedStatement pstmt = conn.prepareStatement(sql); ResultSet rs = pstmt.executeQuery()) {

			while (rs.next()) {
				Post post = new Post();
				post.setPost_id(rs.getInt("post_id"));
				post.setFood_category(rs.getString("food_category"));
				post.setPost_title(rs.getString("post_title"));
				post.setCourse_id(rs.getString("course_id"));;
				post.setUser_name(rs.getString("user_name"));
				post.setPost_createDate(rs.getDate("post_createDate").toLocalDate());
				post.setLikes(rs.getString("likes"));

				postList.add(post);
			}
		}

		return postList;
	}

	public static Post getPost(Connection conn, int post_id) throws SQLException {

		String sql = "SELECT post.post_id, post.food_category, post.post_title, user.course_id, user.user_name, post.post_createDate, post.content_location, post.post_content, post.likes "
				+ "FROM post, user WHERE post.user_id = user.user_id AND post.post_isDeleted = 0 AND post.post_id = ?";

		try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
			pstmt.setInt(1, post_id);

			try (ResultSet rs = pstmt.executeQuery()) {
				if (rs.next()) {
					// 쿼리 실행 결과를 Post 객체로 변환하여 반환

					Post post = new Post();
					post.setPost_id(rs.getInt("post_id"));
					post.setFood_category(rs.getString("food_category"));
					post.setPost_title(rs.getString("post_title"));
					post.setCourse_id(rs.getString("course_id"));;
					post.setUser_name(rs.getString("user_name"));
					post.setPost_createDate(rs.getDate("post_createDate").toLocalDate());
					post.setContent_location(rs.getString("content_location"));
					post.setPost_content(rs.getString("post_content"));
					post.setLikes(rs.getString("likes"));
					return post;
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {

		}

		return null; // 객체 반환

	}
	
	public static Post getPostWriter(Connection conn, Post post) throws SQLException {

		String sql = "SELECT course_id, user_name "
				+ "FROM user WHERE user_id = ?";

		try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
			pstmt.setString(1, post.getUser_id());

			try (ResultSet rs = pstmt.executeQuery()) {
				if (rs.next()) {
					// 쿼리 실행 결과를 Post 객체로 변환하여 반환

					Post loginedUser = new Post();
					loginedUser.setCourse_id(rs.getString("course_id"));;
					loginedUser.setUser_name(rs.getString("user_name"));
					return loginedUser;
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {

		}

		return null; // 객체 반환

	}

}
