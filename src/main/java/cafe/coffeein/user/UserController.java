package cafe.coffeein.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import cafe.coffeein.returnmessage.ReturnMessage;

@RestController
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/login/{login}/password/{password}")
	@ResponseBody
	public Object login(@PathVariable String login, @PathVariable String password) {
		User returnUser = new User();
		ReturnMessage e = new ReturnMessage();
		returnUser = userService.getUserByUsername(login);
		if (returnUser == null) {
			returnUser = userService.getUserByEmail(login);
			if (returnUser == null) {
				e.setReturnMessage("LOGIN FAIL!!!");
				e.setReturnCode("400");
				e.setReturnUser(new User());
				return e;
			} else {
				e.setReturnUser(returnUser);
			}
			//exist username
			String returnPassword = returnUser.getPassword();
			
			if (password.equals(returnPassword)) {
				e.setReturnMessage("LOGIN SUCCESSFULLY!");
				e.setReturnCode("200");
			} else {
				e.setReturnMessage("LOGIN FAIL!!!");
				e.setReturnCode("400");
				e.setReturnUser(new User());
			}
			return e;
		} else {
			e.setReturnUser(returnUser);
		}
		
		//exist username
		String returnPassword = returnUser.getPassword();
		
		if (password.equals(returnPassword)) {
			e.setReturnMessage("LOGIN SUCCESSFULLY!");
			e.setReturnCode("200");
		} else {
			e.setReturnMessage("LOGIN FAIL!!!");
			e.setReturnCode("400");
			e.setReturnUser(new User());
		}
		return e;
	}
	
	@GetMapping("/users")
	@ResponseBody
	public List<User> getAllUsers() {
		return userService.getAllUsers();
	}
	
	@GetMapping("/users/username/{username}")
	@ResponseBody
	public User getUserByUsername(@PathVariable String username) {
		return userService.getUserByUsername(username);
	}
	
	@GetMapping("/users/email/{email}/")
	@ResponseBody
	public User getUserByEmail(@PathVariable String email) {
		return userService.getUserByEmail(email);
	}
	
	@PostMapping("/users/add")
	@ResponseBody
	public User addUser(@RequestBody User user) {
		return userService.addUser(user);
	}
	
	@PutMapping("/users/update")
	@ResponseBody
	public User updateUser(@RequestBody User user) {
		return userService.updateUser(user);
	}
	
	@DeleteMapping("/users/delete")
	public void deleteUser(String userId) {
		userService.deleteUser(userId);
	}
}
