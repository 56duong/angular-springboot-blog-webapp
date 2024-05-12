package org.duong.backend.config;

import org.duong.backend.dto.UserDTO;
import org.duong.backend.service.RoleService;
import org.duong.backend.service.UserService;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserService userService;
    private final RoleService roleService;

    public UserDetailsServiceImpl(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDTO userDTO = userService.findByEmail(username);
        return User
                .withUsername(username)
                .password(userDTO.getPassword())
                .disabled(!userDTO.isActive())
                .roles(roleService.findById(userDTO.getRoleId()).getName().name())
                .build();
    }
}
