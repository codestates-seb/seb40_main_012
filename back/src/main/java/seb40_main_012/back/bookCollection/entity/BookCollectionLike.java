package seb40_main_012.back.bookCollection.entity;

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
    private Long collectionId;
    private String title;
    private String content;
    private String author;    //getUserName()
    private List<BookCollectionLike> likes;

}
