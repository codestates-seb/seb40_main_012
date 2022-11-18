package seb40_main_012.back.book.bookInfoSearchAPI;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/search/books")
public class BookInfoSearchController {

    private final BookInfoSearchService bookInfoService;

    @GetMapping
    public ResponseEntity listSearch(@RequestParam String title) {

        log.info("[Request] Book List Search");

        return new ResponseEntity<>(bookInfoService.listSearch(title), HttpStatus.OK);
    }

    @GetMapping("/info")
    public ResponseEntity bookSearch(@RequestParam String isbn13) {

        log.info("[Request] Book Information Search");

        BookInfoSearchDto.BookInfo response = bookInfoService.bookSearch(isbn13);

        System.out.println(response.getItem().get(0).categoryName);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
