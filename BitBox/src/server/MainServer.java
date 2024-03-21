package server;

import java.net.InetSocketAddress;
import java.net.Socket;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import db.dao.ChatDao;
import dto.Chat;
import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;
import org.json.JSONObject;

import db.DBConnection;
import db.dao.TodoDao;
import db.dao.UserDao;
import dto.TodoList;
import dto.User;

public class MainServer extends WebSocketServer {
	private List<ChatRoom> chatRooms;

	public static void main(String[] args) {

		String host = "127.0.0.1";
		final int PORT = 9000;

		WebSocketServer server = new MainServer(new InetSocketAddress(host, PORT));
		server.run();

	}

	public MainServer(InetSocketAddress inetAddr) {
		super(inetAddr);
		chatRooms = new ArrayList<>();
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

		if (cmd.equals("join")) {
			String id = msgObj.getString("id");
			String pass = msgObj.getString("pass");
			System.out.printf("회원가입 id: %s   pass: %s\n", id, pass);

			// 회원가입 시도
			try {
				User user = new User();
				user.setUser_id(id);
				user.setUser_pw(pass);

				int result = UserDao.joinUser(user); // 회원가입 시도

				JSONObject ackObj = new JSONObject();
				ackObj.put("cmd", "join");

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
			String id = msgObj.getString("id");
			String pass = msgObj.getString("pass");
			System.out.printf("로그인 id: %s   pass: %s\n", id, pass);

			// 로그인 시도
			try {
				User user = new User();
				user.setUser_id(id);
				user.setUser_pw(pass);

				int id_idx = UserDao.loginUser(user);

				JSONObject ackObj = new JSONObject();
				ackObj.put("cmd", "login");

				if (id_idx != 0) {
					// 로그인 성공 시
					ackObj.put("result", "ok");
					ackObj.put("id_idx", id_idx);
				} else {
					// 로그인 실패 시
					ackObj.put("result", "fail");
				}

				conn.send(ackObj.toString()); // 클라이언트에게 응답 전송
			} catch (Exception e) {
				e.printStackTrace();
			}

		} else if (cmd.equals("chat")) {
			String id = msgObj.getString("id");
			String msg = msgObj.getString("msg");
			int room = msgObj.getInt("room");
			System.out.printf("id: %s   msg: %s\n", id, msg);

			// 전체 접속자한테 브로드캐스팅
			ChatRoom chatRoom = chatRooms.get(room);
			WebSocket webSocket = chatRoom.getChatList().get(room);
			webSocket.send(message);
//			for (WebSocket con : this.getConnections()) {
//				con.send(message);
//			}
		} else if (cmd.equals("newchat")) {
			int room = msgObj.getInt("room");
			ChatRoom newRoom = new ChatRoom(room, conn);

			// 채팅방생성했는지
			System.out.printf("room: %s\n", room);
			// 응답객체
			JSONObject ackObj = new JSONObject();
			ackObj.put("cmd", "newchat");
			ackObj.put("result", "ok");

			// 생성된 채팅방을 디비에 저장
            Chat chatDto = new Chat(msgObj);
            ChatDao chatDao = new ChatDao();
			chatDao.saveChatRoom(chatDto);
			chatRooms.add(newRoom);

		}else if (cmd.equals("enterchat")) {
			int room = msgObj.getInt("room");
			String id = msgObj.getString("id");
//			ChatRoom newRoom = new ChatRoom(room);
			ChatRoom newRoom = chatRooms.get(room);
			newRoom.start(); //채팅방 스레드 시작

			// 응답객체
			JSONObject ackObj = new JSONObject();
			ackObj.put("cmd", "enterchat");
			ackObj.put("result", "ok");

			conn.send(ackObj.toString());

		} else if (cmd.equals("add_todo")) {
			String category = msgObj.getString("category");
			String content = msgObj.getString("todo");
			Integer user_id = msgObj.getInt("user_id");
			System.out.printf("todo- category: %s to-do content: %s	user_id: %s\n", category, content, user_id);

			try {
				TodoList todo = new TodoList();
				todo.setTodolist_category(category);
				todo.setTodolist_content(content);
				todo.setUser_id(user_id);

				int result = TodoDao.categoryDaily(todo); // insertTodo(todo)

				if (result > 0) {
					System.out.println("to-do list 추가되었습니다.");
				} else {
					System.out.println("to-do list 추가에 실패했습니다.");
				}
			} catch (Exception e) {
				e.printStackTrace();
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

//        new ClientThread(conn).start();
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
