package DTO;

import java.io.Serializable;

/**
 * 사용자 정보를 담는 User 클래스
 * Cmd 클래스를 상속받아 Serializable을 구현
 * 사용자의 고유 ID, 이름, 비밀번호를 멤버 변수로 가지고 있
 * 주석을 통해 각 라인의 역할과 메서드의 기능이 설명
 * 
 * 
 * User 클래스 : 사용자 정보를 담는 클래스로, Cmd를 상속받아 Serializable을 구현
 */
public class User extends Cmd implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer id_idx; 		// 식별 인덱
	private String user_id;			// 사용자 고유 ID
	private String user_name;		// 사용자 이름
	private String user_pw; 		// 사용자 비밀번호

	/**
	 * 기본 생성자
	 */
	public User() {
	}

	
	
	
	
	public User(Object cmd, Integer id_idx, String user_id, String user_name, String user_pw) {
		this.cmd = cmd;
		this.id_idx = id_idx;
		this.user_id = user_id;
		this.user_name = user_name;
		this.user_pw = user_pw;
	}





	public Integer getId_idx() {
		return id_idx;
	}

	public void setId_idx(Integer id_idx) {
		this.id_idx = id_idx;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getUser_name() {
		return user_name;
	}

	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}

	public String getUser_pw() {
		return user_pw;
	}

	public void setUser_pw(String user_pw) {
		this.user_pw = user_pw;
	}

	
	
}
