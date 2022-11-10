package seb40_main_012.back.bookCollection.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import seb40_main_012.back.bookCollectionTag.entity.BookCollectionTag;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.List;

@Getter
@RequiredArgsConstructor
@Entity
public class BookCollection {

    @Id
    private final Long collectionId;
    private final String title;
    private final String content;
    private final String author;    //getUserName()
    private final List<BookCollectionTag> tags;

}
