package seb40_main_012.back.book;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import seb40_main_012.back.book.bookInfoSearchAPI.BookInfoSearchDto;
import seb40_main_012.back.book.bookInfoSearchAPI.BookInfoSearchService;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.book.entity.Genre;
import seb40_main_012.back.common.comment.CommentDto;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.common.rating.RatingService;
import seb40_main_012.back.dto.SingleResponseDto;
import seb40_main_012.back.pairing.PairingDto;
import seb40_main_012.back.pairing.entity.Pairing;
import seb40_main_012.back.user.entity.Category;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.entity.UserCategory;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;
    private final BookMapper bookMapper;
    private final RatingService ratingService;

    @PostMapping("/{add}")
    public ResponseEntity postBook(@Valid @RequestBody BookDto.Post postBook) {

        Book book = bookMapper.bookPostToBook(postBook);
        Book createBook = bookService.createBook(book);
        BookDto.Response response = bookMapper.bookToBookResponse(createBook);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    @GetMapping("/{isbn13}")
    public ResponseEntity getBook(@PathVariable("isbn13") @Positive String isbn13) {

        Book book = bookService.updateView(isbn13);

        BookDto.Response response = bookMapper.bookToBookResponse(book);

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
}