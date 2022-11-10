package seb40_main_012.back.pairing.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Builder;
import lombok.Data;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.comment.entity.Comment;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@Entity
public class Pairing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long pairingId;

    @Column(nullable = false)
    private String imagePath;

    @Column(nullable = false)
    private String body;

    @Column(nullable = false)
    private long rating;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id")
    private Book book;

    @JsonManagedReference
    @OneToMany(mappedBy = "pairing")
    private List<Comment> comments = new ArrayList<>();

}
