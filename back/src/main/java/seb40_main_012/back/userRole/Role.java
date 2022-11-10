package seb40_main_012.back.userRole;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.Entity;

@Getter
@RequiredArgsConstructor
@Entity
public class Role {
    private final RoleType roleType;
}
