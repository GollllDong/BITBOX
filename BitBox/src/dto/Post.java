package dto;

import java.time.LocalDate;

/* 
* 게시물에 대한 정보를 담는 Post 클래스
* Cmd 클래스를 상속받음
*/
public class Post extends Cmd {
	private Integer post_id; 			// 식별 인덱스 
	private String food_category; 		// 음식 업종 
	private String post_title;		 	// 게시물 제목 
	private String user_id; 			// 사용자 아이디 
	private String post_content;		// 게시물 내용 
	private String content_location;	// 맛집 위치 
	private LocalDate post_createDate;	// 게시물 생성일  
	private Boolean post_isDeleted; 	// 게시물 삭제 여부 
	private String user_name;			// user.유저 이름 
	private String course_id;			// user.기수 
	private String likes; 				// 별점 (* * * * *) 

	/**
	 * 기본 생성자
	 */
	public Post() {
	}

	public Post(Object cmd, Integer post_id, String food_category, String post_title, String user_id, String post_content,
			String content_location, LocalDate post_createDate, Boolean post_isDeleted, String user_name,
			String course_id, String likes) {
		
		this.cmd = cmd;
		this.post_id = post_id;
		this.food_category = food_category;
		this.post_title = post_title;
		this.user_id = user_id;
		this.post_content = post_content;
		this.content_location = content_location;
		this.post_createDate = post_createDate;
		this.post_isDeleted = post_isDeleted;
		this.user_name = user_name;
		this.course_id = course_id;
		this.likes = likes;
	}

	public Integer getPost_id() {
		return post_id;
	}

	public void setPost_id(Integer post_id) {
		this.post_id = post_id;
	}

	public String getFood_category() {
		return food_category;
	}

	public void setFood_category(String food_category) {
		this.food_category = food_category;
	}

	public String getPost_title() {
		return post_title;
	}

	public void setPost_title(String post_title) {
		this.post_title = post_title;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getPost_content() {
		return post_content;
	}

	public void setPost_content(String post_content) {
		this.post_content = post_content;
	}

	public String getContent_location() {
		return content_location;
	}

	public void setContent_location(String content_location) {
		this.content_location = content_location;
	}

	public LocalDate getPost_createDate() {
		return post_createDate;
	}

	public void setPost_createDate(LocalDate post_createDate) {
		this.post_createDate = post_createDate;
	}

	public Boolean getPost_isDeleted() {
		return post_isDeleted;
	}

	public void setPost_isDeleted(Boolean post_isDeleted) {
		this.post_isDeleted = post_isDeleted;
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

	public String getLikes() {
		return likes;
	}

	public void setLikes(String likes) {
		this.likes = likes;
	}

	
	


	

}
