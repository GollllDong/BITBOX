package db.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import db.DBConnection;
import dto.User;

public class UserDao {

	/**
	 * @author 김동우 SignupUser : 새로운 사용자를 데이터베이스에 추가. 동일한 사용자가 이미 존재하는지 확인한 후, 새로운
	 *         사용자 정보를 데이터베이스에 추가
	 * @param user 추가할 사용자 정보를 담은 User 객체
	 * @return int 가입 성공 여부를 나타내는 정수값 0은 가입 실패, 1은 가입 성공, 2는 이미 사용 중인 아이디임.
	 */
	public static int signupUser(User user) throws Exception {
		String sql;
		int result = 0;

		// 동일한 유저가 이미 존재하는지 확인
		if (isUserExists(user.getUser_id())) {
			result = 2; // 이미 존재
			return result;
		}

		// SQL 쿼리문 작성
		sql = "INSERT INTO user (user_id, user_pw, user_name, course_id, course_code) VALUES (?, ?, ?, ?, ?)";
		try (PreparedStatement pstmt = DBConnection.getConnection().prepareStatement(sql)) {
			// PreparedStatement에 값 설정
			pstmt.setString(1, user.getUser_id());
			pstmt.setString(2, user.getUser_pw());
			pstmt.setString(3, user.getUser_name());
			pstmt.setString(4, user.getCourse_id());
			pstmt.setString(5, user.getCourse_code());
			

			// 쿼리 실행 및 결과값 반환
			result = pstmt.executeUpdate();

			System.out.printf("\n\n<<  %s  >>\n\n", result == 1 ? "회원가입에 성공했습니다." : "회원가입에 실패했습니다.");

		} catch (Exception e) {
			// 예외 발생 시 오류 출력
			e.printStackTrace();
		}
		// 가입 성공 여부 반환
		return result;
	}

	/**
	 * @author 김동우 loginUser : 사용자의 로그인을 처리합니다.
	 * 
	 * @param user 사용자 객체, 로그인 시 필요한 사용자 아이디와 비밀번호 정보를 포함
	 * @return int 로그인 성공 시 id_idx 반환, 실패 시 0 반환
	 */
	public static int loginUser(User user) throws Exception {
		String sql;
		// 초기값 설정
		int id_idx = 0;

		// SQL 쿼리문 작성
		sql = "SELECT id_idx FROM user WHERE user_id = ? AND user_pw = ?";
		try (PreparedStatement pstmt = DBConnection.getConnection().prepareStatement(sql)) {
			// PreparedStatement에 값 설정
			pstmt.setString(1, user.getUser_id());
			pstmt.setString(2, user.getUser_pw());

			// 쿼리 실행 및 결과값 처리
			ResultSet resultSet = pstmt.executeQuery();

			// 결과가 존재하는 경우
			if (resultSet.next()) {
				// 로그인 성공 시 유저 ID 설정
				id_idx = resultSet.getInt("id_idx");
			}
		} catch (Exception e) {
			// 예외 발생 시 오류 출력
			e.printStackTrace();
		}

		// 로그인 결과 출력 후 유저 ID 반환
		System.out.printf("\n\n<<  %s  >>\n\n", id_idx == 0 ? "로그인에 실패했습니다. 다시 시도해 주세요." : "로그인에 성공했습니다.");
		return id_idx;
	}

	/**
	 * @author 김동우 isUserExists : 주어진 사용자 아이디가 데이터베이스에 이미 존재하는지 확인
	 * 
	 * @param user_id 데이터베이스에서 확인할 사용자 아이디
	 * @return boolean 사용자 아이디가 이미 존재하면 true, 그렇지 않으면 false를 반환
	 */
	public static boolean isUserExists(String user_id) {
		String sql;

		sql = "SELECT COUNT(*) FROM user WHERE user_id = ?";

		try (PreparedStatement pstmt = DBConnection.getConnection().prepareStatement(sql)) {

			pstmt.setString(1, user_id);

			ResultSet resultSet = pstmt.executeQuery();
			resultSet.next();
			int count = resultSet.getInt(1);

			return count > 0;
		} catch (Exception e) {
			e.printStackTrace();
		} finally {

		}

		return false;
	}
}
