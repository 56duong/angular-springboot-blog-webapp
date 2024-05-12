package org.duong.backend.controller;

import org.duong.backend.dto.UserDTO;
import org.duong.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("api/v1/users")
public class UserController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> findAll() {
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> findById(@PathVariable final UUID id) {
        return ResponseEntity.ok(userService.findById(id));
    }

    @PostMapping
    public ResponseEntity<UUID> create(@RequestBody UserDTO userDTO) {
        if(!userDTO.getPassword().isBlank()) {
            userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        }
        UUID id = userService.create(userDTO);
        return new ResponseEntity<>(id, HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<UUID> findById(@PathVariable final UUID id, @RequestBody UserDTO userDTO) {
        userService.update(userDTO);
        return ResponseEntity.ok(userDTO.getId());
    }
}
