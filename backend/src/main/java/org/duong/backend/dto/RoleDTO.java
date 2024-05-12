package org.duong.backend.dto;

import org.duong.backend.enums.RoleEnum;

public class RoleDTO {
    private Integer id;
    private RoleEnum name;
    private String description;

    public RoleDTO() {
    }

    public RoleDTO(Integer id, RoleEnum name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public RoleEnum getName() {
        return name;
    }

    public void setName(RoleEnum name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
