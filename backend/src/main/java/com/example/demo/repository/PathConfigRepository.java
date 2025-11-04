package com.example.demo.repository;

import com.example.demo.model.PathConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface PathConfigRepository extends JpaRepository<PathConfig, Integer> {
    Optional<PathConfig> findByUniqueId(String uniqueId);
}
