package org.duong.backend.controller;

import org.duong.backend.dto.PostDTO;
import org.duong.backend.service.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("api/v1/posts")
public class PostController {
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public ResponseEntity<List<PostDTO>> findAll() {
        return ResponseEntity.ok(postService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDTO> findById(@PathVariable final UUID id) {
        return ResponseEntity.ok(postService.findById(id));
    }

    @PostMapping
    public ResponseEntity<UUID> create(@RequestBody PostDTO postDTO) {
        UUID id = postService.create(postDTO);
        return new ResponseEntity<>(id, HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<UUID> findById(@PathVariable final UUID id, @RequestBody PostDTO postDTO) {
        postService.update(postDTO);
        return ResponseEntity.ok(postDTO.getId());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable final UUID id) {
        postService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
