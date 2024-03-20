package server;

import java.net.InetSocketAddress;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;
import org.json.JSONObject;

import db.DBConnection;
import db.dao.UserDAO;
import dto.User;

public class MainServer extends WebSocketServer {
    public static void main(String[] args) {
    	
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

                int result = UserDAO.joinUser(user); // 회원가입 시도

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

                int id_idx = UserDAO.loginUser(user);

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

        } else if (cmd.equals("allchat")) {
            String id = msgObj.getString("id");
            String msg = msgObj.getString("msg");
            System.out.printf("id: %s   msg: %s\n", id, msg);

            // 전체 접속자한테 브로드캐스팅
            for (WebSocket con : this.getConnections()) {
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
