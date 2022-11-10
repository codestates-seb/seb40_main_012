package seb40_main_012.back.bookCollectionLike.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.List;

@Getter
@RequiredArgsConstructor
@Entity
public class BookCollectionLike {

    @Id
    private final Long collectionId;
    private final String title;
    private final String content;
    private final String author;    //getUserName()
    private final List<BookCollectionLike> likes;

}
