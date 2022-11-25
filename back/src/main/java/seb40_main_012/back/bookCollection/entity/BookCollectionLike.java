package seb40_main_012.back.bookCollection.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import seb40_main_012.back.user.entity.User;

import javax.persistence.*;
import java.util.List;

@Getter
@RequiredArgsConstructor
@Entity
public class BookCollectionLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_id")
    private Long Id;
    private String title;
    private String content;
    private String author;    //getUserName()

    @ManyToOne
    @JoinColumn(name = "collection_id")
    private BookCollection bookCollection;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public BookCollectionLike(User user, BookCollection collection) {
        this.user = user;
        this.bookCollection = collection;
    }

}
