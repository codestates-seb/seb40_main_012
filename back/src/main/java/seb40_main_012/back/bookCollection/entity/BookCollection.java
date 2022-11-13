package seb40_main_012.back.bookCollection.entity;

import lombok.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import seb40_main_012.back.book.entity.Book;

import javax.persistence.*;
import java.util.List;

@Getter
@RequiredArgsConstructor
@Builder
@Entity
@AllArgsConstructor
public class BookCollection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "collection_id")
    private Long id;
    private String title;
    private String content;
    private String author;    //getUserName()

    @OneToMany(mappedBy = "bookCollection")
    private List<BookCollectionTag> tags;

    @OneToMany(mappedBy = "bookCollection")
    private List<BookCollectionLike> likes;

    @ManyToOne
    @JoinColumn(name = "bookId")
    private Book book;

}
