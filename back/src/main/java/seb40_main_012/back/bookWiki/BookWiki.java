package seb40_main_012.back.bookWiki;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import seb40_main_012.back.book.entity.Book;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class BookWiki {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long bookWikiId;

    @Column
    private long view;

    @Column
    private String imagePath;

    @Column
    private String spacetimeBackground;

    @Column
    private String characterTree;

    @Column
    private String objectInside;

    @Column
    private String trivia;

    @Column
    private String appendix;

    @Column
    private String objectOutside;

    @CreatedDate
    @Column(nullable = false, updatable = false, name = "CREATED_AT")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "MODIFIED_AT")
    private LocalDateTime modifiedAt;

    @JsonBackReference
    @OneToOne
    @JoinColumn(name = "book_id")
    private Book book;
}
