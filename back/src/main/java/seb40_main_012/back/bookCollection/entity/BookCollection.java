package seb40_main_012.back.bookCollection.entity;

import lombok.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.data.annotation.LastModifiedDate;
import seb40_main_012.back.bookCollectionBook.BookCollectionBook;
import seb40_main_012.back.common.bookmark.Bookmark;
import seb40_main_012.back.user.entity.User;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
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

    @OneToMany(mappedBy = "bookCollection",cascade = CascadeType.ALL)
    private List<BookCollectionTag> collectionTags = new ArrayList<>();

    @OneToMany(mappedBy = "bookCollection",cascade = CascadeType.REMOVE)
    private List<BookCollectionLike> collectionLikes = new ArrayList<>();

    @OneToMany(mappedBy = "bookCollection",cascade = CascadeType.REMOVE)
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<Bookmark> collectionBookmarks = new ArrayList<>();

    @ElementCollection
    private List<String> isbn13 = new ArrayList<>();

    @OneToMany(mappedBy = "bookCollection",cascade = CascadeType.ALL)
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<BookCollectionBook> collectionBooks = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @LastModifiedDate
    private LocalDate lastModifiedAt = LocalDate.now();

    public BookCollection(String title, String content,List<String> isbn13) {
        this.title = title;
        this.content= content;
        this.isbn13 = isbn13;
        this.likeCount = 0L;
        this.lastModifiedAt = LocalDate.now();
    }
    public void editCollection(BookCollection collection){
        this.title = collection.getTitle();
        this.content= collection.getContent();
        this.isbn13 = collection.getIsbn13();
        this.lastModifiedAt = LocalDate.now();
    }


    public void addCollectionTag(BookCollectionTag collectionTag) {
        collectionTags.add(collectionTag);
    }
    public void setCollectionTag() {
        this.collectionTags = new ArrayList<>();
    }

    public void addISBN(String isbn){
        this.isbn13.add(isbn);
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
