package seb40_main_012.back.user.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import seb40_main_012.back.user.entity.enums.RoleType;

import javax.persistence.*;

@Getter
@RequiredArgsConstructor
@Entity
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Long id;
    private RoleType roleType;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
