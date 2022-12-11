package seb40_main_012.back.user.entity;

import lombok.*;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Id;

@Setter
@Getter
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class UserCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_category_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @NotFound(action = NotFoundAction.IGNORE)
    private User user;

    public UserCategory(Category category, User user) {
        this.category = category;
        this.user = user;
    }

    public void addUser(User user) {
        this.user = user;
        if(!this.user.getCategories().contains(this)) {
            this.user.getCategories().add(this);
        }
    }

    public void addCategory(Category category) {
        this.category = category;
        if(!this.category.getCategories().contains(this)) {
            this.category.addUserCategory(this);
        }
    }
}
