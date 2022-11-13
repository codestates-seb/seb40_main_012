package seb40_main_012.back.user.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import seb40_main_012.back.common.like.entity.Like;
import seb40_main_012.back.user.entity.enums.AgeType;
import seb40_main_012.back.user.entity.enums.GenderType;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;
    private String email;
    private String nickName;
    private String password;
    private String introduction;

    @Enumerated(EnumType.STRING)
    private GenderType gender;

    @Enumerated(EnumType.STRING)
    private AgeType age;

    @OneToMany(mappedBy = "user")
    private List<UserCategory> category = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER) // 사용자 권한 테이블 생성
    private List<String> roles = new ArrayList<>();

//    @OneToMany(mappedBy = "user")
//    private List<Role> roles = new ArrayList<>();

//    @JsonManagedReference
//    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
//    private final List<Like> likes = new ArrayList<>();

    public void updateNickName(String nickName) {
        this.nickName = nickName;
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
