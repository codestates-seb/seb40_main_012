package seb40_main_012.back.optimizedSearch;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import seb40_main_012.back.book.bookInfoSearchAPI.BookInfoSearchDto;
import seb40_main_012.back.book.bookInfoSearchAPI.BookInfoSearchService;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@Transactional
@RequiredArgsConstructor
public class CherryPickSearchService {

    private final BookInfoSearchService bookInfoSearchService;

    @Value("${aladin.ttb}")
    private String ttbkey;

    @Value("${aladin.url}")
    private String pageUrl;
    private final String getItemLookUpUrl = "http://www.aladin.co.kr/ttb/api/ItemSearch.aspx";
    private final String itemLookUpUrl = "http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx";

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

        BookInfoSearchDto.BookList totalResult1 = bookInfoSearchService.listSearch(title.toLowerCase(Locale.ROOT), "Accuracy", 1, 25);
        BookInfoSearchDto.BookList totalResult2 = bookInfoSearchService.listSearch(title.toLowerCase(Locale.ROOT), "Accuracy", 2, 25);
        BookInfoSearchDto.BookList totalResult3 = bookInfoSearchService.listSearch(title.toLowerCase(Locale.ROOT), "Accuracy", 3, 25);
        BookInfoSearchDto.BookList totalResult4 = bookInfoSearchService.listSearch(title.toLowerCase(Locale.ROOT), "Accuracy", 4, 25);

        List<BookInfoSearchDto.BookList.Item> result2 = Stream.concat(
                        (Stream.concat(totalResult1.getItem().stream().filter(a -> a.isbn13 != ""),
                                totalResult2.getItem().stream().filter(a -> a.isbn13 != ""))),
                        (Stream.concat(totalResult3.getItem().stream().filter(a -> a.isbn13 != ""),
                                totalResult4.getItem().stream().filter(a -> a.isbn13 != "")))
                )

                .distinct().collect(Collectors.toList());


        return result2;
    }
}
