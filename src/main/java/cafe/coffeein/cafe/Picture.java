package cafe.coffeein.cafe;

//import java.time.LocalDateTime;

public class Picture {
	
	private String uploaderName;
	private String uploaderId;
//	private LocalDateTime uploadTime;
	private String pictureUrl;
	
	public Picture() {
	}

	public Picture(String uploaderName, String uploaderId, /*LocalDateTime uploadTime,*/ String pictureUrl) {
		this.uploaderName = uploaderName;
		this.uploaderId = uploaderId;
//		this.uploadTime = uploadTime;
		this.pictureUrl = pictureUrl;
	}

	public String getUploaderName() {
		return uploaderName;
	}

	public void setUploaderName(String uploaderName) {
		this.uploaderName = uploaderName;
	}

	public String getUploaderId() {
		return uploaderId;
	}

	public void setUploaderId(String uploaderId) {
		this.uploaderId = uploaderId;
	}

//	public LocalDateTime getUploadTime() {
//		return uploadTime;
//	}
//
//	public void setUploadTime(LocalDateTime uploadTime) {
//		this.uploadTime = uploadTime;
//	}

	public String getPictureUrl() {
		return pictureUrl;
	}

	public void setPictureUrl(String pictureUrl) {
		this.pictureUrl = pictureUrl;
	}
}
