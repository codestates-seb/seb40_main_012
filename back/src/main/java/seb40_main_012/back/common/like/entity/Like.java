package seb40_main_012.back.common.like.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.pairing.entity.Pairing;
import seb40_main_012.back.user.entity.User;

import javax.persistence.*;

@Data
@Builder
@Entity
@Table(name = "Likes")
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long likeId;

    @Column
    private long userId;

//    @JsonBackReference
//    @ManyToOne(fetch =  FetchType.LAZY)
//    @JoinColumn(name = "user_id")
//    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LikeType likeType;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "pairing_id")
    private Pairing pairing;

//    @JsonBackReference
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "answer_id")
//    private BookCollection bookCollection;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "comment_id")
    private Comment comment;

}
