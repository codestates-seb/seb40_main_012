package seb40_main_012.back.user.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@RequiredArgsConstructor
@Entity
public class Role {
    @Id
    private Long roleId;
    private RoleType roleType;
}
