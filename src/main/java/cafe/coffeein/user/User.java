package cafe.coffeein.user;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Users")
public class User {
	
	@Id
	private String userId;
	private String username;
	private String email;
	private String password;
	private String firstName;
	private String lastName;
	private List<String> favoriteFlavor;
	private String isOwner;
	private String ownerApproved;
	private String cafeId;
	private String cafeName;
	
	public User() {
	}

	public User(String userId, String username, String email, String password, String firstName, String lastName,
			List<String> favoriteFlavor, String isOwner, String ownerApproved, String cafeId, String cafeName) {
		this.userId = userId;
		this.username = username;
		this.email = email;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.favoriteFlavor = favoriteFlavor;
		this.isOwner = isOwner;
		this.ownerApproved = ownerApproved;
		this.cafeId = cafeId;
		this.cafeName = cafeName;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public List<String> getFavoriteFlavor() {
		return favoriteFlavor;
	}

	public void setFavoriteFlavor(List<String> favoriteFlavor) {
		this.favoriteFlavor = favoriteFlavor;
	}

	public String getIsOwner() {
		return isOwner;
	}

	public void setIsOwner(String isOwner) {
		this.isOwner = isOwner;
	}

	public String getOwnerApproved() {
		return ownerApproved;
	}

	public void setOwnerApproved(String ownerApproved) {
		this.ownerApproved = ownerApproved;
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
}
