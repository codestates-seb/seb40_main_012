package seb40_main_012.back.book.bookInfoSearchAPI;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import seb40_main_012.back.book.BookRepository;

import java.net.URI;
import java.nio.charset.StandardCharsets;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BookInfoSearchService {

    private final BookRepository bookRepository;

    @Value("${aladin.ttb}")
    private String ttbkey;

    @Value("${aladin.url")
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

}
