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
			sql = "INSERT INTO post (food_category, post_title, content_location, post_content, user_id)";
			sql += "VALUES (?, ?, ?, ?, ?)";

			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, post.getFood_category());
			pstmt.setString(2, post.getPost_title());
			pstmt.setString(3, post.getContent_location());
			pstmt.setString(4, post.getPost_content());
			pstmt.setString(5, post.getUser_id());

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
			sql = "UPDATE post SET food_category = ?, post_title = ?, content_location = ?, post_content = ?";
			sql += "WHERE user_id = ? AND post_id = ?";

			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, post.getFood_category());
			pstmt.setString(2, post.getPost_title());
			pstmt.setString(3, post.getContent_location());
			pstmt.setString(4, post.getPost_content());
			pstmt.setString(5, post.getUser_id());
			pstmt.setInt(6, post.getPost_id());

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
		String sql = "SELECT post_id, food_category, post_title, content_location, user_id, post_createDate "
				+ "FROM post WHERE post_isDeleted = 0 ORDER BY post_createDate ASC";

		try (PreparedStatement pstmt = conn.prepareStatement(sql); ResultSet rs = pstmt.executeQuery()) {

			while (rs.next()) {
				Post post = new Post();
				post.setPost_id(rs.getInt("post_id"));
				post.setFood_category(rs.getString("food_category"));
				post.setPost_title(rs.getString("post_title"));
				post.setContent_location(rs.getString("content_location"));
				post.setUser_id(rs.getString("user_id"));
				post.setPost_createDate(rs.getDate("post_createDate").toLocalDate());

				postList.add(post);
			}
		}

		return postList;
	}

	public static Post getPost(Connection conn, int post_id) throws SQLException {

		String sql = "SELECT food_category, post_title, post_createDate, user_id, content_location, post_content "
				+ "FROM post WHERE post_isDeleted = 0 AND post_id = ?";

		try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
			pstmt.setInt(1, post_id);

			try (ResultSet rs = pstmt.executeQuery()) {
				if (rs.next()) {
					// 쿼리 실행 결과를 Post 객체로 변환하여 반환

					Post post = new Post();
					post.setPost_id(post_id);
					post.setFood_category(rs.getString("food_category"));
					post.setPost_title(rs.getString("post_title"));
					post.setPost_createDate(rs.getDate("post_createDate").toLocalDate());
					post.setUser_id(rs.getString("user_id"));
					post.setContent_location(rs.getString("content_location"));
					post.setPost_content(rs.getString("post_content"));

					return post;
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {

		}

		return null; // 객체 반환

	}
	
	
	
}
