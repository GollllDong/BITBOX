package dto;

/*
 * Cmd : 명령어 관련 클래스
 * @param <T> 제네릭 타입 파라미
 */
public class Cmd {
	private static final long serialVersionUID = 1L; // 1L은 long 형식의 정수 상수
	Object cmd; // 명령어 나타내는 객체
	
	
	//(생성자:객체를 초기화하고 필요한 초기 설정을 수행하기 위해 사용)
	
	// 기본 생성자 
	public Cmd() {
	}
	
	// 생성자, cmd 명령어 객
	public Cmd(Object cmd) {
		this.cmd = cmd;
	}
	
	//설정된 명령어 객체 반환 메서드 
	public Object getCmd() {
		return cmd;
	}

	//cmd 명령어 객체 설정 
	public void setCmd(Object cmd) {
		this.cmd = cmd;
	}
	
	
}