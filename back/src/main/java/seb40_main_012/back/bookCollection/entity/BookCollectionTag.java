package seb40_main_012.back.bookCollection.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

@Builder
@Getter
@AllArgsConstructor
@RequiredArgsConstructor
@Entity
public class BookCollectionTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long BookCollectionTagId;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "collection_id")
    private BookCollection bookCollection;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY) //
    @JoinColumn(name = "tag_id")
    private Tag tag;

    public BookCollectionTag(BookCollection collection, Tag tag) {
        this.bookCollection = collection;
        this.tag = tag;
    }
}
