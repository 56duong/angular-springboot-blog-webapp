package org.duong.backend.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public class LikeDTO {
    private Long id;
    private LocalDateTime createdDate;
    private UUID userId;
    private UUID postId;

    public LikeDTO() {
    }

    public LikeDTO(Long id, LocalDateTime createdDate, UUID userId, UUID postId) {
        this.id = id;
        this.createdDate = createdDate;
        this.userId = userId;
        this.postId = postId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public UUID getPostId() {
        return postId;
    }

    public void setPostId(UUID postId) {
        this.postId = postId;
    }
}
