package seb40_main_012.back.search;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import seb40_main_012.back.book.bookInfoSearchAPI.BookInfoSearchDto;
import seb40_main_012.back.book.bookInfoSearchAPI.BookInfoSearchService;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.pairing.entity.Pairing;

import javax.validation.Valid;
import java.util.List;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/search")
public class SearchController {

    private final BookInfoSearchService bookInfoSearchService;
    private final SearchService searchService;

    @GetMapping
    public ResponseEntity getBookSearchRequests(@RequestParam("Query") @Valid String queryParam) {

        BookInfoSearchDto.BookList result = bookInfoSearchService.listSearch(queryParam);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/pairing")
    public ResponseEntity getPairingSearchRequests(@RequestParam("Query") @Valid String queryParam) {

        List<Pairing> result = searchService.findAllPairingByQuery(queryParam);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/collection")
    public ResponseEntity getCollectionSearchRequests(@RequestParam("Query") @Valid String queryParam) {

        List<BookCollection> result = searchService.findAllBookCollectionsByQuery(queryParam);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
