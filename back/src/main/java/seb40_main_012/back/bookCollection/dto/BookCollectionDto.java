package seb40_main_012.back.bookCollection.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.pairing.PairingDto;
import seb40_main_012.back.pairing.entity.Pairing;

@Getter
public class BookCollectionDto {

    @Builder
    public static class PostDto{}
    @Builder
    public static class ResponseDto{}

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserCollection{
        private String content;
        private String bookName;
        private String author;
        //        private Image  bookCover;
        private Long collectionLike;

        public static BookCollectionDto.UserCollection of(BookCollection collection){
            return BookCollectionDto.UserCollection.builder()
                    .content(collection.getContent())
                    .bookName(collection.getBook().getTitle())
                    .author(collection.getBook().getAuthor())
                    .collectionLike(collection.getLikes().stream().count())
                    .build();
        }
    }
    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class BookmarkedCollection{
        private String title;
        private String content;
        private String userName;
        private Long collectionLike;
//        private Image bookCover;

        public static BookCollectionDto.BookmarkedCollection of(BookCollection collection){
            return BookCollectionDto.BookmarkedCollection.builder()
                    .title(collection.getTitle())
                    .content(collection.getContent())
                    .userName(collection.getAuthor())
                    .collectionLike(collection.getLikes().stream().count())
                    .build();
        }
    }
}
