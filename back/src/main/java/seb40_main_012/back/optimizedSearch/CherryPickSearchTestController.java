package seb40_main_012.back.optimizedSearch;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import seb40_main_012.back.book.bookInfoSearchAPI.BookInfoSearchDto;

import java.util.List;
import java.util.Locale;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/search")
public class CherryPickSearchTestController {

    private final CherryPickSearchService cherryPickSearchService;

    @GetMapping("/test")
    public ResponseEntity getCollectionBooksSearchRequests(
            @RequestParam("Query") String queryParam
    ) {

        List<BookInfoSearchDto.BookList.Item> result = cherryPickSearchService.cherryPickSearchForBooks(queryParam.toLowerCase(Locale.ROOT), "Accuracy", 1, 50);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
