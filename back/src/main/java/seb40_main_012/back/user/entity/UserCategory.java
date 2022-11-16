package seb40_main_012.back.user.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Id;

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
    private User user;

    public UserCategory(Category category, User user) {
        this.category = category;
        this.user = user;
    }

}
