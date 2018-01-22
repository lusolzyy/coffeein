package cafe.coffeein.cafe;

//import java.time.LocalDateTime;
import java.util.List;

public class Review {
	
	private String reviewerName;
	private String reviewerId;
//	private LocalDateTime reviewTime;
	private String review;
	private List<Picture> reviewPicture;
	private int reviewStar;
	private boolean isApproved;
	
	public Review() {
	}

	public Review(String reviewerName, String reviewerId, /*LocalDateTime reviewTime,*/ String review,
			List<Picture> reviewPicture, int reviewStar, boolean isApproved) {
		this.reviewerName = reviewerName;
		this.reviewerId = reviewerId;
//		this.reviewTime = reviewTime;
		this.review = review;
		this.reviewPicture = reviewPicture;
		this.reviewStar = reviewStar;
		this.isApproved = isApproved;
	}

	public String getReviewerName() {
		return reviewerName;
	}

	public void setReviewerName(String reviewerName) {
		this.reviewerName = reviewerName;
	}

	public String getReviewerId() {
		return reviewerId;
	}

	public void setReviewerId(String reviewerId) {
		this.reviewerId = reviewerId;
	}

//	public LocalDateTime getReviewTime() {
//		return reviewTime;
//	}
//
//	public void setReviewTime(LocalDateTime reviewTime) {
//		this.reviewTime = reviewTime;
//	}

	public String getReview() {
		return review;
	}

	public void setReview(String review) {
		this.review = review;
	}

	public List<Picture> getReviewPicture() {
		return reviewPicture;
	}

	public void setReviewPicture(List<Picture> reviewPicture) {
		this.reviewPicture = reviewPicture;
	}

	public int getReviewStar() {
		return reviewStar;
	}

	public void setReviewStar(int reviewStar) {
		this.reviewStar = reviewStar;
	}

	public boolean isApproved() {
		return isApproved;
	}

	public void setApproved(boolean isApproved) {
		this.isApproved = isApproved;
	}
}
