package seb40_main_012.back.common.comment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import seb40_main_012.back.common.comment.entity.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
}
