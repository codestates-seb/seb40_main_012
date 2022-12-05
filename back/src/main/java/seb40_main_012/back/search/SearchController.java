package seb40_main_012.back.search;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import seb40_main_012.back.book.bookInfoSearchAPI.BookInfoSearchDto;
import seb40_main_012.back.book.bookInfoSearchAPI.BookInfoSearchService;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.optimizedSearch.CherryPickSearchService;
import seb40_main_012.back.pairing.entity.Pairing;

import javax.validation.Valid;
import java.util.*;
import java.util.stream.Collectors;

@Validated
@Transactional
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/search")
public class SearchController {

    private final BookInfoSearchService bookInfoSearchService;
    private final CherryPickSearchService cherryPickSearchService;
    private final SearchMapper searchMapper;
    private final SearchService searchService;

    @GetMapping
    public ResponseEntity getSearchRequests(
            @RequestParam("Category") @Valid @Nullable String category,
            @RequestParam("Query") @Valid String queryParam,
            @RequestParam("Sort") @Valid @Nullable String sort
//            @RequestParam("Page") @Valid @Nullable Integer page,
//            @RequestParam("Size") @Valid @Nullable Integer size
    ) {

//        BookInfoSearchDto.BookList bookResult = bookInfoSearchService.listSearch(queryParam.toLowerCase(Locale.ROOT), sort, page, size);
        List<Pairing> pairingsResult = searchService.findAllPairingByQuery(queryParam.toLowerCase(), 1, 100);
        List<BookCollection> collectionsResult = searchService.findAllBookCollectionsByQuery(queryParam.toLowerCase(), 1, 100);
//        List<BookCollection> collectionsResult = searchMapper.bookCollectionsSearchToBookCollections(result).stream().distinct().collect(Collectors.toList());

        if (category.equals("books") && sort.equals("accuracy")) {

            List<BookInfoSearchDto.BookList.Item> bookResult = bookInfoSearchService.cherryPickSearch(queryParam, "Accuracy");
//            List<BookInfoSearchDto.BookList.Item> bookResult = cherryPickSearchService.cherryPickSearchForBooks(queryParam, "Accuracy");
//            BookInfoSearchDto.BookList bookResult = bookInfoSearchService.listSearch(queryParam.toLowerCase(Locale.ROOT), "Accuracy", page, size);
//            SliceImpl<BookInfoSearchDto.BookList.Item> bookSlice = new SliceImpl<>(bookResult.getItem());
//            return new ResponseEntity<>(bookSlice, HttpStatus.OK);
//            List<BookInfoSearchDto.BookList.Item> bookPage = new ArrayList<>(bookResult.getItem());
            return new ResponseEntity<>(bookResult, HttpStatus.OK);

        } else if (category.equals("books") && sort.equals("title")) {

            List<BookInfoSearchDto.BookList.Item> bookResult = bookInfoSearchService.cherryPickSearch(queryParam, "Title");
//            List<BookInfoSearchDto.BookList.Item> bookResult = cherryPickSearchService.cherryPickSearchForBooks(queryParam, "Title");
//            BookInfoSearchDto.BookList bookResult = bookInfoSearchService.listSearch(queryParam.toLowerCase(Locale.ROOT), "Title", page, size);
//            List<BookInfoSearchDto.BookList.Item> bookPage = new ArrayList<>(bookResult.getItem());
            return new ResponseEntity<>(bookResult, HttpStatus.OK);

        } else if (category.equals("books") && sort.equals("new")) {

            List<BookInfoSearchDto.BookList.Item> bookResult = bookInfoSearchService.cherryPickSearch(queryParam, "PublishTime");
//            List<BookInfoSearchDto.BookList.Item> bookResult = cherryPickSearchService.cherryPickSearchForBooks(queryParam, "PublishTime");
//            BookInfoSearchDto.BookList bookResult = bookInfoSearchService.listSearch(queryParam.toLowerCase(Locale.ROOT), "PublishTime", page, size);
//            List<BookInfoSearchDto.BookList.Item> bookPage = new ArrayList<>(bookResult.getItem());
            return new ResponseEntity<>(bookResult, HttpStatus.OK);


        } else if (category.equals("pairings") && sort == null) { // 페어링 기본 - 좋아요

//            SliceImpl<Pairing> pairingSliceLikeCount =
//                    new SliceImpl<>(pairingsResult.stream().sorted(Comparator.comparing(Pairing::getLikeCount).reversed()).collect(Collectors.toList()));
//            return new ResponseEntity<>(pairingSliceLikeCount, HttpStatus.OK);
            List<Pairing> pairingPageLikeCount =
                    pairingsResult.stream().sorted(Comparator.comparing(Pairing::getLikeCount).reversed()).collect(Collectors.toList());
            return new ResponseEntity<>(pairingPageLikeCount, HttpStatus.OK);

        } else if (category.equals("pairings") && sort.equals("new")) { // 페어링 - 작성일 순

//            SliceImpl<Pairing> pairingSliceCreatedAt =
//                    new SliceImpl<>(pairingsResult.stream().sorted(Comparator.comparing(Pairing::getCreatedAt).reversed()).collect(Collectors.toList()));
//            return new ResponseEntity<>(pairingSliceCreatedAt, HttpStatus.OK);
            List<Pairing> pairingPageCreatedAt =
                    new ArrayList<>(pairingsResult.stream().sorted(Comparator.comparing(Pairing::getCreatedAt).reversed()).collect(Collectors.toList()));
            return new ResponseEntity<>(pairingPageCreatedAt, HttpStatus.OK);

        } else if (category.equals("pairings") && sort.equals("view")) { // 페어링 - 조회순

//            SliceImpl<Pairing> pairingSliceView =
//                    new SliceImpl<>(pairingsResult.stream().sorted(Comparator.comparing(Pairing::getView).reversed()).collect(Collectors.toList()));
//            return new ResponseEntity<>(pairingSliceView, HttpStatus.OK);
            List<Pairing> pairingPageView =
                    new ArrayList<>(pairingsResult.stream().sorted(Comparator.comparing(Pairing::getView).reversed()).collect(Collectors.toList()));
            return new ResponseEntity<>(pairingPageView, HttpStatus.OK);

        } else if (category.equals("collections") && sort == null) {

            List<BookCollection> collectionPageLikeCount =
                    new ArrayList<>(collectionsResult.stream().distinct().sorted(Comparator.comparing(BookCollection::getLikeCount).reversed()).collect(Collectors.toList()));
            return new ResponseEntity<>(collectionPageLikeCount, HttpStatus.OK);

        } else if (category.equals("collections") && sort.equals("new")) {

            List<BookCollection> collectionPageNew =
                    new ArrayList<>(collectionsResult.stream().distinct().sorted(Comparator.comparing(BookCollection::getCreatedAt).reversed()).collect(Collectors.toList()));

            return new ResponseEntity<>(collectionPageNew, HttpStatus.OK);

        } else if (category.equals("collections") && sort.equals("view")) {

            List<BookCollection> collectionPageView =
                    new ArrayList<>(collectionsResult.stream().distinct().sorted(Comparator.comparing(BookCollection::getView).reversed()).collect(Collectors.toList()));

            return new ResponseEntity<>(collectionPageView, HttpStatus.OK);

        } else {
            return new ResponseEntity(null, HttpStatus.BAD_GATEWAY);
        }
    }

    @GetMapping("/collectionbooks")
    public ResponseEntity getCollectionBooksSearchRequests(
            @RequestParam("Query") String queryParam
//            @RequestParam("Page") Integer page
    ) {

//        List<BookInfoSearchDto.BookList.Item> result = cherryPickSearchService.cherryPickSearchForBooks(queryParam.toLowerCase(Locale.ROOT), "Accuracy");
        List<BookInfoSearchDto.BookList.Item> result = bookInfoSearchService.cherryPickSearch(queryParam.toLowerCase(Locale.ROOT), "Accuracy");

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    public static <T> List<T> makePageable(List<T> sourceList, int page, int pageSize) {
        if (pageSize <= 0 || page <= 0) {
            throw new IllegalArgumentException("invalid page size: " + pageSize);
        }

        int fromIndex = (page - 1) * pageSize;
        if (sourceList == null || sourceList.size() <= fromIndex) {
            return Collections.emptyList();
        }

        // toIndex exclusive
        return sourceList.subList(fromIndex, Math.min(fromIndex + pageSize, sourceList.size()));
    }
}



