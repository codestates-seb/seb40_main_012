package seb40_main_012.back.pairing.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.common.bookmark.Bookmark;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.common.image.Image;
import seb40_main_012.back.common.like.entity.Like;
import seb40_main_012.back.user.entity.User;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@Entity
@ToString(exclude = "book")
@AllArgsConstructor
@NoArgsConstructor
public class Pairing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long pairingId;

    @Enumerated(EnumType.STRING)
    @Column
    private ParingCategory pairingCategory;

    @Column
    private String imagePath;

    @Column(nullable = false)
    private String title;

    @Column
    private String body;

    @Column
    private Boolean isLiked;

    private Boolean isBookmarked;

    @Column
    private String outLinkPath;

    @Column(nullable = false)
    private long likeCount;

    @Column(nullable = false)
    private long view;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "isbn13")
    private Book book;

    @JsonManagedReference
    @OneToOne(mappedBy = "pairing")
    private Image image;

    @JsonManagedReference
    @OneToMany(mappedBy = "pairing", cascade = CascadeType.REMOVE)
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<Comment> comments;

    @OneToMany(mappedBy = "pairing", cascade = CascadeType.REMOVE)
    @LazyCollection(LazyCollectionOption.FALSE)
    @JsonManagedReference
    @NotFound(action = NotFoundAction.IGNORE)
    private List<Like> likes = new ArrayList<>();

    @OneToMany(mappedBy = "pairing", cascade = CascadeType.ALL)
    @LazyCollection(LazyCollectionOption.FALSE)
    @JsonManagedReference
    private List<Bookmark> bookmarks = new ArrayList<>();

    @CreatedDate
    @Column(nullable = false, updatable = false, name = "CREATED_AT")
    private LocalDateTime createdAt = LocalDateTime.now();

    @LastModifiedDate
    @Column(nullable = false, name = "MODIFIED_AT")
    private LocalDateTime modifiedAt = LocalDateTime.now();

}
