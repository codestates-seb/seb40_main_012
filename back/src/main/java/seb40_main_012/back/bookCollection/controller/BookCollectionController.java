package seb40_main_012.back.bookCollection.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import seb40_main_012.back.bookCollection.dto.BookCollectionDto;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.bookCollection.service.BookCollectionService;

@RequestMapping("/api/collections")
@RestController
@RequiredArgsConstructor
public class BookCollectionController {

    private final BookCollectionService collectionService;

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public BookCollectionDto.Response postCollection(@RequestHeader("Authorization") Long userId, @RequestBody BookCollectionDto.Post request) {
        BookCollection collection = collectionService.postCollection(userId, request.toEntity(), request.getTags(), request.getBookIsbns());
        return BookCollectionDto.Response.of(collection);
    }

    @GetMapping("/{collection-id}")
    @ResponseStatus(HttpStatus.OK)
    public BookCollectionDto.Response getCollection(@RequestHeader("Authorization") Long userId, @PathVariable("collection-id")Long collectionId) {
        BookCollection collection = collectionService.getCollection(collectionId);
        return BookCollectionDto.Response.of(collection);
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

}
