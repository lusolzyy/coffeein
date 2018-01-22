package cafe.coffeein.returnmessage;

import cafe.coffeein.user.User;

public class ReturnMessage {
	
	private String returnMessage;
	private String returnCode;
	private User returnUser;
	
	public ReturnMessage() {
	}

	public ReturnMessage(String returnMessage, String returnCode, User returnUser) {
		this.returnMessage = returnMessage;
		this.returnCode = returnCode;
		this.returnUser = returnUser;
	}

	public String getReturnMessage() {
		return returnMessage;
	}

	public void setReturnMessage(String returnMessage) {
		this.returnMessage = returnMessage;
	}

	public String getReturnCode() {
		return returnCode;
	}

	public void setReturnCode(String returnCode) {
		this.returnCode = returnCode;
	}

	public User getReturnUser() {
		return returnUser;
	}

	public void setReturnUser(User returnUser) {
		this.returnUser = returnUser;
	}
	
}
