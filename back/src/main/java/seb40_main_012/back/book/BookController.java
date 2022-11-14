package seb40_main_012.back.book;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.common.comment.CommentDto;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.dto.SingleResponseDto;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.HashMap;
import java.util.Map;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;
    private final BookMapper bookMapper;

    @GetMapping("/{book_id}")
    public ResponseEntity getBook(@PathVariable("book_id") @Positive long bookId) {

        Book book = bookService.findBook(bookId);

        BookDto.Response response = bookMapper.bookToBookResponse(book);

        System.out.println(response.getBookId());

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }

    @PatchMapping
    public ResponseEntity patchBook() {
        return null;
    }

    @PatchMapping("/{book_id}/rating")
    public ResponseEntity patchRating(@RequestHeader("Authorization") long userId,
                                      @PathVariable("book_id") @Positive long bookId,
                                      @Valid @RequestBody BookDto.Rating ratingBook) {

        Book book = bookService.updateRating(ratingBook);
        BookDto.Response response = bookMapper.bookToBookResponse(book);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }

    @PatchMapping("/{book_id}")
    public ResponseEntity updateViewPairing(@RequestBody BookDto.View viewBook,
                                            @PathVariable("book_id") @Positive long bookId) {
//        Book book = bookMapper.bookViewToBook(viewBook);
        Book viewedBook = bookService.updateView(bookId);
        BookDto.Response response = bookMapper.bookToBookResponse(viewedBook);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }
}
