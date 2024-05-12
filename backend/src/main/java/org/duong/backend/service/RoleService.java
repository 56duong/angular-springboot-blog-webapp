package org.duong.backend.service;

import jakarta.persistence.EntityNotFoundException;
import org.duong.backend.dto.RoleDTO;
import org.duong.backend.model.Role;
import org.duong.backend.repository.RoleRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {
    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    // CRUD
    public List<RoleDTO> findAll() {
        final List<Role> roles = roleRepository.findAll(Sort.by("id"));
        return roles.stream()
                .map(role -> mapToDTO(role, new RoleDTO()))
                .toList();
    }

    public RoleDTO findById(final Integer id) {
        return roleRepository.findById(id)
                .map(role -> mapToDTO(role, new RoleDTO()))
                .orElseThrow(() -> new EntityNotFoundException("Role not found with id: " + id));
    }

    public Integer create(final RoleDTO roleDTO) {
        Role role = new Role();
        mapToEntity(roleDTO, role);
        return roleRepository.save(role).getId();
    }

    public void update(final RoleDTO roleDTO) {
        final Role role = roleRepository.findById(roleDTO.getId())
                .orElseThrow(() -> new EntityNotFoundException("Role not found with id: " + roleDTO.getId()));
        mapToEntity(roleDTO, role);
        roleRepository.save(role);
    }

    public void deleteById(final Integer id) {
        roleRepository.deleteById(id);
    }

    // MAPPER
    private RoleDTO mapToDTO(Role role, RoleDTO roleDTO) {
        roleDTO.setId(role.getId());
        roleDTO.setName(role.getName());
        roleDTO.setDescription(role.getDescription());
        return roleDTO;
    }

    private Role mapToEntity(RoleDTO roleDTO, Role role) {
        role.setId(roleDTO.getId());
        role.setName(roleDTO.getName());
        role.setDescription(roleDTO.getDescription());
        return role;
    }

}




