package seb40_main_012.back.user.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Setter
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

    /*@OneToOne
    private Gender gender;

    @OneToOne
    private AgeGroup ageGroup;*/

    //private List<UserCategory> category;

    @ElementCollection(fetch = FetchType.EAGER) // 사용자 권한 테이블 생성
    private List<String> roles = new ArrayList<>();

    public void setNickName(String nickName) {
        this.nickname = nickName;
    }



}
