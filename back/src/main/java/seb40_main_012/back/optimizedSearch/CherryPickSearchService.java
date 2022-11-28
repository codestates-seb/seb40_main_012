package seb40_main_012.back.optimizedSearch;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.concurrent.ListenableFuture;
import seb40_main_012.back.advice.BusinessLogicException;
import seb40_main_012.back.book.bookInfoSearchAPI.BookInfoSearchDto;
import seb40_main_012.back.book.bookInfoSearchAPI.BookInfoSearchService;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@Transactional
@RequiredArgsConstructor
public class CherryPickSearchService {

    private final BookInfoSearchService bookInfoSearchService;

    public List<BookInfoSearchDto.BookList.Item> cherryPickSearchForCollection(String title, String sort, Integer page, Integer size) {

        List<ListenableFuture<BookInfoSearchDto.BookList>> resultList = new ArrayList<>();

        for (int i = 0; i < 5; i++) {
            ListenableFuture<BookInfoSearchDto.BookList> totalResult =
                    bookInfoSearchService.cherryPickSearchForAsync(title.toLowerCase(Locale.ROOT), "Accuracy", i, 20);

            resultList.add(totalResult);
        }

        for (ListenableFuture<BookInfoSearchDto.BookList> totalResult : resultList) {
            try {
                assert totalResult.isDone();
            } catch (BusinessLogicException e) {
                e.printStackTrace();
            }
        }

        List<BookInfoSearchDto.BookList.Item> result =
        resultList.stream()
                .flatMap(a -> {
                    try {
                        return Stream.of(a.get());
                    } catch (ExecutionException e) {
                        throw new RuntimeException(e);
                    } catch (InterruptedException e) {
                        throw new RuntimeException(e);
                    }
                })
                .map(BookInfoSearchDto.BookList::getItem)
                .flatMap(Collection::stream)
                .filter(c -> c.isbn13 != "")
                .distinct()
                .collect(Collectors.toList());

        return result;
    }
}
