package seb40_main_012.back.common.comment;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.common.comment.entity.Comment;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

//    SliceImpl<Comment> findSliceBy(Pageable pageable);
    List<Comment> findSliceBy(Pageable pageable);

    @Query(nativeQuery = true, value = "select * from comment " +
            "where isbn13 = :isbn13 AND User_Id = :userId")
    Comment findByIsbn13AndUserId(String isbn13, long userId);

    Long countBy();

}
