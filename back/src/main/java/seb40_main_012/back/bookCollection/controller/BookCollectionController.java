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
import seb40_main_012.back.bookCollection.repository.BookCollectionRepository;
import seb40_main_012.back.bookCollection.service.BookCollectionService;
import seb40_main_012.back.common.bookmark.BookmarkService;
import seb40_main_012.back.dto.ListResponseDto;
import seb40_main_012.back.dto.MultiResponseDto;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.service.UserService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequestMapping("/api/collections")
@RestController
@RequiredArgsConstructor
public class BookCollectionController {

    private final BookCollectionService collectionService;
    private final UserService userService;
    private final BookService bookService;
    private final BookInfoSearchService bookInfoSearchService;
    private final BookmarkService bookmarkService;
    private final BookCollectionRepository collectionRepository;

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public BookCollectionDto.Response postCollection(
//            @RequestHeader("Authorization") Long userId,
            @RequestBody BookCollectionDto.Post request) {
        BookCollection collection = collectionService.postCollection(request.toEntity(), request.getTags());
        return BookCollectionDto.Response.of(collection);
    }

    @PatchMapping("/edit/{collection-id}")
    @ResponseStatus(HttpStatus.OK)
    public BookCollectionDto.Response patchCollection(
//            @RequestHeader("Authorization") Long userId,
            @PathVariable("collection-id") Long collectionId, @RequestBody BookCollectionDto.Post request) {
        BookCollection collection = collectionService.patchCollection(collectionId, request.toEntity(), request.getTags());
        return BookCollectionDto.Response.of(collection);
    }

    @GetMapping("/{collection-id}")
    @ResponseStatus(HttpStatus.OK)
    public BookCollectionDto.CollectionDetails getCollection(
//            @RequestHeader("Authorization") Long userId,
            @PathVariable("collection-id") Long collectionId) {
        BookCollection collection = collectionService.getCollection(collectionId);
        List<String> isbns = collection.getBookIsbn13();
        List<BookInfoSearchDto.CollectionBook> books = new ArrayList<>();
        isbns.forEach(
                x -> books.add(bookInfoSearchService.collectionBookSearch(x))
        );

        return BookCollectionDto.CollectionDetails.of(collection, books);
    }


    @DeleteMapping("/{collection-id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCollection(
//            @RequestHeader("Authorization") Long userId,
            @PathVariable("collection-id") Long collectionId) {
        collectionService.deleteCollection(collectionId);
    }

    @PostMapping("/{collection-id}/like")
    @ResponseStatus(HttpStatus.OK)
    public boolean likeCollection(
//            @RequestHeader("Authorization") Long userId,
            @PathVariable("collection-id") Long collectionId) {
        return collectionService.likeCollection(collectionId);
    }

    @PostMapping("/{collection-id}/bookmark")
    @ResponseStatus(HttpStatus.OK)
    public boolean bookmarkCollection(
//            @RequestHeader("Authorization") Long userId,
            @PathVariable("collection-id") Long collectionId) {
        return bookmarkService.bookmarkCollection(collectionId);
    }


    @GetMapping("/userCollection")
    @ResponseStatus(HttpStatus.OK)
    public ListResponseDto<BookCollectionDto.UserCollection> getUserBookCollection(
//            @RequestHeader("Authorization") Long userId
    ) {
        User findUser = userService.getLoginUser();
        Long userId = findUser.getUserId();
        List<BookCollection> collections = userService.getUserCollection(userId);
        List<BookCollectionDto.UserCollection> collectionDto = collections.stream().map(x -> BookCollectionDto.UserCollection.of(x)).collect(Collectors.toList());
        Long listCount = collectionRepository.countByUserUserId(userId);
        return new ListResponseDto<>(listCount, collectionDto);
    }


    @GetMapping("/category")
    @ResponseStatus(HttpStatus.OK)

    public ListResponseDto<BookCollectionDto.TagCollection> getCollectionByUserCategory(
//            @RequestHeader("Authorization") Long userId
    ) {
        User findUser = userService.getLoginUser();
        Long userId = findUser.getUserId();
        List<BookCollection> collections = collectionService.findCollectionByCollectionTag();

        List<BookCollectionDto.TagCollection> tagCollectionDto = collections.stream().map(x -> BookCollectionDto.TagCollection.of(x)).collect(Collectors.toList());
        return new ListResponseDto<>(tagCollectionDto);
    }

    @GetMapping("/tag")
    @ResponseStatus(HttpStatus.OK)
    public ListResponseDto<BookCollectionDto.TagCollection> getCollectionByCollectionTag(
//            @RequestHeader("Authorization") Long userId
    ) {
        List<BookCollection> collections = collectionService.findCollectionByCollectionTag();
        List<BookCollectionDto.TagCollection> tagCollectionDto = collections.stream().map(x -> BookCollectionDto.TagCollection.of(x)).collect(Collectors.toList());
        return new ListResponseDto<>(tagCollectionDto);
    }

//    @GetMapping("/author")
//    @ResponseStatus(HttpStatus.OK)
//
////    이게 맞냐고
//    public BookCollectionDto.AuthorCollection getCollectionByAuthor(
////            @RequestHeader("Authorization") Long userId
//    ) {
//        BookCollection collection = collectionService.findCollectionByAuthor();
//        List<String> isbns = collection.getBookIsbn13();
//        List<BookInfoSearchDto.MainCollectionBook> books = new ArrayList<>();
//        isbns.forEach(
//                x -> books.add(bookInfoSearchService.MainCollectionBookSearch(x))
//        );
//        return BookCollectionDto.AuthorCollection.of(collection, books);
//
//    public BookCollectionDto.AuthorCollection getCollectionByAuthor() {
//        BookCollection collection = collectionService.findCollectionByAuthor();
//        return BookCollectionDto.AuthorCollection.of(collection);
//    }
//
//    @GetMapping("/critic")
//    @ResponseStatus(HttpStatus.OK)
//    //이게 맞냐고
//    public BookCollectionDto.CriticCollection getCollectionByCritic() {
//        BookCollection collection = collectionService.findCollectionByCritic();
//        return BookCollectionDto.CriticCollection.of(collection);
//
//    }

}
