package seb40_main_012.back.bookCollection.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.List;

@Getter
@RequiredArgsConstructor
@Builder
@Entity
@AllArgsConstructor
public class BookCollection {

    @Id
    private Long collectionId;
    private String title;
    private String content;
    private String author;    //getUserName()
    private List<BookCollectionTag> tags;

}
