package seb40_main_012.back.bookCollection.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

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


}
