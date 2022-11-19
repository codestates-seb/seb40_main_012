package seb40_main_012.back.bookCollection.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import seb40_main_012.back.book.BookService;
import seb40_main_012.back.book.bookInfoSearchAPI.BookInfoSearchDto;
import seb40_main_012.back.book.bookInfoSearchAPI.BookInfoSearchService;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.bookCollection.dto.BookCollectionDto;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.bookCollection.service.BookCollectionService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequestMapping("/api/collections")
@RestController
@RequiredArgsConstructor
public class BookCollectionController {

    private final BookCollectionService collectionService;
    private final BookService bookService;
    private final BookInfoSearchService bookInfoSearchService;

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public BookCollectionDto.Response postCollection(@RequestHeader("Authorization") Long userId, @RequestBody BookCollectionDto.Post request) {
        BookCollection collection = collectionService.postCollection(userId, request.toEntity(), request.getTags());
        return BookCollectionDto.Response.of(collection);
    }

    @PatchMapping("/edit/{collection-id}")
    @ResponseStatus(HttpStatus.OK)
    public BookCollectionDto.Response patchCollection(@RequestHeader("Authorization") Long userId,@PathVariable("collection-id")Long collectionId, @RequestBody BookCollectionDto.Post request) {
        BookCollection collection = collectionService.patchCollection(userId,collectionId, request.toEntity(), request.getTags());
        return BookCollectionDto.Response.of(collection);
    }

    @GetMapping("/{collection-id}")
    @ResponseStatus(HttpStatus.OK)
    public BookCollectionDto.CollectionDetails getCollection(@RequestHeader("Authorization") Long userId, @PathVariable("collection-id")Long collectionId) {
        BookCollection collection = collectionService.getCollection(collectionId);
        List<String> isbns = collection.getIsbn13();
        List<BookInfoSearchDto.CollectionBook> books = new ArrayList<>();
        isbns.forEach(
               x -> books.add(bookInfoSearchService.collectionBookSearch(x))
        );

        return BookCollectionDto.CollectionDetails.of(collection,books);
    }


    @DeleteMapping("/{collection-id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCollection(@RequestHeader("Authorization") Long userId, @PathVariable("collection-id") Long collectionId) {
        collectionService.deleteCollection(collectionId);
    }

    @PostMapping("/{collection-id}/like")
    @ResponseStatus(HttpStatus.OK)
    public boolean likeCollection(@RequestHeader("Authorization") Long userId, @PathVariable("collection-id") Long collectionId){
        return collectionService.likeCollection(userId,collectionId);
    }

    @PostMapping("/{collection-id}/bookmark")
    @ResponseStatus(HttpStatus.OK)
    public boolean bookmarkCollection(@RequestHeader("Authorization") Long userId, @PathVariable("collection-id") Long collectionId){
        return collectionService.bookmarkCollection(userId,collectionId);
    }

//    @GetMapping
//    @ResponseStatus(HttpStatus.OK)
//    public BookCollectionDto getCollectionByUserCategory(@RequestHeader("Authorization") Long userId) {
//        BookCollection collection = collectionService.getCollectionByUserCategory();
//        return ;
//    }

}
