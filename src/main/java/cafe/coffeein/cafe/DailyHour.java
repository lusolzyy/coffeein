package cafe.coffeein.cafe;

public class DailyHour {
	
	//"1" open, "0" close
	private String isOpen;
	//The format for open and close time is "09:00" - "20:30"
	private String openTime;
	private String closeTime;
	
	public DailyHour() {
	}

	public DailyHour(String isOpen, String openTime, String closeTime) {
		this.isOpen = isOpen;
		this.openTime = openTime;
		this.closeTime = closeTime;
	}

	public String getIsOpen() {
		return isOpen;
	}

	public void setIsOpen(String isOpen) {
		this.isOpen = isOpen;
	}

	public String getOpenTime() {
		return openTime;
	}

	public void setOpenTime(String openTime) {
		this.openTime = openTime;
	}

	public String getCloseTime() {
		return closeTime;
	}

	public void setCloseTime(String closeTime) {
		this.closeTime = closeTime;
	}
}
