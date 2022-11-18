package seb40_main_012.back.bookCollection.entity;

import lombok.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.user.entity.User;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
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

    @OneToMany(mappedBy = "bookCollection")
    private List<BookCollectionLike> collectionLikes = new ArrayList<>();

    @OneToMany(mappedBy = "bookCollection")
    private List<BookCollectionBookmark> collectionBookmarks = new ArrayList<>();

    @ElementCollection
    private List<String> isbn13 = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

    @LastModifiedDate
    private LocalDate lastModifiedAt = LocalDate.now();

    public void addCollectionTag(BookCollectionTag collectionTag) {
        collectionTags.add(collectionTag);
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
