package dto;

/*
 * Cmd : 명령어 관련 클래스
 */
public class Cmd {
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
