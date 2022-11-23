package seb40_main_012.back.common.comment;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb40_main_012.back.advice.BusinessLogicException;
import seb40_main_012.back.advice.ExceptionCode;
import seb40_main_012.back.book.BookRepository;
import seb40_main_012.back.book.BookService;
import seb40_main_012.back.book.bookInfoSearchAPI.BookInfoSearchService;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.bookCollection.repository.BookCollectionRepository;
import seb40_main_012.back.bookCollection.service.BookCollectionService;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.common.comment.entity.CommentType;
import seb40_main_012.back.common.like.LikeRepository;
import seb40_main_012.back.pairing.PairingRepository;
import seb40_main_012.back.pairing.PairingService;
import seb40_main_012.back.pairing.entity.Pairing;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.repository.UserRepository;
import seb40_main_012.back.user.service.UserService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional

@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final BookService bookService;
    private final BookInfoSearchService bookInfoSearchService;
    private final BookRepository bookRepository;
    private final LikeRepository likeRepository;
    private final PairingService pairingService;
    private final PairingRepository pairingRepository;
    private final BookCollectionService collectionService;
    private final BookCollectionRepository bookCollectionRepository;
    private final UserService userService;
    private final UserRepository userRepository;

    public Comment createBookComment(Comment comment, String isbn13) {

        User findUser = userService.getLoginUser();

        Book findBook = bookService.findVerifiedBook(isbn13);

        Comment savedBookComment =
                Comment.builder()
                        .commentType(CommentType.BOOK)
                        .book(findBook)
                        .user(findUser)
                        .body(comment.getBody())
                        .createdAt(LocalDateTime.now())
                        .modifiedAt(LocalDateTime.now())
                        .build();

        findBook.getComments().add(savedBookComment);
        return commentRepository.save(savedBookComment);
    }

    public Comment createPairingComment(Comment comment, long pairingId) {

        User findUser = userService.getLoginUser();

        Pairing findPairing = pairingService.findPairing(pairingId);

        Comment savedPairingComment =
                Comment.builder()
                        .commentType(CommentType.PAIRING)
                        .user(findUser)
                        .pairing(findPairing)
                        .body(comment.getBody())
                        .createdAt(LocalDateTime.now())
                        .modifiedAt(LocalDateTime.now())
                        .build();

        findPairing.getComments().add(savedPairingComment);
        return commentRepository.save(savedPairingComment);
    }

    public Comment createBookCollectionComment(Comment comment,Long collectionId) {
        User findUser = userService.getLoginUser();
        BookCollection collection = collectionService.findVerifiedCollection(collectionId);
        Comment savedComment = Comment.builder()
                .commentType(CommentType.BOOK_COLLECTION)
                .user(findUser)
                .body(comment.getBody())
                .bookCollection(collection)
                .createdAt(LocalDateTime.now())
                .modifiedAt(LocalDateTime.now())
                .build();
        return commentRepository.save(savedComment);
    }

    public Comment updateComment(Comment comment, long commentId) {

        User findUser = userService.getLoginUser();

        Comment findComment = findVerifiedComment(commentId);
        findComment.setBody(comment.getBody());
        findComment.setModifiedAt(LocalDateTime.now());
        return commentRepository.save(findComment);
    }

    public Comment addLike(long commentId) {

        User findUser = userService.getLoginUser();

        Comment findComment = findVerifiedComment(commentId);

        findComment.setLikeCount(findComment.getLikeCount() + 1);

        findComment.setIsLiked(true);

        return commentRepository.save(findComment);
    }

    public Comment removeLike(long commentId) {

        User findUser = userService.getLoginUser();

        Comment findComment = findVerifiedComment(commentId);

        findComment.setLikeCount(findComment.getLikeCount() - 1);

        findComment.setIsLiked(false);

        return commentRepository.save(findComment);
    }

    public Comment updateView(long commentId) {

        Comment findComment = findVerifiedComment(commentId);

        findComment.setView(findComment.getView() + 1); // View +1

        return commentRepository.save(findComment);
    }

    public Comment isLikedComment(long commentId) {

        User findUser = userService.getLoginUser();

        Comment findComment = findVerifiedComment(commentId);

        Boolean isLiked;

        if (likeRepository.findByCommentAndUser(findComment, findUser) == null) { //좋아요 안 누른 경우
            isLiked = false;
        } else {
            isLiked = true;
        }

        findComment.setIsLiked(isLiked);

        return findComment;
    }

    public Comment findComment(long commentId) {
        return findVerifiedComment(commentId);
    }

    public Comment findMyComment(String isbn13) {

        User findUser = userService.getLoginUser();

        return commentRepository.findByIsbn13AndUserId(isbn13, findUser.getUserId());
    }

//    public Page<Comment> findComments(int page, int size) { // 페이지네이션으로 받기
//
//        return commentRepository.findAll(PageRequest.of(page, size, Sort.by("likeCount").descending()));
//    }

//    public SliceImpl<Comment> findComments() { // 리스트 처리 및 좋아요 내림차순 정렬
//
//        PageRequest pageRequest = PageRequest.of(1, 10, Sort.by(Sort.Direction.DESC, "likeCount"));
//
//        SliceImpl<Comment> result = commentRepository.findSliceBy(pageRequest);
//
//        return commentRepository.findSliceBy(pageRequest);
//    }

    public List<Comment> findComments() { // 리스트 처리 및 좋아요 내림차순 정렬

        PageRequest pageRequest = PageRequest.of(1, 10, Sort.by(Sort.Direction.DESC, "likeCount"));

//        SliceImpl<Comment> result = commentRepository.findSliceBy(pageRequest);

        return commentRepository.findSliceBy(pageRequest);
    }

//    public List<Comment> findComments() { // 리스트 처리 및 좋아요 내림차순 정렬
//
//        return commentRepository.findAll(Sort.by("likeCount").descending());
//    }

    public void deleteComment(long commentId) {

        User findUser = userService.getLoginUser();

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


//    public Comment updateLike(Comment comment, long commentId) { // Like Count 값만 변경
//
//        User findUser = userService.getLoginUser();
//
//        Comment findComment = findVerifiedComment(commentId);
//
//        findComment.setLikeCount(comment.getLikeCount());
//
//        return commentRepository.save(findComment);
//    }
