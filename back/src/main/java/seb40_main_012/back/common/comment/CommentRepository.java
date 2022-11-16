package seb40_main_012.back.common.comment;

import org.springframework.data.jpa.repository.JpaRepository;
import seb40_main_012.back.common.comment.entity.Comment;

import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    Long countBy();
}
