package seb40_main_012.back.bookWiki;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Builder;
import lombok.Data;
import seb40_main_012.back.book.entity.Book;

import javax.persistence.*;

@Data
@Builder
@Entity
public class BookWiki {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long bookTriviaId;

    @Column
    private String spacetimeBackground;

    @Column
    private String imagePath;

    @Column
    private String characterTree;

    @Column
    private String objectInside;

    @Column
    private String appendix;

    @Column
    private String trivia;

    @Column
    private String objectOutside;

    @JsonBackReference
    @OneToOne
    @JoinColumn(name = "book_id")
    private Book book;
}
