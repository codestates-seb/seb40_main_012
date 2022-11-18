package seb40_main_012.back.user.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.bookCollection.entity.BookCollectionBookmark;
import seb40_main_012.back.bookCollection.entity.BookCollectionLike;
import seb40_main_012.back.common.comment.entity.Comment;
import org.springframework.transaction.annotation.Transactional;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.common.like.entity.Like;
import seb40_main_012.back.pairing.entity.Pairing;
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
    private List<UserCategory> categories = new ArrayList<>();

    @Column(nullable = false, name = "roles")
    @ElementCollection // 사용자 권한 테이블 생성
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<String> roles = new ArrayList<>();

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<Pairing> pairings = new ArrayList<>();

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<BookCollection> collections = new ArrayList<>();

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<BookCollectionLike> collectionLikes = new ArrayList<>();

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<BookCollectionBookmark> collectionBookmarks = new ArrayList<>();

//    @JsonManagedReference
//    @OneToMany(mappedBy = "user")
//    @LazyCollection(LazyCollectionOption.FALSE)
//    private List<Comment> comments;
//
//    @JsonManagedReference
//    @OneToMany(mappedBy = "user")
//    @LazyCollection(LazyCollectionOption.FALSE)
//    private List<Pairing> pairings;

//    @OneToMany(mappedBy = "user")
//    private List<Role> roles = new ArrayList<>();

//    @JsonManagedReference
//    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
//    private final List<Like> likes = new ArrayList<>();

    private boolean firstLogin = true; // 첫 로그인 여부

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
    }

    public void addUserCategory(UserCategory userCategory) {
        this.categories.add(userCategory);
    }

    public void addBookCollection(BookCollection collection) {
        this.collections.add(collection);
    }

    public void addCollectionLike(BookCollectionLike collectionLike) {
        this.collectionLikes.add(collectionLike);
    }

}
