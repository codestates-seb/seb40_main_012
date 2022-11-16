package seb40_main_012.back.user.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import seb40_main_012.back.book.entity.Genre;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(mappedBy = "category")
    private List<UserCategory> categories = new ArrayList<>();

    public Category(Genre genre){
        this.genre = genre;
    }
}
