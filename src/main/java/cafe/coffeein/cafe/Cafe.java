package cafe.coffeein.cafe;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "Cafes")   //identifies a domain object that is going to be persisted to MongoDB. 
public class Cafe {
	
	@Id //define id key of mogodb
	private String cafeId;
	private String cafeName;
	private String cafeAddress;
	private List<Double> coordinate;//[latitude, longitude]
	private WeeklyHour cafeHours;
	private List<String> tags;
	private Social cafeSocialContacts;
	private String cafePicture;
	private List<String> cafeRoasters;
	private List<Review> cafeReviews;
	private String cafeOwnerName;
	private String cafeOwnerId;
	private Double distanceToCurrentPosition;//unit: miles
	private List<String> uploadPictures;
	
	public Cafe() {
	}

	public Cafe(String cafeId, String cafeName, String cafeAddress, List<Double> coordinate, WeeklyHour cafeHours,
			List<String> tags, Social cafeSocialContacts, String cafePicture, List<String> cafeRoasters,
			List<Review> cafeReviews, String cafeOwnerName, String cafeOwnerId, Double distanceToCurrentPosition,
			List<String> uploadPictures) {
		this.cafeId = cafeId;
		this.cafeName = cafeName;
		this.cafeAddress = cafeAddress;
		this.coordinate = coordinate;
		this.cafeHours = cafeHours;
		this.tags = tags;
		this.cafeSocialContacts = cafeSocialContacts;
		this.cafePicture = cafePicture;
		this.cafeRoasters = cafeRoasters;
		this.cafeReviews = cafeReviews;
		this.cafeOwnerName = cafeOwnerName;
		this.cafeOwnerId = cafeOwnerId;
		this.distanceToCurrentPosition = distanceToCurrentPosition;
		this.uploadPictures = uploadPictures;
	}
	
	public String getCafeId() {
		return cafeId;
	}

	public void setCafeId(String cafeId) {
		this.cafeId = cafeId;
	}

	public String getCafeName() {
		return cafeName;
	}

	public void setCafeName(String cafeName) {
		this.cafeName = cafeName;
	}

	public String getCafeAddress() {
		return cafeAddress;
	}

	public void setCafeAddress(String cafeAddress) {
		this.cafeAddress = cafeAddress;
	}

	public List<Double> getCoordinate() {
		return coordinate;
	}

	public void setCoordinate(List<Double> coordinate) {
		this.coordinate = coordinate;
	}

	public WeeklyHour getCafeHours() {
		return cafeHours;
	}

	public void setCafeHours(WeeklyHour cafeHours) {
		this.cafeHours = cafeHours;
	}

	public List<String> getTags() {
		return tags;
	}

	public void setTags(List<String> tags) {
		this.tags = tags;
	}

	public Social getCafeSocialContacts() {
		return cafeSocialContacts;
	}

	public void setCafeSocialContacts(Social cafeSocialContacts) {
		this.cafeSocialContacts = cafeSocialContacts;
	}

	public String getCafePicture() {
		return cafePicture;
	}

	public void setCafePicture(String cafePicture) {
		this.cafePicture = cafePicture;
	}

	public List<String> getCafeRoasters() {
		return cafeRoasters;
	}

	public void setCafeRoasters(List<String> cafeRoasters) {
		this.cafeRoasters = cafeRoasters;
	}

	public List<Review> getCafeReviews() {
		return cafeReviews;
	}

	public void setCafeReviews(List<Review> cafeReviews) {
		this.cafeReviews = cafeReviews;
	}

	public String getCafeOwnerName() {
		return cafeOwnerName;
	}

	public void setCafeOwnerName(String cafeOwnerName) {
		this.cafeOwnerName = cafeOwnerName;
	}

	public String getCafeOwnerId() {
		return cafeOwnerId;
	}

	public void setCafeOwnerId(String cafeOwnerId) {
		this.cafeOwnerId = cafeOwnerId;
	}

	public Double getDistanceToCurrentPosition() {
		return distanceToCurrentPosition;
	}

	public void setDistanceToCurrentPosition(Double distanceToCurrentPosition) {
		this.distanceToCurrentPosition = distanceToCurrentPosition;
	}

	public List<String> getUploadPictures() {
		return uploadPictures;
	}

	public void setUploadPictures(List<String> uploadPictures) {
		this.uploadPictures = uploadPictures;
	}
	
}
