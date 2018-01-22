package cafe.coffeein.cafe;

public class WeeklyHour {
	
	private DailyHour sunday;
	private DailyHour monday;
	private DailyHour tuesday;
	private DailyHour wednesday;
	private DailyHour thursday;
	private DailyHour friday;
	private DailyHour saturday;
	
	public WeeklyHour() {
	}

	public WeeklyHour(DailyHour sunday, DailyHour monday, DailyHour tuesday, DailyHour wednesday, DailyHour thursday,
			DailyHour friday, DailyHour saturday) {
		this.sunday = sunday;
		this.monday = monday;
		this.tuesday = tuesday;
		this.wednesday = wednesday;
		this.thursday = thursday;
		this.friday = friday;
		this.saturday = saturday;
	}

	public DailyHour getSunday() {
		return sunday;
	}

	public void setSunday(DailyHour sunday) {
		this.sunday = sunday;
	}

	public DailyHour getMonday() {
		return monday;
	}

	public void setMonday(DailyHour monday) {
		this.monday = monday;
	}

	public DailyHour getTuesday() {
		return tuesday;
	}

	public void setTuesday(DailyHour tuesday) {
		this.tuesday = tuesday;
	}

	public DailyHour getWednesday() {
		return wednesday;
	}

	public void setWednesday(DailyHour wednesday) {
		this.wednesday = wednesday;
	}

	public DailyHour getThursday() {
		return thursday;
	}

	public void setThursday(DailyHour thursday) {
		this.thursday = thursday;
	}

	public DailyHour getFriday() {
		return friday;
	}

	public void setFriday(DailyHour friday) {
		this.friday = friday;
	}

	public DailyHour getSaturday() {
		return saturday;
	}

	public void setSaturday(DailyHour saturday) {
		this.saturday = saturday;
	}
}
