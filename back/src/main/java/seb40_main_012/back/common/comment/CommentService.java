package seb40_main_012.back.common.comment;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb40_main_012.back.advice.BusinessLogicException;
import seb40_main_012.back.advice.ExceptionCode;
import seb40_main_012.back.book.BookRepository;
import seb40_main_012.back.book.BookService;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.bookCollection.repository.BookCollectionRepository;
import seb40_main_012.back.bookCollection.service.BookCollectionService;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.common.comment.entity.CommentType;
import seb40_main_012.back.common.like.LikeService;
import seb40_main_012.back.pairing.PairingRepository;
import seb40_main_012.back.pairing.PairingService;
import seb40_main_012.back.pairing.entity.Pairing;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.repository.UserRepository;
import seb40_main_012.back.user.service.UserService;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
public class CommentService {

    private final CommentRepository commentRepository;
    private final BookService bookService;
    private final BookRepository bookRepository;
    private final PairingService pairingService;
    private final PairingRepository pairingRepository;
    private final BookCollectionService bookCollectionService;
    private final BookCollectionRepository bookCollectionRepository;
    private final UserService userService;
    private final UserRepository userRepository;

    private final LikeService likeService;

    public CommentService(CommentRepository commentRepository, BookService bookService, BookRepository bookRepository,
                          PairingService pairingService, PairingRepository pairingRepository,
                          BookCollectionService bookCollectionService, BookCollectionRepository bookCollectionRepository,
                          UserService userService, UserRepository userRepository, LikeService likeService) {
        this.commentRepository = commentRepository;
        this.bookService = bookService;
        this.bookRepository = bookRepository;
        this.pairingService = pairingService;
        this.pairingRepository = pairingRepository;
        this.bookCollectionService = bookCollectionService;
        this.bookCollectionRepository = bookCollectionRepository;
        this.userService = userService;
        this.userRepository = userRepository;
        this.likeService = likeService;
    }

    public Comment createBookComment(Comment comment, long bookId) {
        Book findBook = bookService.findBook(bookId);
//        User findUser = userService.findUser(userId);
        Comment savedBookComment =
                Comment.builder()
                        .commentType(CommentType.BOOK)
                        .book(findBook)
//                        .user(findUser)
//                        .commentId(comment.getCommentId())
                        .body(comment.getBody())
                        .createdAt(comment.getCreatedAt())
                        .modifiedAt(comment.getModifiedAt())
                        .build();

        findBook.getComments().add(savedBookComment);
        return commentRepository.save(savedBookComment);
    }

    public Comment createPairingComment(Comment comment, long pairingId) {
        Pairing findPairing = pairingService.findPairing(pairingId);
//        User findUser = userService.findUser(userId);

        Comment savedPairingComment =
                Comment.builder()
                        .commentType(CommentType.PAIRING)
//                        .user(findUser)
                        .pairing(findPairing)
//                        .commentId(comment.getCommentId())
                        .body(comment.getBody())
                        .createdAt(comment.getCreatedAt())
                        .modifiedAt(comment.getModifiedAt())
                        .build();

        findPairing.getComments().add(savedPairingComment);
        return commentRepository.save(savedPairingComment);
    }

    public Comment createBookCollectionComment(Comment comment) {
        return null;
    }

    public Comment updateComment(Comment comment, long commentId) {
        Comment findComment = findVerifiedComment(commentId);
        findComment.setBody(comment.getBody());
        findComment.setModifiedAt(LocalDateTime.now());
        return commentRepository.save(findComment);
    }

    public Comment updateLike(Comment comment, long commentId) { // Like Count 값만 변경

        Comment findComment = findVerifiedComment(commentId);

        findComment.setLikeCount(findComment.getLikeCount());

        return commentRepository.save(findComment);
    }

    public Comment findComment(long commentId) {
        return findVerifiedComment(commentId);
    }

    public Page<Comment> findComments(int page, int size) {
        return commentRepository.findAll(PageRequest.of(page, size, Sort.by("CommentId").descending()));
    }

    public void deleteComment(long commentId) {
        Comment findComment = findVerifiedComment(commentId);

        commentRepository.delete(findComment);
    }

    public void verifyUser(long userId, Comment comment) {
    }

    public Comment findVerifiedComment(long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        return optionalComment.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
    }
}




//    public Comment addLike(long commentId, long userId) {
//        Comment findComment = findVerifiedComment(commentId);
//
//        likeService.createCommentLike(commentId, userId);
//
//        findComment.setLikeCount(findComment.getLikeCount() + 1);
//
//        return commentRepository.save(findComment);
//    }
//
//    public Comment cancelLike(long commentId, long userId) {
//        Comment findComment = findVerifiedComment(commentId);
//
//        likeService.createCommentLike(commentId, userId);
//
//        findComment.setLikeCount(findComment.getLikeCount() - 1);
//
//        return commentRepository.save(findComment);
//    }
