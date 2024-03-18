package db.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import db.DBConnection;
import DTO.User;

public class LoginDao {
	Connection conn = null;
	PreparedStatement pstmt = null;
	ResultSet rs = null;

	public static int joinUser(User user) throws Exception {
		int result = 0;
	
		// 동일한 유저가 이미 존재하는지 확인 
		if(isUserExists(user.getUser_id())) {
			result = 2; //이미 존재 
			return result;
		}
		
		// SQL 쿼리문 작성
				String sql = "INSERT INTO user (user_id, user_pw) VALUES (?, ?)";
				try (PreparedStatement pstmt = DBConnection.getConnection().prepareStatement(sql)) {
					// PreparedStatement에 값 설정
					pstmt.setString(1, user.getUser_id());
					pstmt.setString(2, user.getUser_pw());

					// 쿼리 실행 및 결과값 반환
					result = pstmt.executeUpdate();
				} catch (Exception e) {
					// 예외 발생 시 오류 출력
					e.printStackTrace();
				}
				// 가입 성공 여부 반환
				return result;
			}

	
	public static int loginUser(User user) throws Exception {
		// 초기값 설정
		int userId = 0;

		// SQL 쿼리문 작성
		String sql = "SELECT user_id FROM user WHERE user_id = ? AND user_pw = ?";
		try (PreparedStatement pstmt = DBConnection.getConnection().prepareStatement(sql)) {
			// PreparedStatement에 값 설정
			pstmt.setString(1, user.getUser_id());
			pstmt.setString(2, user.getUser_pw());

			// 쿼리 실행 및 결과값 처리
			ResultSet resultSet = pstmt.executeQuery();

			// 결과가 존재하는 경우
			if (resultSet.next()) {
				// 로그인 성공 시 유저 ID 설정
				userId = resultSet.getInt("user_id");
			}
		} catch (Exception e) {
			// 예외 발생 시 오류 출력
			e.printStackTrace();
		}

		// 로그인 결과 출력 후 유저 ID 반환
		System.out.printf("\n\n<<  %s  >>\n\n", userId == 0 ? "로그인에 실패했습니다. 다시 시도해 주세요." : "로그인에 성공했습니다.");
		return userId;
	}
	

	public static boolean isUserExists(String user_id) {

		String sql = "SELECT COUNT(*) FROM user WHERE user_id = ?";

		try (PreparedStatement pstmt = DBConnection.getConnection().prepareStatement(sql)) {

			pstmt.setString(1, user_id);

			ResultSet resultSet = pstmt.executeQuery();
			resultSet.next();
			int count = resultSet.getInt(1);

			return count > 0;
		} catch (Exception e) {
			e.printStackTrace();
		} 
		
//		finally {
//	        // 데이터베이스 연결 닫기
//	        DBClose.close(conn, pstmt, null);
//	    }

		return false;
	}
}
