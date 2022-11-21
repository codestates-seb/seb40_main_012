package seb40_main_012.back.bookCollection.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import seb40_main_012.back.user.entity.User;

import javax.persistence.*;

@Builder
@Getter
@AllArgsConstructor
@RequiredArgsConstructor
@Entity
public class BookCollectionBookmark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long BookCollectionBookMarkId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "collection_id")
    private BookCollection bookCollection;

    @ManyToOne(fetch = FetchType.LAZY) //
    @JoinColumn(name = "user_id")
    private User user;

    public BookCollectionBookmark(BookCollection collection, User user) {
        this.bookCollection = collection;
        this.user = user;
    }
}
