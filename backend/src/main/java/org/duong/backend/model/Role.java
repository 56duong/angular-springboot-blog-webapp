package org.duong.backend.model;

import jakarta.persistence.*;
import org.duong.backend.enums.RoleEnum;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "role")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, unique = true)
    private RoleEnum name;

    private String description;

    @OneToMany(mappedBy = "role")
    private Set<User> users = new HashSet<>();

    public Role(Integer id, RoleEnum name, String description, Set<User> users) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.users = users;
    }

    public Role() {
    }

    public Integer getId() {
        return this.id;
    }

    public RoleEnum getName() {
        return this.name;
    }

    public String getDescription() {
        return this.description;
    }

    public Set<User> getUsers() {
        return this.users;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(RoleEnum name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }
}
