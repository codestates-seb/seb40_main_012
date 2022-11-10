package seb40_main_012.back.comment.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.pairing.entity.Pairing;
import seb40_main_012.back.user.entity.User;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Builder
@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CommentType commentType;

    @Column(nullable = false)
    private String body;

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
    @JoinColumn(name = "answer_id")
    private BookCollection bookCollection;

    @JsonBackReference
    @ManyToOne(fetch =  FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @CreatedDate
    @Column(nullable = false, updatable = false, name = "CREATED_AT")
    private LocalDateTime createdAt = LocalDateTime.now();

    @CreatedDate
    @Column(nullable = false, name = "MODIFIED_AT")
    private LocalDateTime modifiedAt = LocalDateTime.now();

}
