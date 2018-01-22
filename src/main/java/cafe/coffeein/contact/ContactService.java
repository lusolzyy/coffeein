package cafe.coffeein.contact;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactService {
	
	@Autowired
	private ContactRepository contactRepository;
	
	public Contact addContact(Contact contact) {
		return contactRepository.save(contact);
	}
}
