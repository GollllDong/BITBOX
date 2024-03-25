package server;

import java.net.InetSocketAddress;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;
import org.json.JSONArray;
import org.json.JSONObject;

import db.DBConnection;
import db.dao.ChatDao;
import db.dao.PostDao;
import db.dao.TodoDao;
import db.dao.UserDao;
import dto.Chat;
import dto.Post;
import dto.TodoList;
import dto.User;

public class MainServer extends WebSocketServer {
	// 필드
	private HashMap<Integer, List<Chat>> chatRooms = new HashMap<>();
		
	public static void main(String[] args) {
		String host = "192.168.0.21";
		final int PORT = 9000;

		WebSocketServer server = new MainServer(new InetSocketAddress(host, PORT));
		server.run();

	}

	public MainServer(InetSocketAddress inetAddr) {
		super(inetAddr);
	}

	@Override
	public void onClose(WebSocket conn, int code, String reason, boolean remote) {
		System.out.println(conn + "연결이 끊겼습니다.");

	}

	@Override
	public void onError(WebSocket conn, Exception ex) {
		System.out.println(ex.getMessage());
		ex.getStackTrace();
	}

	@Override
	public void onMessage(WebSocket conn, String message) {
		System.out.println("님이 들어왔습니다" + message);

		JSONObject msgObj = new JSONObject(message);
		// 패킷 종류를 구분할 수 있는 명령어를 제일 먼저 추출
		String cmd = msgObj.getString("cmd");

		if (cmd.equals("signup")) {
			String user_id = msgObj.getString("user_id");
			String user_pw = msgObj.getString("user_pw");
			String user_name = msgObj.getString("user_name");
			String course_id = msgObj.getString("course_id");
			String course_code = msgObj.getString("course_code");

			System.out.printf("[회원가입] id: %s,   password: %s\n,   name: %s\n,   course: %s\n,   code: %s\n", user_id,
					user_pw, user_name, course_id, course_code);

			// 회원가입 시도
			try {
				User user = new User();
				user.setUser_id(user_id);
				user.setUser_pw(user_pw);
				user.setUser_name(user_name);
				user.setCourse_id(course_id);
				user.setCourse_code(course_code);

				int result = UserDao.signupUser(user); // 회원가입 시도

				JSONObject ackObj = new JSONObject();
				ackObj.put("cmd", "signup");

				if (result == 1) {
					// 회원가입 성공 시
					ackObj.put("result", "ok");
				} else if (result == 2) {
					// 이미 존재하는 사용자일 경우
					ackObj.put("result", "exist");
				} else {
					// 그 외의 경우 (가입 실패 등)
					ackObj.put("result", "fail");
				}

				conn.send(ackObj.toString()); // 클라이언트에게 응답 전송
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else if (cmd.equals("login")) {
			String user_id = msgObj.getString("user_id");
			String user_pw = msgObj.getString("user_pw");
			System.out.printf("[로그인] id: %s   pass: %s\n", user_id, user_pw);

			// 로그인 시도
			try {
				User user = new User();
				user.setUser_id(user_id);
				user.setUser_pw(user_pw);

				int id_idx = UserDao.loginUser(user);

				JSONObject ackObj = new JSONObject();
				ackObj.put("cmd", "login");

				if (id_idx != 0) {
					// 로그인 성공 시
					ackObj.put("result", "ok");
					ackObj.put("id_idx", id_idx);
					ackObj.put("user_id", user_id); // 세션 스토리지에 저장하기 위한 응답
				} else {
					// 로그인 실패 시
					ackObj.put("result", "fail");
				}

				conn.send(ackObj.toString()); // 클라이언트에게 응답 전송
			} catch (Exception e) {
				e.printStackTrace();
			}

		} else if (cmd.equals("insertpost")) {

			String food_category = msgObj.getString("food_category");
			String post_title = msgObj.getString("post_title");
			String content_location = msgObj.getString("content_location");
			String post_content = msgObj.getString("post_content");
			String user_id = msgObj.getString("user_id");
			String likes = msgObj.getString("likes");
			System.out.printf("[게시물 작성] id: %s   post_title: %s   content_location: %s   post_content: %s	likes: s\n", user_id,
					post_title, content_location, post_content, likes);

			// 게시물 작성 시도
			try {
				Post post = new Post();
				post.setFood_category(food_category);
				post.setPost_title(post_title);
				post.setContent_location(content_location);
				post.setPost_content(post_content);
				post.setUser_id(user_id);
				post.setLikes(likes);
				int result = PostDao.insertPost(DBConnection.getConnection(), post); // 게시물 작성 시도

				JSONObject ackObj = new JSONObject();
				ackObj.put("cmd", "insertpost");

				if (result == 1) {
					// 게시물 작성 성공 시
					ackObj.put("result", "ok");
				} else {
					// 그 외의 경우 (작성 실패 등)
					ackObj.put("result", "fail");
				}

				conn.send(ackObj.toString()); // 클라이언트에게 응답 전송
			} catch (Exception e) {
				e.printStackTrace();
			}
		}else if (cmd.equals("getuser")) {

			String user_id = msgObj.getString("user_id");
			System.out.printf("[게시물 작성자] id: %s",  user_id);

			try {
				Post post = new Post();
				post.setUser_id(user_id);
				
				Post loginedUser = PostDao.getPostWriter(DBConnection.getConnection(), post); // 게시물 작성 시도

				JSONObject ackObj = new JSONObject();
				ackObj.put("cmd", "getuser");


					if (loginedUser != null) {
						// 조회 결과를 클라이언트에 응답
						ackObj.put("result", "ok");
						// 특정 게시물 정보를 JSON으로 변환하여 응답에 포함
						JSONObject postObj = new JSONObject(loginedUser);
						ackObj.put("post", postObj);
					} else {
						// 게시물이 없을 경우
						ackObj.put("result", "fail");
					}

					conn.send(ackObj.toString()); // 클라이언트에게 응답 전송
				} catch (Exception e) {
					e.printStackTrace();
				}
			
		} else if (cmd.equals("updatepost")) {
			String food_category = msgObj.getString("food_category");
			String post_title = msgObj.getString("post_title");
			String content_location = msgObj.getString("content_location");
			String post_content = msgObj.getString("post_content");
			String likes = msgObj.getString("likes");
			String user_id = msgObj.getString("user_id");
			Integer post_id = msgObj.getInt("post_id");
			System.out.printf(
					"[게시물 수정] food_category: %s   post_title: %s   content_location: %s   post_content: %s   likes: %s 	user_id: %s   Post_id: %d	\n ",
					food_category, post_title, content_location, post_content, likes, user_id, post_id);

			// 게시물 작성 시도
			try {
				Post post = new Post();
				post.setFood_category(food_category);
				post.setPost_title(post_title);
				post.setContent_location(content_location);
				post.setPost_content(post_content);
				post.setLikes(likes);
				post.setUser_id(user_id);
				post.setPost_id(post_id);
				int result = PostDao.updatePost(DBConnection.getConnection(), post);

				JSONObject ackObj = new JSONObject();
				ackObj.put("cmd", "updatepost");

				if (result == 1) {
					ackObj.put("result", "ok");
				} else {
					ackObj.put("result", "fail");
				}

				conn.send(ackObj.toString()); // 클라이언트에게 응답 전송
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else if (cmd.equals("deletepost")) {
			String user_id = msgObj.getString("user_id");
			Integer post_id = msgObj.getInt("post_id");
			System.out.printf("[게시물 삭제]  user_id: %s   Post_id: %d", user_id, post_id);

			// 게시물 작성 시도
			try {
				Post post = new Post();
				post.setUser_id(user_id);
				post.setPost_id(post_id);

				int result = PostDao.deletePost(DBConnection.getConnection(), post);

				JSONObject ackObj = new JSONObject();
				ackObj.put("cmd", "deletepost");
				if (result == 1) {
					ackObj.put("result", "ok");
				} else {
					ackObj.put("result", "fail");
				}

				conn.send(ackObj.toString()); // 클라이언트에게 응답 전송
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else if (cmd.equals("getallpost")) {
			System.out.println("[게시물 전체 조회]");

			// 게시물 전체 조회 시도
			try {
				// 모든 게시물 조회 메서드 호출
				List<Post> allPosts = PostDao.getAllPost(DBConnection.getConnection());

				JSONObject ackObj = new JSONObject();
				ackObj.put("cmd", "getallpost");

				if (!allPosts.isEmpty()) {
					JSONArray postArray = new JSONArray();
					// 게시물 목록을 JSONArray로 변환하여 응답에 추가
					for (Post post : allPosts) {
						JSONObject postObj = new JSONObject();
						postObj.put("post_id", post.getPost_id());
						postObj.put("food_category", post.getFood_category());
						postObj.put("post_title", post.getPost_title());
						postObj.put("course_id", post.getCourse_id());
						postObj.put("user_name", post.getUser_name());
						postObj.put("post_createDate", post.getPost_createDate().toString()); // LocalDate를 문자열로 변환하여 전송
						postObj.put("likes", post.getLikes());
						postArray.put(postObj);
					}
					ackObj.put("posts", postArray);
					ackObj.put("result", "ok");
				} else {
					// 조회 결과가 없을 경우
					ackObj.put("result", "empty");
				}

				conn.send(ackObj.toString()); // 클라이언트에게 응답 전송
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else if (cmd.equals("getpost")) {
			Integer post_id = msgObj.getInt("post_id");
			System.out.printf("[특정 게시물 조회] Post_id: %d\n", post_id);

			try {
				// 게시물 ID를 설정한 후 DAO를 통해 특정 게시물을 가져옴
				Post post = new Post();
				post.setPost_id(post_id);

				Post selectedPost = PostDao.getPost(DBConnection.getConnection(), post_id);

				JSONObject ackObj = new JSONObject();
				ackObj.put("cmd", "getpost");

				if (selectedPost != null) {
					// 조회 결과를 클라이언트에 응답
					ackObj.put("result", "ok");
					// 특정 게시물 정보를 JSON으로 변환하여 응답에 포함
					JSONObject postObj = new JSONObject(selectedPost);
					ackObj.put("post", postObj);
				} else {
					// 게시물이 없을 경우
					ackObj.put("result", "fail");
				}

				conn.send(ackObj.toString()); // 클라이언트에게 응답 전송
			} catch (Exception e) {
				e.printStackTrace();
			}

		} else if (cmd.equals("add_todo")) {
	         String category = msgObj.getString("category");
	         String content = msgObj.getString("todo");
	         String user_id = msgObj.getString("user_id");
	         System.out.printf("todo- category: %s to-do content: %s   user_id: %s\n", category, content, user_id);

	         try {
	            TodoList todo = new TodoList();
	            todo.setTodolist_category(category);
	            todo.setTodolist_content(content);
	            todo.setUser_id(user_id);

	            int result = TodoDao.insertTodo(DBConnection.getConnection(), todo);

	            if (result > 0) {
	               System.out.println("to-do list 추가되었습니다.");
	            } else {
	               System.out.println("to-do list 추가에 실패했습니다.");
	            }
	         } catch (Exception e) {
	            e.printStackTrace();
	         }
	      } else if (cmd.equals("delete_todo")) {
	         String user_id = msgObj.getString("user_id");

	         try {
	            TodoList todo = new TodoList();
	            todo.setUser_id(user_id);

	            int result = TodoDao.deleteTodo(DBConnection.getConnection(), todo);

	            JSONObject ackObj = new JSONObject();
	            if (result == 1) {
	               ackObj.put("result", "ok");
	            } else {
	               ackObj.put("result", "fail");
	            }
	         } catch (Exception e) {
	            e.printStackTrace();

	         }
	      } else if (cmd.equals("show_daily")) {
	         System.out.printf("일상 to-do List 조회");

	         try {
	            List<TodoList> dailyList = TodoDao.showDailyTodo(DBConnection.getConnection());

	            JSONObject ackObj = new JSONObject();
	            ackObj.put("cmd", "show_daily");

	            if (!dailyList.isEmpty()) {
	               JSONArray dailyArray = new JSONArray();

	               for (TodoList todo : dailyList) {
	                  JSONObject studyObj = new JSONObject();
	                  studyObj.put("todolist_id", todo.getTodolist_id());
	                  studyObj.put("todolist_category", todo.getTodolist_category());
	                  studyObj.put("todolist_content", todo.getTodolist_content());
	                  dailyArray.put(studyObj);
	               }
	               ackObj.put("todos", dailyArray);
	               ackObj.put("result", "ok");
	            } else {
	               // 게시물이 없을 경우
	               ackObj.put("result", "fail");
	            }

	            conn.send(ackObj.toString()); // 클라이언트에게 응답 전송

	         } catch (Exception e) {
	            e.printStackTrace();

	         }
	      } else if (cmd.equals("show_study")) {
	         System.out.printf("공부 to-do List 조회");

	         try {
	            List<TodoList> studyList = TodoDao.showStudyTodo(DBConnection.getConnection());

	            JSONObject ackObj = new JSONObject();
	            ackObj.put("cmd", "show_study");

	            if (!studyList.isEmpty()) {
	               JSONArray studyArray = new JSONArray();

	               for (TodoList todo : studyList) {
	                  JSONObject studyObj = new JSONObject();
	                  studyObj.put("todolist_id", todo.getTodolist_id());
	                  studyObj.put("todolist_category", todo.getTodolist_category());
	                  studyObj.put("todolist_content", todo.getTodolist_content());
	                  studyArray.put(studyObj);
	               }
	               ackObj.put("todos", studyArray);
	               ackObj.put("result", "ok");
	            } else {
	               // 게시물이 없을 경우
	               ackObj.put("result", "fail");
	            }

	            conn.send(ackObj.toString()); // 클라이언트에게 응답 전송

	         } catch (Exception e) {
	            e.printStackTrace();

	         }
	      } else if (cmd.equals("show_etc")) {
	         System.out.printf("기타 to-do List 조회");

	         try {
	            List<TodoList> etcList = TodoDao.showEtcTodo(DBConnection.getConnection());

	            JSONObject ackObj = new JSONObject();
	            ackObj.put("cmd", "show_etc");

	            if (!etcList.isEmpty()) {
	               JSONArray etcArray = new JSONArray();

	               for (TodoList todo : etcList) {
	                  JSONObject studyObj = new JSONObject();
	                  studyObj.put("todolist_id", todo.getTodolist_id());
	                  studyObj.put("todolist_category", todo.getTodolist_category());
	                  studyObj.put("todolist_content", todo.getTodolist_content());
	                  etcArray.put(studyObj);
	               }
	               ackObj.put("todos", etcArray);
	               ackObj.put("result", "ok");
	            } else {
	               // 게시물이 없을 경우
	               ackObj.put("result", "fail");
	            }

	            conn.send(ackObj.toString()); // 클라이언트에게 응답 전송

	         } catch (Exception e) {
	            e.printStackTrace();

	         }
		} else if (cmd.equals("newchat")) {
			int room = msgObj.getInt("room");
			String roomName = msgObj.getString("name");
			Chat newRoom = new Chat(room, roomName);
			
			// 소켓가진 유저 채팅리스트에 넣기
			List<Chat> chatClient = new ArrayList<Chat>();
			chatRooms.put(room, chatClient);
			
			// 채팅방생성했는지
			System.out.printf("room: %s\n", room);
			
			// 응답객체
			JSONObject ackObj = new JSONObject();
			ackObj.put("cmd", "newchat");
			ackObj.put("result", "ok");

			// 생성된 채팅방을 디비에 저장
            Chat chatDto = new Chat(msgObj, conn);
            ChatDao chatDao = new ChatDao();
			chatDao.saveChatRoom(chatDto);
			chatDao.showChatRoom();
		}else if (cmd.equals("enterchat")) {
			// 해당 채팅방에 클라이언트 들어가기
			Chat chatClient = new Chat(msgObj, conn);
			int room = chatClient.getRoom_id();
			
			List<Chat> enteredChatClient = chatRooms.get(room);
			enteredChatClient.add(chatClient);
			
			// 응답객체
			JSONObject ackObj = new JSONObject();
			ackObj.put("cmd", "enterchat");
			ackObj.put("result", "ok");
			conn.send(ackObj.toString());
			
		} else if (cmd.equals("getchat")) {
			ChatDao chatDao = new ChatDao();
			List<Chat> chats = chatDao.showChatRoom();
			
//			for (int i = 0; i < chats.size(); i++) {
//				Chat chat = chats.get(i);
////				chat.setConn(conn);
//				chatRooms.put(chat.getRoom_id(), chats);
//			}
//			for (int i = 0; i < chats.size(); i++){
//                Chat chat = chats.get(i);
//                chatRooms.put(chat.getRoom_id(), chats);
//            }
			
			
			// 조회 결과를 클라이언트에 응답
			JSONObject ackObj = new JSONObject();
			// 특정게시물 정보를 JSON으로 변환하여 응답에 포함
			JSONArray chatObj = new JSONArray(chats);
			ackObj.put("cmd", "getchat");
			ackObj.put("chatList", chatObj);
			ackObj.put("result", "ok");
			
			conn.send(ackObj.toString());
		} else if (cmd.equals("chat")) {
			int room = msgObj.getInt("room");
			String id = msgObj.getString("id");
			String msg = msgObj.getString("msg");
			System.out.printf("id: %s   msg: %s\n", id, msg);

			// 접속한 애들의 정보
			List<Chat> chatClientList = chatRooms.get(room);
			for (Chat chat : chatClientList) {
				WebSocket con = chat.getConn();
				con.send(message);
			}
		} 
	}

	@Override
	public void onOpen(WebSocket conn, ClientHandshake handshake) {
		String hostIp = conn.getRemoteSocketAddress().getAddress().getHostAddress().toString();
		System.out.println(hostIp + " 님이 연결되었습니다."); // 누가 연결 했는지

		JSONObject ackObj = new JSONObject();
		ackObj.put("cmd", "connect");
		ackObj.put("result", "연결 성공 !!!");
		conn.send(ackObj.toString()); // 클라이언트한테 메시지 보내기

	}

	@Override
	public void onStart() {
		// DB 연결 초기화
		DBConnection.open(); // DB 연결을 초기화하는 메서드 호출
		// 서버 연결
		System.out.println("BitBox 서버 실행 !!!");
	}

	@Override
	public void stop() throws InterruptedException {
		// 서버 종료 시 DB 연결 종료
		DBConnection.close();
		super.stop();
		System.out.println("BitBox 서버 종료 !!!");
	}

}
