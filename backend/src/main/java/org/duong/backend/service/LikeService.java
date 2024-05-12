package org.duong.backend.service;

import jakarta.persistence.EntityNotFoundException;
import org.duong.backend.dto.LikeDTO;
import org.duong.backend.model.Like;
import org.duong.backend.model.User;
import org.duong.backend.repository.PostRepository;
import org.duong.backend.repository.RoleRepository;
import org.duong.backend.repository.LikeRepository;
import org.duong.backend.repository.UserRepository;
import org.springframework.data.domain.Sort;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class LikeService {
    private final LikeRepository likeRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    public LikeService(LikeRepository likeRepository, UserRepository userRepository, PostRepository postRepository) {
        this.likeRepository = likeRepository;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }

    // CRUD
    public Long countLikes(UUID postId) {
        return likeRepository.countByPostId(postId);
    }

    public Boolean isLiked(UUID postId) {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication == null || !authentication.isAuthenticated() || authentication instanceof AnonymousAuthenticationToken) {
            // User is not logged in
            return null;
        }

        String email = authentication.getName();
        final User user = userRepository.findByEmail(email).get();
        // User is logged in but not found with email
        if(user == null) return null;

        Boolean isLiked = likeRepository.existsByUserIdAndPostId(user.getId(), postId);
        return isLiked;
    }

    public LikeDTO toggleLike(UUID postId) {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication == null || !authentication.isAuthenticated() || authentication instanceof AnonymousAuthenticationToken) {
            // User is not logged in
            return null;
        }

        String email = authentication.getName();
        final User user = userRepository.findByEmail(email).get();
        // User is logged in but not found with email
        if(user == null) return null;

        Optional<Like> like = likeRepository.findByUserIdAndPostId(user.getId(), postId);
        LikeDTO likeDTO = new LikeDTO();
        if(like.isPresent()) {
            // unlike
            likeRepository.delete(like.get());
        }
        else {
            // like
            Like newLike = new Like();
            newLike.setUser(user);
            newLike.setPost(postRepository.findById(postId).orElseThrow(() -> new EntityNotFoundException("Post not found with id: " + postId)));
            likeRepository.save(newLike);
            mapToDTO(newLike, likeDTO);
        }
        return likeDTO;
    }

    // MAPPER
    private LikeDTO mapToDTO(Like like, LikeDTO likeDTO) {
        likeDTO.setId(like.getId());
        likeDTO.setUserId(like.getUser().getId());
        likeDTO.setPostId(like.getPost().getId());
        likeDTO.setCreatedDate(like.getCreatedDate());
        return likeDTO;
    }

    private Like mapToEntity(LikeDTO likeDTO, Like like) {
        like.setId(likeDTO.getId());
        like.setUser(userRepository.findById(likeDTO.getUserId()).orElseThrow(() -> new EntityNotFoundException("User not found with id: " + likeDTO.getUserId())));
        like.setPost(postRepository.findById(likeDTO.getPostId()).orElseThrow(() -> new EntityNotFoundException("Post not found with id: " + likeDTO.getPostId())));
        like.setCreatedDate(likeDTO.getCreatedDate());
        return like;
    }
}




