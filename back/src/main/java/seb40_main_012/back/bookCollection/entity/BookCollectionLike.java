package seb40_main_012.back.bookCollection.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import seb40_main_012.back.user.entity.User;

import javax.persistence.*;

@Getter
@RequiredArgsConstructor
@Entity
public class BookCollectionLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long likeId;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "collection_id")
    private BookCollection bookCollection;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

    public BookCollectionLike(User user, BookCollection collection) {
        this.user = user;
        this.bookCollection = collection;
    }

}
