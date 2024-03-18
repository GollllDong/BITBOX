package db;

public class DBConfig {
	public static void initConnection() {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			System.out.println("Driver Loading Success");
		} catch (ClassNotFoundException e) {
			System.out.println("DB Driver 미설치 및 클래스 이름 오류");
			e.printStackTrace();
		}
	}
}
