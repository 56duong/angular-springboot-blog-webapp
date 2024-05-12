package org.duong.backend.service;

import jakarta.persistence.EntityNotFoundException;
import org.duong.backend.dto.UserDTO;
import org.duong.backend.model.User;
import org.duong.backend.repository.RoleRepository;
import org.duong.backend.repository.UserRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public UserService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    // CRUD
    public List<UserDTO> findAll() {
        final List<User> users = userRepository.findAll(Sort.by("lastModifiedDate").descending());
        return users.stream()
                .map(user -> mapToDTO(user, new UserDTO()))
                .toList();
    }

    public UserDTO findById(final UUID id) {
        return userRepository.findById(id)
                .map(user -> mapToDTO(user, new UserDTO()))
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
    }

    public UUID create(final UserDTO userDTO) {
        User user = new User();
        mapToEntity(userDTO, user);
        return userRepository.save(user).getId();
    }

    public void update(final UserDTO userDTO) {
        final User user = userRepository.findById(userDTO.getId())
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userDTO.getId()));
        mapToEntity(userDTO, user);
        userRepository.save(user);
    }

    public void deleteById(final UUID id) {
        userRepository.deleteById(id);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public UserDTO findByEmail(String username) {
        return userRepository.findByEmail(username)
                .map(user -> mapToDTO(user, new UserDTO()))
                .orElseThrow(() -> new EntityNotFoundException("User not found with email: " + username));
    }

    // MAPPER
    private UserDTO mapToDTO(User user, UserDTO userDTO) {
        userDTO.setId(user.getId());
        userDTO.setEmail(user.getEmail());
        userDTO.setPassword(user.getPassword());
        userDTO.setFullname(user.getFullname());
        userDTO.setActive(user.isActive());
        userDTO.setCreatedDate(user.getCreatedDate());
        userDTO.setCreatedBy(user.getCreatedBy());
        userDTO.setLastModifiedDate(user.getLastModifiedDate());
        userDTO.setLastModifiedBy(user.getLastModifiedBy());
        userDTO.setRoleId(user.getRole().getId());
        return userDTO;
    }

    private User mapToEntity(UserDTO userDTO, User user) {
        user.setId(userDTO.getId());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setFullname(userDTO.getFullname());
        user.setActive(userDTO.isActive());
        user.setCreatedDate(userDTO.getCreatedDate());
        user.setCreatedBy(userDTO.getCreatedBy());
        user.setLastModifiedDate(userDTO.getLastModifiedDate());
        user.setLastModifiedBy(userDTO.getLastModifiedBy());
        user.setRole(roleRepository.findById(userDTO.getRoleId())
                .orElseThrow(() -> new EntityNotFoundException("Role not found with id: " + userDTO.getId())));
        return user;
    }
}




