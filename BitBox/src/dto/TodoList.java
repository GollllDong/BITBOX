package dto;

import java.io.Serializable;

public class TodoList extends Cmd implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer todolist_idx;
	private String todolist_category;
	private String todolist_content;
	private Boolean todolist_isComplete;
	private Boolean todolist_isDeleted;
	private Integer user_id;
	
	public TodoList() {
		
	}
	
	public TodoList(Object cmd, Integer todolist_idx, String todolist_category, String todolist_content, Boolean todolist_isComplete, Boolean todolist_isDeleted, Integer user_id) {
		this.cmd = cmd;
		this.todolist_idx = todolist_idx;
		this.todolist_category = todolist_category;
		this.todolist_content = todolist_content;
		this.todolist_isComplete = todolist_isComplete;
		this.todolist_isDeleted = todolist_isDeleted;
		this.user_id = user_id;
	}

	public Integer getTodolist_idx() {
		return todolist_idx;
	}

	public void setTodolist_idx(Integer todolist_idx) {
		this.todolist_idx = todolist_idx;
	}

	public String getTodolist_category() {
		return todolist_category;
	}

	public void setTodolist_category(String todolist_category) {
		this.todolist_category = todolist_category;
	}

	public String getTodolist_content() {
		return todolist_content;
	}

	public void setTodolist_content(String todolist_content) {
		this.todolist_content = todolist_content;
	}

	public Boolean getTodolist_isComplete() {
		return todolist_isComplete;
	}

	public void setTodolist_isComplete(Boolean todolist_isComplete) {
		this.todolist_isComplete = todolist_isComplete;
	}

	public Boolean getTodolist_isDeleted() {
		return todolist_isDeleted;
	}

	public void setTodolist_isDeleted(Boolean todolist_isDeleted) {
		this.todolist_isDeleted = todolist_isDeleted;
	}

	public Integer getUser_id() {
		return user_id;
	}

	public void setUser_id(Integer user_id) {
		this.user_id = user_id;
	}

}