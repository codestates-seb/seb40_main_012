package seb40_main_012.back.book.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Builder;
import lombok.Data;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.bookCollectionBook.BookCollectionBook;
import seb40_main_012.back.bookWiki.BookWiki;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.pairing.entity.Pairing;

import javax.persistence.*;
import java.util.List;

@Data
@Builder
@Entity
public class Book {
    //    --------------------------------------------------------------------------------------------
    /*도서 상세 페이지 상단*/
    //    --------------------------------------------------------------------------------------------
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long bookId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "genre")
    private Genre genre;

    @Column
    private long view;


    //    --------------------------------------------------------------------------------------------
    //    --------------------------------------------------------------------------------------------
    /*도서 기본 정보*/
    //    --------------------------------------------------------------------------------------------
    //    --------------------------------------------------------------------------------------------
    /*도서 별점*/
    //    --------------------------------------------------------------------------------------------
    @Column
    private long averageRating;
    @Column
    private long ratingCount;
    //    @JsonManagedReference
//    @OneToMany(mappedBy = "book")
//    private List<Rating> ratings;
    //    --------------------------------------------------------------------------------------------
    //    --------------------------------------------------------------------------------------------
    /*도서 파고들기*/
    //    --------------------------------------------------------------------------------------------
    @JsonManagedReference
    @OneToOne(mappedBy = "book")
    private BookWiki bookWiki;
    //    --------------------------------------------------------------------------------------------
    //    --------------------------------------------------------------------------------------------
    /*도서 평가*/
    //    --------------------------------------------------------------------------------------------
    @JsonManagedReference
    @OneToMany(mappedBy = "book", cascade = CascadeType.REMOVE)
    private List<Comment> comments;
    //    --------------------------------------------------------------------------------------------
    //    --------------------------------------------------------------------------------------------
    /*추천 페어링 목록*/
    //    --------------------------------------------------------------------------------------------
    @JsonManagedReference
    @OneToMany(mappedBy = "book", cascade = CascadeType.REMOVE)
    private List<Pairing> pairings;

    //    --------------------------------------------------------------------------------------------
    //    --------------------------------------------------------------------------------------------
    /*관련 컬렉션 목록*/
    //    --------------------------------------------------------------------------------------------
    @JsonManagedReference
    @OneToMany(mappedBy = "book")
    private List<BookCollection> bookCollections;

    //    --------------------------------------------------------------------------------------------
    //    --------------------------------------------------------------------------------------------
    // 다대 다 매핑 준비
    @JsonManagedReference
    @OneToMany(mappedBy = "book")
    private List<BookCollectionBook> bookCollectionBooks;
    //    --------------------------------------------------------------------------------------------
    //    --------------------------------------------------------------------------------------------
    /*비슷한 책 목록*/
    //    --------------------------------------------------------------------------------------------
    @JsonManagedReference
    @OneToMany(mappedBy = "book", cascade = CascadeType.REMOVE)
    private List<Book> similarBooks;
}
