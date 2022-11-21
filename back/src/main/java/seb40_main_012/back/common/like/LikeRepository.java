package seb40_main_012.back.common.like;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.common.like.entity.Like;
import seb40_main_012.back.pairing.entity.Pairing;
import seb40_main_012.back.user.entity.User;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {

    Like findByPairingAndUser(Pairing pairing, User user);
    Like findByCommentAndUser(Comment comment, User user);
}
