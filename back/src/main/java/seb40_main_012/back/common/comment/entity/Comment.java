package seb40_main_012.back.common.comment.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.data.annotation.CreatedDate;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.common.like.entity.Like;
import seb40_main_012.back.pairing.entity.Pairing;
import seb40_main_012.back.user.entity.User;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor //mapperImpl에서 에러나서 추가해두었습니다. 확인하시면 주석 삭제부탁드려용
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CommentType commentType;

    @Column(nullable = false)
    private String body;

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
    @JoinColumn(name = "book_id")
    private Book book;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pairing_id")
    private Pairing pairing;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bookCollection_id")
    private BookCollection bookCollection;

    @JsonManagedReference
    @OneToMany(mappedBy = "comment", cascade = CascadeType.REMOVE)
    @LazyCollection(LazyCollectionOption.FALSE)
    private final List<Like> likes = new ArrayList<>();

    @CreatedDate
    @Column(nullable = false, updatable = false, name = "CREATED_AT")
    private LocalDateTime createdAt = LocalDateTime.now();

    @CreatedDate
    @Column(nullable = false, name = "MODIFIED_AT")
    private LocalDateTime modifiedAt = LocalDateTime.now();

}
