package seb40_main_012.back.book.bookInfoSearchAPI;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import seb40_main_012.back.book.BookRepository;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@EnableAsync
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BookInfoSearchService {

    private final BookRepository bookRepository;

    @Value("${aladin.ttb}")
    private String ttbkey;

    @Value("${aladin.url}")
    private String pageUrl;
    private final String getItemLookUpUrl = "http://www.aladin.co.kr/ttb/api/ItemSearch.aspx";
    private final String itemLookUpUrl = "http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx";
    public BookInfoSearchDto.BookList listSearch(String title, String sort, Integer page, Integer size) {

        RestTemplate restTemplate = new RestTemplate();

        URI targetUrl = UriComponentsBuilder
                .fromUriString(getItemLookUpUrl)
                .queryParam("ttbkey", ttbkey)
                .queryParam("Query", title)
                .queryParam("QueryType", "Keyword")
                .queryParam("MaxResults", size)
                .queryParam("start", page)
                .queryParam("SearchTarget", "Book")
                .queryParam("output", "JS")
                .queryParam("Version", 20131101)
                .queryParam("Sort", sort)
                .build()
                .encode(StandardCharsets.UTF_8)
                .toUri();

        return restTemplate.getForObject(targetUrl, BookInfoSearchDto.BookList.class);
    }

    public BookInfoSearchDto.BookInfo bookSearch(String isbn13) {

        RestTemplate restTemplate = new RestTemplate();

        URI targetUrl = UriComponentsBuilder
                .fromUriString(itemLookUpUrl)
                .queryParam("ttbkey", ttbkey)
                .queryParam("itemIdType", "ISBN13")
                .queryParam("ItemId", isbn13)
                .queryParam("Cover", "Big")
                .queryParam("Version", 20131101)
                .queryParam("output", "JS")
                .build()
                .encode(StandardCharsets.UTF_8)
                .toUri();

        return restTemplate.getForObject(targetUrl, BookInfoSearchDto.BookInfo.class);
    }

    public BookInfoSearchDto.CollectionBook collectionBookSearch(String isbn13) {

        RestTemplate restTemplate = new RestTemplate();

        URI targetUrl = UriComponentsBuilder
                .fromUriString(itemLookUpUrl)
                .queryParam("ttbkey", ttbkey)
                .queryParam("itemIdType", "ISBN13")
                .queryParam("ItemId", isbn13)
                .queryParam("Cover", "Big")
                .queryParam("Version", 20131101)
                .queryParam("output", "JS")
                .build()
                .encode(StandardCharsets.UTF_8)
                .toUri();

        return restTemplate.getForObject(targetUrl, BookInfoSearchDto.CollectionBook.class);
    }

    public BookInfoSearchDto.MainCollectionBook MainCollectionBookSearch(String isbn13) {

        RestTemplate restTemplate = new RestTemplate();

        URI targetUrl = UriComponentsBuilder
                .fromUriString(itemLookUpUrl)
                .queryParam("ttbkey", ttbkey)
                .queryParam("itemIdType", "ISBN13")
                .queryParam("ItemId", isbn13)
                .queryParam("Cover", "Big")
                .queryParam("Version", 20131101)
                .queryParam("output", "JS")
                .build()
                .encode(StandardCharsets.UTF_8)
                .toUri();

        return restTemplate.getForObject(targetUrl, BookInfoSearchDto.MainCollectionBook.class);
    }

    public List<BookInfoSearchDto.BookList.Item> cherryPickSearch(String title, String sort, Integer page, Integer size) {

        RestTemplate restTemplate = new RestTemplate();

        URI targetUrl = UriComponentsBuilder
                .fromUriString(getItemLookUpUrl)
                .queryParam("ttbkey", ttbkey)
                .queryParam("Query", title)
                .queryParam("QueryType", "Keyword")
                .queryParam("MaxResults", 1)
                .queryParam("start", 1)
                .queryParam("SearchTarget", "Book")
                .queryParam("output", "JS")
                .queryParam("Version", 20131101)
                .queryParam("Sort", sort)
                .build()
                .encode(StandardCharsets.UTF_8)
                .toUri();

//        BookInfoSearchDto.BookList list1 = restTemplate.getForObject(targetUrl, BookInfoSearchDto.BookList.class);
//
//        long list1Size = list1.getTotalResults();

//        if (0 <= list1Size && list1Size <= 50) {

//            BookInfoSearchDto.BookList totalResult1 = listSearch(title.toLowerCase(Locale.ROOT), "Accuracy", 1, 50);
//
//            List<BookInfoSearchDto.BookList.Item> result1 = totalResult1.getItem().stream().filter(book -> book.isbn13 != "").distinct().collect(Collectors.toList());

//            List<BookInfoSearchDto.BookList.Item> pageResult1 = makePageable(result1, page, size);

//            return result1;
//            return pageResult1;

//        } else
////            if (51 <= list1Size && list1Size <= 100)
//            {
//
        BookInfoSearchDto.BookList totalResult1 = listSearch(title.toLowerCase(Locale.ROOT), "Accuracy", 1, 25);
        BookInfoSearchDto.BookList totalResult2 = listSearch(title.toLowerCase(Locale.ROOT), "Accuracy", 2, 25);
        BookInfoSearchDto.BookList totalResult3 = listSearch(title.toLowerCase(Locale.ROOT), "Accuracy", 3, 25);
        BookInfoSearchDto.BookList totalResult4 = listSearch(title.toLowerCase(Locale.ROOT), "Accuracy", 4, 25);

        List<BookInfoSearchDto.BookList.Item> result2 = Stream.concat(
                (Stream.concat(totalResult1.getItem().stream().filter(a -> a.isbn13 != ""),
                                totalResult2.getItem().stream().filter(a -> a.isbn13 != ""))),
                (Stream.concat(totalResult3.getItem().stream().filter(a -> a.isbn13 != ""),
                                totalResult4.getItem().stream().filter(a -> a.isbn13 != "")))
                )

                        .distinct().collect(Collectors.toList());

//        BookInfoSearchDto.BookList totalResult1 = listSearch(title.toLowerCase(Locale.ROOT), "Accuracy", 1, 50);
//        BookInfoSearchDto.BookList totalResult2 = listSearch(title.toLowerCase(Locale.ROOT), "Accuracy", 2, 50);
//
//        List<BookInfoSearchDto.BookList.Item> result2 = Stream.concat(totalResult1.getItem().stream().filter(a -> a.isbn13 != ""),
//                totalResult2.getItem().stream().filter(a -> a.isbn13 != "")).distinct().collect(Collectors.toList());

//            List<BookInfoSearchDto.BookList.Item> pageResult2 = makePageable(result2, page, size);

        return result2;
//        }

//        else if (101 <= list1Size && list1Size <= 150) {
//
//            BookInfoSearchDto.BookList totalResult1 = listSearch(title.toLowerCase(Locale.ROOT), "Accuracy", 1, 50);
//            BookInfoSearchDto.BookList totalResult2 = listSearch(title.toLowerCase(Locale.ROOT), "Accuracy", 2, 50);
//            BookInfoSearchDto.BookList totalResult3 = listSearch(title.toLowerCase(Locale.ROOT), "Accuracy", 3, 50);
//
//            List<BookInfoSearchDto.BookList.Item> result3 = Stream
//                    .concat((Stream.concat(totalResult1.getItem().stream().filter(a -> a.isbn13 != ""),
//                                    totalResult2.getItem().stream().filter(a -> a.isbn13 != ""))),
//                            totalResult3.getItem().stream().filter(a -> a.isbn13 != "")).distinct().collect(Collectors.toList());
//
//            List<BookInfoSearchDto.BookList.Item> pageResult3 = makePageable(result3, page, size);
//
//            return pageResult3;
//        } else {
//
//            BookInfoSearchDto.BookList totalResult1 = listSearch(title.toLowerCase(Locale.ROOT), "Accuracy", 1, 50);
//            BookInfoSearchDto.BookList totalResult2 = listSearch(title.toLowerCase(Locale.ROOT), "Accuracy", 2, 50);
//            BookInfoSearchDto.BookList totalResult3 = listSearch(title.toLowerCase(Locale.ROOT), "Accuracy", 3, 50);
//            BookInfoSearchDto.BookList totalResult4 = listSearch(title.toLowerCase(Locale.ROOT), "Accuracy", 4, 50);
//
//            List<BookInfoSearchDto.BookList.Item> result4 = Stream
//                    .concat((Stream.concat(totalResult1.getItem().stream().filter(a -> a.isbn13 != ""),
//                                    totalResult2.getItem().stream().filter(a -> a.isbn13 != ""))),
//                            Stream.concat((totalResult3.getItem().stream().filter(a -> a.isbn13 != "")),
//                                    totalResult4.getItem().stream().filter(a -> a.isbn13 != ""))).distinct().collect(Collectors.toList());
//
//            List<BookInfoSearchDto.BookList.Item> pageResult4 = makePageable(result4, page, size);
//
//            return pageResult4;
//        }
    }

    @Async
    public BookInfoSearchDto.BookList cherryPickSearchForAsync(String title, String sort, Integer page, Integer size) {

        String ttbkey = "ttbgcnb871441001";

        final String getItemLookUpUrl = "http://www.aladin.co.kr/ttb/api/ItemSearch.aspx";

        RestTemplate restTemplate = new RestTemplate();

        URI targetUrl = UriComponentsBuilder
                .fromUriString(getItemLookUpUrl)
                .queryParam("ttbkey", ttbkey)
                .queryParam("Query", title)
                .queryParam("QueryType", "Keyword")
                .queryParam("MaxResults", size)
                .queryParam("start", page)
                .queryParam("SearchTarget", "Book")
                .queryParam("output", "JS")
                .queryParam("Version", 20131101)
                .queryParam("Sort", sort)
                .build()
                .encode(StandardCharsets.UTF_8)
                .toUri();
        try {
            BookInfoSearchDto.BookList result = restTemplate.getForObject(targetUrl, BookInfoSearchDto.BookList.class);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return restTemplate.getForObject(targetUrl, BookInfoSearchDto.BookList.class);
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
