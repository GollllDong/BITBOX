package dto;

/*
* 사용자 정보를 담는 User 클래스
* Cmd 클래스를 상속받음
*/
public class User extends Cmd {
	private Integer id_idx; // 식별 인덱스 
	private String user_id; // 사용자 고유 ID
	private String user_pw; // 사용자 비밀번호
	private String user_name; // 사용자 이름
	private String course_id;	// 과정 id
	private String course_code;	// 회원가입 코드 

	/**
	 * 기본 생성자
	 */
	public User() {
	}

	public User(Object cmd, Integer id_idx, String user_id, String user_pw, String user_name, String course_id,
			String course_code) {
		this.cmd = cmd;
		this.id_idx = id_idx;
		this.user_id = user_id;
		this.user_pw = user_pw;
		this.user_name = user_name;
		this.course_id = course_id;
		this.course_code = course_code;
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

	public String getUser_pw() {
		return user_pw;
	}

	public void setUser_pw(String user_pw) {
		this.user_pw = user_pw;
	}

	public String getUser_name() {
		return user_name;
	}

	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}

	public String getCourse_id() {
		return course_id;
	}

	public void setCourse_id(String course_id) {
		this.course_id = course_id;
	}

	public String getCourse_code() {
		return course_code;
	}

	public void setCourse_code(String course_code) {
		this.course_code = course_code;
	}

	
	
}
