package com.example.demo.service;

import com.example.demo.model.Group;
import com.example.demo.model.Subscription;
import com.example.demo.model.User;
import com.example.demo.repository.GroupRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.SubscriptionRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final GroupRepository groupRepository;

    public UserService(UserRepository userRepository, SubscriptionRepository subscriptionRepository, GroupRepository groupRepository) {
        this.userRepository = userRepository;
        this.subscriptionRepository = subscriptionRepository;
        this.groupRepository = groupRepository;
    }

    public List<Group> getSubscribedGroupsByEmail(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found with email: " + email);
        }
        User user = userOpt.get();
        List<Subscription> subscriptions = subscriptionRepository.findByUser(user);
        return subscriptions.stream()
                .map(Subscription::getGroup)
                .collect(Collectors.toList());
    }

    /**
     * Returns all groups that a user is NOT subscribed to and has NO pending subscription request for.
     */
    public List<Group> getAvailableGroupsByEmail(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found with email: " + email);
        }
        User user = userOpt.get();
        return groupRepository.findAvailableGroupsForUser(user.getId());
    }
}
