package seb40_main_012.back.bookCollection.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.bookCollectionBook.BookCollectionBook;
import seb40_main_012.back.common.bookmark.Bookmark;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.user.entity.User;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
@Builder
@Entity
@AllArgsConstructor
public class BookCollection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long collectionId;
    private String title;
    private String content;
    private Long likeCount;
    @Transient
    private boolean userLike;
    @Transient
    private boolean userBookmark;
    @Transient
    private boolean userCollection;
    private Long view;

    @OneToMany(mappedBy = "bookCollection",cascade = CascadeType.ALL)
    private List<BookCollectionTag> collectionTags = new ArrayList<>();

    @OneToMany(mappedBy = "bookCollection",cascade = CascadeType.REMOVE)
    private List<BookCollectionLike> collectionLikes = new ArrayList<>();

    @OneToMany(mappedBy = "bookCollection",cascade = CascadeType.REMOVE)
    @LazyCollection(LazyCollectionOption.FALSE)
    @JsonManagedReference
    private List<Bookmark> collectionBookmarks = new ArrayList<>();

    @ElementCollection
    private List<String> bookIsbn13 = new ArrayList<>();

    @OneToMany(mappedBy = "bookCollection",cascade = CascadeType.ALL)
    @LazyCollection(LazyCollectionOption.FALSE)
    @JsonManagedReference
    private List<BookCollectionBook> collectionBooks = new ArrayList<>();

    @OneToMany(mappedBy = "bookCollection",cascade = CascadeType.REMOVE)
    @LazyCollection(LazyCollectionOption.FALSE)
    @JsonManagedReference
    private List<Comment> comments = new ArrayList<>();

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "isbn13")
    private Book book;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @LastModifiedDate
    private LocalDate lastModifiedAt = LocalDate.now();

    public BookCollection(String title, String content,List<String> bookIsbn13) {
        this.title = title;
        this.content= content;
        this.bookIsbn13 = bookIsbn13;
        this.likeCount = 0L;
        this.userLike = false;
        this.userBookmark=false;
        this.userCollection=false;
        this.view = 0L;
        this.createdAt = LocalDateTime.now();
        this.lastModifiedAt = LocalDate.now();
    }
    public void editCollection(BookCollection collection){
        this.title = collection.getTitle();
        this.content= collection.getContent();
        this.bookIsbn13 = collection.getBookIsbn13();
        this.lastModifiedAt = LocalDate.now();
    }


    public void addCollectionTag(BookCollectionTag collectionTag) {
        collectionTags.add(collectionTag);
    }
    public void addCollectionBook(BookCollectionBook collectionBook) {
        collectionBooks.add(collectionBook);
    }
    public void setCollectionTag() {
        this.collectionTags = new ArrayList<>();
    }

    public void addISBN(String isbn){
        this.bookIsbn13.add(isbn);
    }
    public void addUser(User user){
        this.user= user;
    }

    public void setLikeCount(Long count) {
        this.likeCount = count;
    }
    public void addCollectionLike(BookCollectionLike collectionLike) {
        this.collectionLikes.add(collectionLike);
    }
    public void setLastModifiedDate(){
        this.lastModifiedAt = LocalDate.now();
    }

}
