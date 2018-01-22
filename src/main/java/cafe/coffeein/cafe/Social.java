package cafe.coffeein.cafe;

public class Social {
	
	private String phoneNumber;
	private String facebook;
	private String twitter;
	private String instagram;
	private String website;
	
	public Social() {
	}
	
	public Social(String phoneNumber, String facebook, String twitter, String instagram, String website) {
		this.phoneNumber = phoneNumber;
		this.facebook = facebook;
		this.twitter = twitter;
		this.instagram = instagram;
		this.website = website;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getFacebook() {
		return facebook;
	}

	public void setFacebook(String facebook) {
		this.facebook = facebook;
	}

	public String getTwitter() {
		return twitter;
	}

	public void setTwitter(String twitter) {
		this.twitter = twitter;
	}

	public String getInstagram() {
		return instagram;
	}

	public void setInstagram(String instagram) {
		this.instagram = instagram;
	}

	public String getWebsite() {
		return website;
	}

	public void setWebsite(String website) {
		this.website = website;
	}
}
