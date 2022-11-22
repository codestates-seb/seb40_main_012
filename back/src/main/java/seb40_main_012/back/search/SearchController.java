package seb40_main_012.back.search;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.SliceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import seb40_main_012.back.book.bookInfoSearchAPI.BookInfoSearchDto;
import seb40_main_012.back.book.bookInfoSearchAPI.BookInfoSearchService;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.pairing.entity.Pairing;

import javax.validation.Valid;
import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/search")
public class SearchController {

    private final BookInfoSearchService bookInfoSearchService;
    private final SearchService searchService;

    @GetMapping
    public ResponseEntity getSearchRequests(
            @RequestParam("Category") @Valid @Nullable String category,
            @RequestParam("Query") @Valid String queryParam,
            @RequestParam("Sort") @Valid @Nullable String sort
    ) {

        BookInfoSearchDto.BookList bookResult = bookInfoSearchService.listSearch(queryParam);
        List<Pairing> pairingsResult = searchService.findAllPairingByQuery(queryParam);
        List<BookCollection> collectionsResult = searchService.findAllBookCollectionsByQuery(queryParam);
        SliceImpl<Pairing> pairingSlice = new SliceImpl<>(pairingsResult);


        if (category.equals("books")) {
            SliceImpl<BookInfoSearchDto.BookList.Item> bookSlice = new SliceImpl<>(bookResult.getItem());
            return new ResponseEntity<>(bookSlice, HttpStatus.OK);

        } else if (category.equals("pairings") && sort == null) { // 페어링 기본 - 좋아요

            SliceImpl<Pairing> pairingSliceLikeCount =
                    new SliceImpl<>(pairingsResult.stream().sorted(Comparator.comparing(Pairing::getLikeCount).reversed()).collect(Collectors.toList()));

            return new ResponseEntity<>(pairingSliceLikeCount, HttpStatus.OK);

        } else if (category.equals("pairings") && sort.equals("new")) { // 페어링 - 작성일 순

            SliceImpl<Pairing> pairingSliceCreatedAt =
                    new SliceImpl<>(pairingsResult.stream().sorted(Comparator.comparing(Pairing::getCreatedAt).reversed()).collect(Collectors.toList()));

            return new ResponseEntity<>(pairingSliceCreatedAt, HttpStatus.OK);

        } else if (category.equals("pairings") && sort.equals("view")) { // 페어링 - 조회순

            SliceImpl<Pairing> pairingSliceView =
                    new SliceImpl<>(pairingsResult.stream().sorted(Comparator.comparing(Pairing::getView).reversed()).collect(Collectors.toList()));

            return new ResponseEntity<>(pairingSliceView, HttpStatus.OK);

        } else if (category.equals("collections") && sort == null) {

            SliceImpl<BookCollection> collectionSliceLikeCount =
                    new SliceImpl<>(collectionsResult.stream().sorted(Comparator.comparing(BookCollection::getLikeCount).reversed()).collect(Collectors.toList()));

            return new ResponseEntity<>(collectionSliceLikeCount, HttpStatus.OK);

        } else if (category.equals("collections") && sort.equals("new")) {

            SliceImpl<BookCollection> collectionSliceNew =
                    new SliceImpl<>(collectionsResult.stream().sorted(Comparator.comparing(BookCollection::getCreatedAt).reversed()).collect(Collectors.toList()));

            return new ResponseEntity<>(collectionSliceNew, HttpStatus.OK);

        } else if (category.equals("collections") && sort.equals("view")) {

            SliceImpl<BookCollection> collectionSliceView =
                    new SliceImpl<>(collectionsResult.stream().sorted(Comparator.comparing(BookCollection::getView).reversed()).collect(Collectors.toList()));

            return new ResponseEntity<>(collectionSliceView, HttpStatus.OK);

        } else {
            return new ResponseEntity(null, HttpStatus.BAD_GATEWAY);
        }
    }

//    @GetMapping
//    public ResponseEntity getBookSearchRequests(@RequestParam("Query") @Valid String queryParam) {
//
//        BookInfoSearchDto.BookList result = bookInfoSearchService.listSearch(queryParam);
//
//        return new ResponseEntity<>(result, HttpStatus.OK);
//    }

//    @GetMapping("/pairing")
//    public ResponseEntity getPairingSearchRequests(
//            @RequestParam("Category") @Valid String category,
//            @RequestParam("Query") @Valid String queryParam
//    ) {
//
//        List<Pairing> result = searchService.findAllPairingByQuery(queryParam);
//
//        return new ResponseEntity<>(result, HttpStatus.OK);
//    }
//
//    @GetMapping("/collection")
//    public ResponseEntity getCollectionSearchRequests(
//            @RequestParam("Query") @Valid String queryParam
//    ) {
//
//        List<BookCollection> result = searchService.findAllBookCollectionsByQuery(queryParam);
//
//        return new ResponseEntity<>(result, HttpStatus.OK);
//    }
}
