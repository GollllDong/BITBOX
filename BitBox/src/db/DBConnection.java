package db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
/* @author 김동우
 * DBConnection : 데이터베이스 연결을 관리하는 클래스
 * 
 * MySQL 데이터베이스에 대한 연결을 제공
 * 연결을 여는(open) 및 닫는(close) 메서드를 포함
 * 연결 객체를 반환하는 getConnection 메서드
 */
public class DBConnection {
	private static final String URL = "jdbc:mysql://192.168.0.5:3306/bitbox";
	private static final String USER = "bitbox";
	private static final String PASSWORD = "20240315!!";
	private static Connection connection;
	
	// private 생성자로 외부에서의 인스턴스화 방지
    private DBConnection() {}

	public static void open() {
	 
	    try {
	        connection = DriverManager.getConnection(URL, USER, PASSWORD);
	        System.out.println("[DB 연결 성공]\n");
	    } catch (SQLException e) {
	        System.out.println("DB 연결 오류 : " + e.getMessage());
	        //e.printStackTrace();
	    }
	}
	
	public static void close() {
	    try {
	        connection.close();
	        connection = null; // connection 객체를 null로 초기화
	        System.out.println("\n[DB 연결 해제]");
	    } catch (SQLException e) {
	         System.out.println("DB 연결 해제 오류 : " + e.getMessage());
	          //e.printStackTrace();
	        }
	    }
	
	// Connection getter
		public static Connection getConnection() {
			if (connection == null) {
	            try {
	                // 데이터베이스 연결 정보를 사용하여 Connection 생성
	                connection = DriverManager.getConnection(URL, USER, PASSWORD);
	            } catch (SQLException e) {
	                e.printStackTrace();
	            }
	        }
	        return connection;
		}
	}

