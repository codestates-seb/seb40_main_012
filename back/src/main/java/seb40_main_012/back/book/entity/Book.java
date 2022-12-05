package seb40_main_012.back.book.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.bookCollectionBook.BookCollectionBook;
import seb40_main_012.back.bookWiki.BookWiki;
import seb40_main_012.back.common.bookmark.Bookmark;
import seb40_main_012.back.common.comment.CommentService;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.common.rating.Rating;
import seb40_main_012.back.pairing.entity.Pairing;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Book {


    //    --------------------------------------------------------------------------------------------
    //    --------------------------------------------------------------------------------------------
    /*도서 기본 정보*/
    //    --------------------------------------------------------------------------------------------
    @Id
    @Column
    private String isbn13;

    @Column
    private String cover;

    @Column
    private String author;

    @Column(name = "Book_Title")
    private String title;

    @Column
    private String subTitle;

    @Column
    private String itemPage;

    @Column
    private String pubDate;

    @Column
    private String publisher;

    @Column
    private String adult;

    @Column
    private long commentCount;

    @Column
    private long pairingCount;

    @Column
    private long bookCollectionCount;

    @Transient
    private boolean isBookmarked;

    @Enumerated(EnumType.STRING)
    @Column(name = "genre")
    private Genre genre;

    @Column
    private String description;

    @Column
    private long view;

    //    --------------------------------------------------------------------------------------------
    //    --------------------------------------------------------------------------------------------
    /*도서 별점*/
    //    --------------------------------------------------------------------------------------------
    @Column
    private double averageRating;

    @Column
    private long ratingCount;

    @JsonManagedReference
    @OneToMany(mappedBy = "book")
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<Rating> ratings;
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
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<Comment> comments = new ArrayList<>();

//    SliceImpl<Comment> getComments() {
//        SliceImpl<Comment> findComments =
//    }


    //    --------------------------------------------------------------------------------------------
    //    --------------------------------------------------------------------------------------------
    /*추천 페어링 목록*/
    //    --------------------------------------------------------------------------------------------
    @JsonManagedReference
    @OneToMany(mappedBy = "book")
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<Pairing> pairings = new ArrayList<>();
    //    --------------------------------------------------------------------------------------------
    //    --------------------------------------------------------------------------------------------
    /*관련 컬렉션 목록*/
    //    --------------------------------------------------------------------------------------------

//    @JsonManagedReference
//    @OneToMany(mappedBy = "book")
//    @LazyCollection(LazyCollectionOption.FALSE)
//    private List<BookCollection> bookCollections = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "book") // 다대 다
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<BookCollectionBook> bookCollectionBooks = new ArrayList<>();
    //    --------------------------------------------------------------------------------------------
    //    --------------------------------------------------------------------------------------------
    /*비슷한 책 목록*/
    //    --------------------------------------------------------------------------------------------
//    @JsonManagedReference
//    @OneToMany(mappedBy = "book", cascade = CascadeType.REMOVE)
//    private List<Book> similarBooks;

    //    --------------------------------------------------------------------------------------------
    //    --------------------------------------------------------------------------------------------
    /*북마크*/
    //    --------------------------------------------------------------------------------------------
    @OneToMany(mappedBy = "book",cascade = CascadeType.REMOVE)
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<Bookmark> bookmarks = new ArrayList<>();

    public void setIsBookmarked(boolean bookmark){
        this.isBookmarked = bookmark;
    }

}
