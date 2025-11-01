package com.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "groups")
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "group")
    private List<Subscription> subscriptions;

    // Getters and Setters

    public Group(Long id, String name, String description, LocalDateTime createdAt, LocalDateTime updatedAt, List<Subscription> subscriptions) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.subscriptions = subscriptions;
    }

    
}
