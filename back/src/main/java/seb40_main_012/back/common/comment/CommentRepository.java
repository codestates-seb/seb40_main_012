package seb40_main_012.back.common.comment;

import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.user.entity.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

//    SliceImpl<Comment> findSliceBy(Pageable pageable);
    List<Comment> findSliceBy(Pageable pageable);

    @Query(nativeQuery = true, value = "select * from comment " +
            "where isbn13 = :isbn13 AND User_Id = :userId")
    Comment findByIsbn13AndUserId(String isbn13, long userId);

    @Query(nativeQuery = true, value = "select * from comment " +
            "INNER JOIN USERS " +
            "ON COMMENT.USER_ID = USERS.USER_ID " +
            "where comment_type = 'BOOK' " +
            "AND isbn13 = 1"
//             + " AND email =" + ":email"
    )
    List<Comment> findMyBookCommentByIsbn13AndEmail(String isbn13);

    PageRequest pageRequest = PageRequest.of(0, 10);
    @Query(nativeQuery = true, value = "select * from comment " +
            "where isbn13 = :isbn13 "+ "order by " + "like_count " + "desc")
    Page<Comment> findBookCommentsSlice(String isbn13, Pageable pageable);

    @Query(nativeQuery = true, value = "select * from comment " +
            "where isbn13 = :isbn13 "+ "order by " + "like_count " + "desc")
    List<Comment> findBookComments(String isbn13);

    @Modifying
    @Query(nativeQuery = true, value = "DELETE FROM COMMENT WHERE USER_ID = :userId")
    void deleteAllByUserId(long userId);

    @Query(nativeQuery = true, value = "select * " +
            "from Comment " +
            "where User_Id = :userId "
            + "order by " + "created_at desc, created_at " + "desc")
    List<Comment> findByUserId(long userId);

    Long countByUser(User user);

}
