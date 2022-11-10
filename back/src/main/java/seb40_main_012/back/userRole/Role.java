package seb40_main_012.back.userRole;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@RequiredArgsConstructor
@Entity
public class Role {
    @Id
    private final Long roleId;
    private final RoleType roleType;
}
