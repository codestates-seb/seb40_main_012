package seb40_main_012.back.common.comment;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb40_main_012.back.advice.BusinessLogicException;
import seb40_main_012.back.advice.ExceptionCode;
import seb40_main_012.back.book.BookRepository;
import seb40_main_012.back.book.BookService;
import seb40_main_012.back.book.bookInfoSearchAPI.BookInfoSearchService;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.book.entity.Genre;
import seb40_main_012.back.bookCollection.repository.BookCollectionRepository;
import seb40_main_012.back.bookCollection.service.BookCollectionService;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.common.comment.entity.CommentType;
import seb40_main_012.back.pairing.PairingRepository;
import seb40_main_012.back.pairing.PairingService;
import seb40_main_012.back.pairing.entity.Pairing;
import seb40_main_012.back.user.entity.Category;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.entity.UserCategory;
import seb40_main_012.back.user.repository.UserRepository;
import seb40_main_012.back.user.service.UserService;

import java.time.LocalDateTime;
import java.util.Arrays;
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
    private final PairingService pairingService;
    private final PairingRepository pairingRepository;
    private final BookCollectionService bookCollectionService;
    private final BookCollectionRepository bookCollectionRepository;
    private final UserService userService;
    private final UserRepository userRepository;

    public Comment createBookComment(Comment comment, String isbn13) {

        User findUser = userService.getLoginUser();

        Optional<Book> optionalBook = bookRepository.findByIsbn13(isbn13);

        if (optionalBook.isEmpty()) {

            String categoryName = bookInfoSearchService.bookSearch(isbn13).getItem().get(0).categoryName;

            Book savedBook =
                    Book.builder()
                            .isbn13(isbn13)
                            .build();

            if (categoryName.matches(".*소설/시/희곡>.*소설")) savedBook.setGenre(Genre.NOVEL);
            else if (categoryName.matches(".*에세이>.*에세이")) savedBook.setGenre(Genre.ESSAY);
            else if (categoryName.matches(".*소설/시/희곡>.*시")) savedBook.setGenre(Genre.POEM);
            else if (categoryName.matches(".*예술/대중문화>.*")) savedBook.setGenre(Genre.ART);
            else if (categoryName.matches(".*>인문학>.*")) savedBook.setGenre(Genre.HUMANITIES);
            else if (categoryName.matches(".*>사회과학>.*")) savedBook.setGenre(Genre.SOCIAL);
            else if (categoryName.matches(".*>과학>.*")) savedBook.setGenre(Genre.NATURAL);
            else if (categoryName.matches(".*>만화>.*")) savedBook.setGenre(Genre.COMICS);
            else savedBook.setGenre(Genre.ETC);

            bookRepository.save(savedBook);

            Comment savedBookComment =
                    Comment.builder()
                            .commentType(CommentType.BOOK)
                            .book(savedBook)
                            .user(findUser)
                            .body(comment.getBody())
                            .createdAt(LocalDateTime.now())
                            .modifiedAt(LocalDateTime.now())
                            .build();

            savedBook.getComments().add(savedBookComment);

            return commentRepository.save(savedBookComment);

        } else {

            Book findBook = optionalBook.get();

            System.out.println("Book Exists");

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

    public Comment createBookCollectionComment(Comment comment) {
        return null;
    }

    public Comment updateComment(Comment comment, long commentId) {

        User findUser = userService.getLoginUser();

        Comment findComment = findVerifiedComment(commentId);
        findComment.setBody(comment.getBody());
        findComment.setModifiedAt(LocalDateTime.now());
        return commentRepository.save(findComment);
    }

    public Comment updateLike(Comment comment, long commentId) { // Like Count 값만 변경

        User findUser = userService.getLoginUser();

        Comment findComment = findVerifiedComment(commentId);

        findComment.setLikeCount(comment.getLikeCount());

        return commentRepository.save(findComment);
    }

    public Comment updateView(long commentId) {

        Comment findComment = findVerifiedComment(commentId);

        findComment.setView(findComment.getView() + 1); // View +1

        return commentRepository.save(findComment);
    }

    public Comment findComment(long commentId) {
        return findVerifiedComment(commentId);
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
