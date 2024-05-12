package org.duong.backend.repository;

import org.duong.backend.model.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findByUserIdAndPostId(UUID userId, UUID postId);
    Boolean existsByUserIdAndPostId(UUID userId, UUID postId);
    Long countByPostId(UUID postId);
}
