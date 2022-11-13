package seb40_main_012.back.user.entity;

import lombok.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import seb40_main_012.back.user.entity.enums.AgeType;
import seb40_main_012.back.user.entity.enums.GenderType;

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
    @Column(name = "user_id")
    private Long id;
    private String email;
    private String nickname;
    private String password;
    private String introduction;

    @Enumerated(EnumType.STRING)
    private GenderType gender;

    @Enumerated(EnumType.STRING)
    private AgeType age;

    @OneToMany(mappedBy = "user")
    private List<UserCategory> category;

    @OneToMany(mappedBy = "user")
    private List<Role> roles;


    public void updateNickName(String nickName) {
        this.nickname = nickName;
    }

    public boolean verifyPassword(BCryptPasswordEncoder passwordEncoder, String password) {
        return passwordEncoder.matches(password,this.password);
    }
    public void updatePassword(BCryptPasswordEncoder passwordEncoder, String password){
        this.password = passwordEncoder.encode(password);
    }

    public void updateUserInfo(User user) {
        this.introduction = user.getIntroduction();
        this.gender = user.getGender();
        this.age = user.getAge();
        this.category = user.getCategory();
    }



}
