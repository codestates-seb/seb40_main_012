package seb40_main_012.back.bookCollection.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

@Getter
@RequiredArgsConstructor
@Entity
public class BookCollectionTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long BookCollectionTagId;

    @ManyToOne
    @JoinColumn(name = "collection_id")
    private BookCollection bookCollection;
}
