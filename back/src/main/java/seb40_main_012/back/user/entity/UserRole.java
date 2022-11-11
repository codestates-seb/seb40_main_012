package seb40_main_012.back.user.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.Entity;
import java.util.List;

@Getter
@RequiredArgsConstructor
@Entity
public class UserRole {
    private List<Role> roles;
}
