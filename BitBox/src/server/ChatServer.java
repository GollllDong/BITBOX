package server;

import java.net.InetSocketAddress;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;
import org.json.JSONObject;

import chat.ChatThread;
import db.DBConnection;
import db.dao.ChatDao;
import dto.Chat;

public class ChatServer extends WebSocketServer {
	private List<ChatThread> chatRooms = new ArrayList<>();
//	private HashMap<Integer, List<ChatThread>> chatList = new HashMap<>();
	
	public static void main(String[] args) {
		String host = "127.0.0.1";
		final int PORT = 9001;

		WebSocketServer server = new ChatServer(new InetSocketAddress(host, PORT));
		System.out.println("chatServer on...");
		server.run();
	}
	
	public ChatServer (InetSocketAddress inetAddr) {
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

		if (cmd.equals("chat")) {
			String id = msgObj.getString("id");
			String msg = msgObj.getString("msg");
			System.out.printf("id: %s   msg: %s\n", id, msg);

			// 전체 접속자한테 브로드캐스팅
//			ChatRoom chatRoom = chatRooms.get(room);
//			WebSocket webSocket = chatRoom.getChatList().get(room);
//			WebSocket.send(message);
			for (WebSocket con : this.getConnections()) {
				con.send(message);
			}
		} else if (cmd.equals("newchat")) {
			int room = msgObj.getInt("room");
			String roomName = msgObj.getString("name");
			Chat newRoom = new Chat(room, roomName);
			chatRooms.add(new ChatThread(room));
			
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

		}else if (cmd.equals("enterchat")) {
			// 몇번째 채팅방인지 확인
			int room = msgObj.getInt("room");
			ChatThread chatThread = chatRooms.get(room);  // 해당 채팅방번호 꺼내옴

			String roomName = msgObj.getString("name");
			String userId = msgObj.getString("id");
			
			chatThread.addUser(userId, conn);
			chatThread.start(); //채팅방 스레드 시작

			// 응답객체
			JSONObject ackObj = new JSONObject();
			ackObj.put("cmd", "enterchat");
			ackObj.put("result", "ok");
			conn.send(ackObj.toString());
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