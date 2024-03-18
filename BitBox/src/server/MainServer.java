package server;

import java.net.InetSocketAddress;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;
import org.json.JSONObject;

import db.dao.LoginDao;

public class MainServer extends WebSocketServer {
	public static void main(String[] args) {
//		String host = "192.168.0.20";
		String host = "127.0.0.1";
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
		System.out.println( "님이 들어왔습니다" + message);
		
		JSONObject msgObj = new JSONObject(message);
		// 패킷 종류를 구분할 수 있는 명령어를 제일 먼저 추출
		String cmd = msgObj.getString("cmd");
		
		if(cmd.equals("login")) {
			String id = msgObj.getString("id");
			String pass = msgObj.getString("pass");
			System.out.printf("로그인 id: %s   pass: %s\n", id, pass);
			
			/* DB에서 해당 id, pass가 있는 지 확인하는 작업 추가
			 * */
			LoginDao loginDao = new LoginDao();
			if(loginDao.isMemberExists(id)) {
				System.out.println("성공~");
			} else {
				System.out.println("실패....");
			}
			
			
			JSONObject ackObj = new JSONObject();
			ackObj.put("cmd", "login");
			ackObj.put("result", "ok");
			conn.send(ackObj.toString());   // json문자열로 변환되어서 클라이언트한테 전송됨
		}else if(cmd.equals("allchat")) {
			String id = msgObj.getString("id");
			String msg = msgObj.getString("msg");
			System.out.printf("id: %s	msg: %s\n", id, msg);
			
			// 전체 접속자한테 브로드캐스팅
			for(WebSocket con : this.getConnections()) {
				if(conn != con) {
					con.send(message);
				}
			}
		}
	}

	@Override
	public void onOpen(WebSocket conn, ClientHandshake handshake) {
		String hostIp = conn.getRemoteSocketAddress().getAddress().getHostAddress().toString();
		System.out.println(hostIp + " 님이 연결되었습니다."); // 누가 연결 했는지
		
		JSONObject ackObj = new JSONObject();
		ackObj.put("cmd", "connect");
		ackObj.put("result", "잘 연결되었습니다.");
		conn.send(ackObj.toString()); // 클라이언트한테 메시지 보내기
	}

	@Override
	public void onStart() {
		// 서버 연결
		System.out.println("Server#성공적#해냈음");
	}

}
