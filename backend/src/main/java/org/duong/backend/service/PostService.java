package org.duong.backend.service;

import jakarta.persistence.EntityNotFoundException;
import org.duong.backend.dto.PostDTO;
import org.duong.backend.model.Post;
import org.duong.backend.repository.RoleRepository;
import org.duong.backend.repository.PostRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PostService {
    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    // CRUD
    public List<PostDTO> findAll() {
        final List<Post> posts = postRepository.findAll(Sort.by("lastModifiedDate").descending());
        return posts.stream()
                .map(post -> mapToDTO(post, new PostDTO()))
                .toList();
    }

    public PostDTO findById(final UUID id) {
        return postRepository.findById(id)
                .map(post -> mapToDTO(post, new PostDTO()))
                .orElseThrow(() -> new EntityNotFoundException("Post not found with id: " + id));
    }

    public UUID create(final PostDTO postDTO) {
        Post post = new Post();
        mapToEntity(postDTO, post);
        return postRepository.save(post).getId();
    }

    public void update(final PostDTO postDTO) {
        final Post post = postRepository.findById(postDTO.getId())
                .orElseThrow(() -> new EntityNotFoundException("Post not found with id: " + postDTO.getId()));
        mapToEntity(postDTO, post);
        postRepository.save(post);
    }

    public void deleteById(final UUID id) {
        postRepository.deleteById(id);
    }

    // MAPPER
    private PostDTO mapToDTO(Post post, PostDTO postDTO) {
        postDTO.setId(post.getId());
        postDTO.setTitle(post.getTitle());
        postDTO.setContent(post.getContent());
        postDTO.setTags(post.getTags());
        postDTO.setCreatedDate(post.getCreatedDate());
        postDTO.setCreatedBy(post.getCreatedBy());
        postDTO.setLastModifiedDate(post.getLastModifiedDate());
        postDTO.setLastModifiedBy(post.getLastModifiedBy());
        return postDTO;
    }

    private Post mapToEntity(PostDTO postDTO, Post post) {
        post.setId(postDTO.getId());
        post.setTitle(postDTO.getTitle());
        post.setContent(postDTO.getContent());
        post.setTags(postDTO.getTags());
        post.setCreatedDate(postDTO.getCreatedDate());
        post.setCreatedBy(postDTO.getCreatedBy());
        post.setLastModifiedDate(postDTO.getLastModifiedDate());
        post.setLastModifiedBy(postDTO.getLastModifiedBy());
        return post;
    }

}




