package seb40_main_012.back.book;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import seb40_main_012.back.advice.BusinessLogicException;
import seb40_main_012.back.advice.ExceptionCode;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.bookCollection.service.BookCollectionService;
import seb40_main_012.back.common.bookmark.BookmarkService;
import seb40_main_012.back.common.comment.CommentDto;
import seb40_main_012.back.common.comment.CommentMapper;
import seb40_main_012.back.common.comment.CommentService;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.common.rating.Rating;
import seb40_main_012.back.common.rating.RatingService;
import seb40_main_012.back.config.auth.cookie.CookieManager;
import seb40_main_012.back.config.auth.repository.RefreshTokenRepository;
import seb40_main_012.back.dto.SingleResponseDto;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.service.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/books")
public class BookController {

    private final CommentService commentService;
    private final CommentMapper commentMapper;
    private final BookCollectionService bookCollectionService;
    private final BookService bookService;
    private final BookmarkService bookmarkService;
    private final BookMapper bookMapper;
    private final RatingService ratingService;
    private final CookieManager cookieManager;
    private final RefreshTokenRepository refreshTokenRepository;

    private final UserService userService;

    @GetMapping("/{isbn13}")
    public ResponseEntity getBook(HttpServletRequest request,
            @RequestHeader(value = "Authorization", required = false) @Valid @Nullable String token,
                                  @PathVariable("isbn13") @Positive String isbn13) {
        String refreshToken = cookieManager.outCookie(request, "refreshToken");
        if(refreshToken != null) {
            if(refreshTokenRepository.findByTokenValue(refreshToken) != null && token == null) // 로그인 유저인데 authorization이 없는 경우
                throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED);
        }

        Book book = bookService.updateView(isbn13);
        if (!SecurityContextHolder.getContext().getAuthentication().getName().equals("anonymousUser")) {
            bookService.isBookMarkedBook(book);
        }

        if (token == null && book.getComments() != null) { // 로그인 안 했을 때 isLiked == null

            book.getComments().stream()
                    .map(comment -> commentService.isLikedNull(comment.getCommentId()))
                    .collect(Collectors.toList());
        }
        else if (token != null && book.getComments() != null) {

            book.getComments().stream()
                    .map(comment -> commentService.isLikedComment(comment.getCommentId()))
                    .collect(Collectors.toList());
        }

        List<BookCollection> collections = bookCollectionService.getAllCollectionsForTheBook(isbn13);

        BookDto.Response response = bookMapper.bookToBookResponses(book, collections);
//        if ( response.getComments() == null ) {
//            response.setComments(commentService.findBookComments(book.getIsbn13())); // 이거 주석 해제하면 무한스크롤
//        }
        if (response.getComments() == null) {
            response.setComments(new PageImpl<>(commentService.findBookCommentsWithoutPage(book.getIsbn13())));
            response.getComments().stream()
                    .forEach(comment -> comment.setUserInformation(
                            new LinkedHashMap<>() {{
                                put("profileImage", comment.getUser().getProfileImage());
                                put("nickName", comment.getUser().getNickName());
                                put("email", comment.getUser().getEmail());
                                put("bookTemp", Double.toString(comment.getUser().getBookTemp()));
                            }}
                    ));
        }

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }

    @GetMapping("/{isbn13}/mycomment")
    public ResponseEntity getMyBookComment(@PathVariable("isbn13") @Positive String isbn13) {

        Comment myComment = commentService.findMyComment(isbn13);
        CommentDto.Response response = commentMapper.myCommentToCommentResponse(myComment);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }

    @PatchMapping
    public ResponseEntity patchBook() {
        return null;
    }

    @PatchMapping("/{isbn13}/rating")
    public ResponseEntity patchRating(@PathVariable("isbn13") @Positive String isbn13,
                                      @Valid @RequestBody BookDto.Rating ratingBook) {

        Book book = ratingService.createBookRating(isbn13, ratingBook);
        BookDto.Response response = bookMapper.bookToBookResponse(book);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }

//    @PatchMapping("/{isbn13}")
//    public ResponseEntity updateViewBook( // 조회 기능에 통합
////            @RequestBody BookDto.View viewBook,
//            @PathVariable("isbn13") @Positive String isbn13) {
////        Book book = bookMapper.bookViewToBook(viewBook);
//        Book viewedBook = bookService.updateView(isbn13);
//        BookDto.Response response = bookMapper.bookToBookResponse(viewedBook);
//
//        return new ResponseEntity<>(
//                new SingleResponseDto<>(response), HttpStatus.OK
//        );
//    }

    @GetMapping("/carousel")
    public ResponseEntity carouselBooks() { // 별점으로 5개 내림차순

        List<Book> response = bookService.findCarouselBooks();
        List<BookDto.Response> result = bookMapper.booksToBookResponses(response);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }

    @GetMapping("/best")
    public ResponseEntity bestBooks() { // 조회수로 5개 내림차순

        List<Book> response = bookService.findBestBooks();

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }

    @GetMapping("/recommended")
    public ResponseEntity recommendedBooks() { // 선호 장르에서 조회수로 5개 내림차순

        List<Book> response = bookService.findRecommendedBooks();

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }
    @PostMapping("/{isbn13}/bookmark")
    @ResponseStatus(HttpStatus.OK)
    public BookDto.Response bookmarkBook(@PathVariable("isbn13") String isbn13){
        Book findBook = bookService.findVerifiedBook(isbn13);
        bookmarkService.bookmarkBook(isbn13);
        bookService.isBookMarkedBook(findBook);
        BookDto.Response response = bookMapper.bookToBookResponse(findBook);
        return response;
    }

}
