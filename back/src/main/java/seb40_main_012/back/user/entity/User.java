package seb40_main_012.back.user.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private String email;
    private String nickname;
    private String password;
    private String introduction;

    @OneToOne
    private Gender gender;

    @OneToOne
    private AgeGroup ageGroup;

    private List<UserCategory> category;

    public void setNickName(String nickName) {
        this.nickname = nickName;
    }



}
