package seb40_main_012.back.comment;

import org.springframework.data.jpa.repository.JpaRepository;
import seb40_main_012.back.comment.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
