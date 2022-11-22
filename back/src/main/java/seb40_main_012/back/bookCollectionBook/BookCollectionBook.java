package seb40_main_012.back.bookCollectionBook;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.bookCollection.entity.BookCollection;

import javax.persistence.*;

@Getter
@Builder
@Entity
@AllArgsConstructor
@RequiredArgsConstructor
public class BookCollectionBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long bookCollectionBookId;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id")
    private Book book;

//    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "collection_id")
    private BookCollection bookCollection;

    public BookCollectionBook(Book book,BookCollection collection){
        this.book = book;
        this.bookCollection = collection;
    }

}
