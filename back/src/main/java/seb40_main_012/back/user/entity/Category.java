package seb40_main_012.back.user.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import seb40_main_012.back.book.entity.Genre;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@Entity
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    private Genre genre;

    @JsonManagedReference
    @OneToMany(mappedBy = "category")
    private List<UserCategory> categories = new ArrayList<>();

    public Category(Genre genre){
        this.genre = genre;
    }

    public void addUserCategory(UserCategory userCategory) {
        this.categories.add(userCategory);
        if(userCategory.getCategory() != this) {
            userCategory.addCategory(this);
        }
    }
}
