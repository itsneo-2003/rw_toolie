package com.example.demo.controller;

import com.example.demo.model.Group;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")  // adjust as needed for your frontend
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/subscribed-groups")
    public List<Group> getSubscribedGroups(@RequestParam String email) {
        return userService.getSubscribedGroupsByEmail(email);
    }
}
