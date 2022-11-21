package seb40_main_012.back.common.like;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb40_main_012.back.advice.BusinessLogicException;
import seb40_main_012.back.advice.ExceptionCode;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.bookCollection.repository.BookCollectionRepository;
import seb40_main_012.back.common.comment.CommentDto;
import seb40_main_012.back.common.comment.CommentRepository;
import seb40_main_012.back.common.comment.CommentService;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.common.like.entity.Like;
import seb40_main_012.back.common.like.entity.LikeType;
import seb40_main_012.back.pairing.PairingDto;
import seb40_main_012.back.pairing.PairingRepository;
import seb40_main_012.back.pairing.PairingService;
import seb40_main_012.back.pairing.entity.Pairing;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.service.UserService;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class LikeService {

    private final PairingRepository pairingRepository;
    private final BookCollectionRepository bookCollectionRepository;
    private final CommentRepository commentRepository;
    private final UserService userService;
    private final LikeRepository likeRepository;
    private final PairingService pairingService;
    private final CommentService commentService;

    public void createPairingLike(long pairingId) {

        Pairing findPairing = pairingService.findPairing(pairingId);

        User findUser = userService.getLoginUser();

        long userId = findUser.getUserId();

        Like findPairingLike = likeRepository.findByPairingAndUser(findPairing, findUser);

        if (findPairingLike == null) {
            findPairingLike =
                    Like.builder()
                            .likeType(LikeType.PAIRING)
                            .user(findUser)
                            .pairing(findPairing)
                            .build();

            likeRepository.save(findPairingLike);

        } else {
            throw new BusinessLogicException(ExceptionCode.LIKED);
        }
    }

//    public void createPairingLike(long pairingId) {
//
//        Pairing findPairing = pairingService.findPairing(pairingId);
//
//        User findUser = userService.getLoginUser();
//
//        long userId = findUser.getUserId();
//
//        Like findPairingLike = likeRepository.findByPairingAndUser(findPairing, findUser);
//
//        if (findPairingLike == null) {
//            findPairingLike =
//                    Like.builder()
//                            .likeType(LikeType.PAIRING)
//                            .user(findUser)
//                            .pairing(findPairing)
//                            .build();
//
//            likeRepository.save(findPairingLike);
//
//        } else {
//            throw new BusinessLogicException(ExceptionCode.LIKED);
//        }
//    }

    public void createBookCollectionLike(User user, BookCollection bookCollection) {
    }

    public void createCommentLike(long commentId) { // 책에 대한 코멘트 좋아요

        Comment findComment = commentService.findComment(commentId);

        User findUser = userService.getLoginUser();

        long userId = findUser.getUserId();

        Like findCommentLike = likeRepository.findByCommentAndUser(findComment, findUser);

        if (findCommentLike == null) {
            findCommentLike =
                    Like.builder()
                            .likeType(LikeType.COMMENT)
                            .user(findUser)
                            .comment(findComment)
                            .build();

            likeRepository.save(findCommentLike);

        } else {
            throw new BusinessLogicException(ExceptionCode.LIKED);
        }
    }
}


//    public void createCommentLike(long commentId, long userId) {
//
//        Optional<Comment> optionalComment = commentRepository.findById(commentId);
//
//        Comment findComment = optionalComment.orElseThrow(() ->
//                new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
//
////        User findUser = userService.findUser(userId);
//
//        Like findCommentLike = likeRepository.findByCommentAndUserId(findComment, userId);
//
//        if (findCommentLike == null) {
//            findCommentLike =
//                    Like.builder()
//                            .likeType(LikeType.COMMENT)
//                            .userId(userId)
//                            .comment(findComment)
//                            .build();
//
//            likeRepository.save(findCommentLike);
//
//        } else {
//            throw new BusinessLogicException(ExceptionCode.LIKED);
//        }
//    }
