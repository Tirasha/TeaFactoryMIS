package com.miniProject.TeaFactoryMIS.Controller;

import com.miniProject.TeaFactoryMIS.Exception.UserNotFoundException;
import com.miniProject.TeaFactoryMIS.Repository.UserRepository;
import com.miniProject.TeaFactoryMIS.Service.UserService;
import com.miniProject.TeaFactoryMIS.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;


@CrossOrigin(origins = "*" , allowedHeaders = "*")
@RestController
@RequestMapping("/user")

public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<Map<String, Object>> userResponseOpt = userService.authenticateUser(
                loginRequest.getUsername(),
                loginRequest.getPassword()
        );

        if (userResponseOpt.isPresent()) {
            return ResponseEntity.ok(userResponseOpt.get());  // Return both User and Employee data
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    static class LoginRequest {
        private String username;
        private String password;

        // Getters and Setters
        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }


    @PostMapping("/AddUsers")
    public User newUser(@RequestBody User newUser){
        return userRepository.save(newUser);
    }

    @GetMapping("/GetUsers")
    List<User> getAllUser(){
        return userRepository.findAll();

    }

    @PutMapping("/UpdateUsers")
    User updateUser(@RequestBody User newUser, @PathVariable String userId){
        try {
            User existingUser=userRepository.findById(userId).orElseThrow(()->new UserNotFoundException(userId));
            existingUser.setUsername(newUser.getUsername());
            existingUser.setPassword(newUser.getPassword());

            return userRepository.save(existingUser);
        }catch (Exception e){
            throw new RuntimeException("Can not found the user ID "+userId, e);
        }
    }

    @DeleteMapping("/deleteUser/{userId}")
    String deleteUser(@PathVariable String userId){
        if(!userRepository.existsById(userId)){
            throw new UserNotFoundException(userId);
        }
        else{
            userRepository.deleteById(userId);
        }
        return "User Id with "+userId+" has been deleted sucessfully";
    }
}
