package seb40_main_012.back.bookCollection.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@RequiredArgsConstructor
@Builder
@Entity
@AllArgsConstructor
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tagId;
    private String tagName;

    @OneToMany(mappedBy = "tag",cascade = CascadeType.ALL)
    private List<BookCollectionTag> collectionTags = new ArrayList<>();

    //    public void addBookCollectionTag(BookCollectionTag collectionTag) {
//        this.collectionTags.add(collectionTag);
//    }
    public Tag(String tagName) {
        this.tagName = tagName;
    }

}
