package cafe.coffeein.contact;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Contacts")
public class Contact {
	
	@Id
	private String userId;
	private String name;
	private String email;
	private String message;
	
	public Contact() {
		
	}
	
	public Contact(String userId, String name, String email, String message) {
		this.userId = userId;
		this.name = name;
		this.email = email;
		this.message = message;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
}
