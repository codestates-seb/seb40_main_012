package seb40_main_012.back.bookCollection.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import seb40_main_012.back.book.BookDto;
import seb40_main_012.back.book.bookInfoSearchAPI.BookInfoSearchDto;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.common.comment.CommentDto;
import seb40_main_012.back.user.dto.UserDto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
public class BookCollectionDto {

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post{
        private String title;
        private String content;
        private List<String> tags;
        private List<String> bookIsbns;

        public BookCollection toEntity(){
            BookCollection collection = new BookCollection(
                    title,content,bookIsbns
            );
            return collection;
        }
    }
    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response{
        private Long collectionId;
        private String title;
        private String content;
        private LocalDate createdAt;
        private LocalDate lastModifiedAt;
        private Long likeCount;
        private boolean userLike;
        private boolean userBookmark;
        private String collectionAuthor;
        private List<String> tags;
        private List<String> isbns;

        public static Response of(BookCollection collection){
            return Response.builder()
                    .collectionId(collection.getCollectionId())
                    .title(collection.getTitle())
                    .content(collection.getContent())
                    .createdAt(LocalDate.now())
                    .lastModifiedAt(collection.getLastModifiedAt())
                    .likeCount(collection.getLikeCount())
                    .userLike(!collection.getUser().getCollectionLikes().isEmpty())
                    .userBookmark(!collection.getUser().getCollectionBookmarks().isEmpty())
                    .collectionAuthor(collection.getUser().getNickName())
                    .tags(collection.getCollectionTags().stream().map(x -> x.getTag().getTagName()).collect(Collectors.toList()))
                    .isbns(collection.getBookIsbn13())
                    .build();
        }
    }

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CollectionDetails{
        private Long collectionId;
        private String title;
        private String content;
        private LocalDateTime createdAt;
        private LocalDate lastModifiedAt;
        private Long likeCount;
        private Long view;
        private boolean userLike;
        private boolean userBookmark;
        private String collectionAuthor;
        private List<String> tags;
        private List<BookDto.CollectionBook> books;
        private List<CommentDto.Response> comments;



        //collection book
        public static CollectionDetails of(BookCollection collection){
            return CollectionDetails.builder()
                    .collectionId(collection.getCollectionId())
                    .title(collection.getTitle())
                    .content(collection.getContent())
                    .createdAt(collection.getCreatedAt())
                    .lastModifiedAt(collection.getLastModifiedAt())
                    .likeCount(collection.getLikeCount())
                    .view(collection.getView())
                    .userLike(!collection.getUser().getCollectionLikes().isEmpty())
                    .userBookmark(!collection.getUser().getCollectionBookmarks().isEmpty())
                    .collectionAuthor(collection.getUser().getNickName())
                    .tags(collection.getCollectionTags().stream().map(x -> x.getTag().getTagName()).collect(Collectors.toList()))
                    .books(collection.getCollectionBooks().stream().map(x -> BookDto.CollectionBook.of(x.getBook())).collect(Collectors.toList()))
                    .comments(collection.getComments().stream()
                            .map(comment ->
                                    CommentDto.Response.builder()
                                            .commentId(comment.getCommentId())
                                            .userInformation(
                                                    UserDto.ResponseDto.builder()
                                                            .email(comment.getUser().getEmail())
                                                            .nickName(comment.getUser().getNickName())
                                                            .build()
                                            )
                                            .commentType(comment.getCommentType())
                                            .body(comment.getBody())
                                            .likeCount(comment.getLikeCount())
                                            .view(comment.getView())
                                            .createdAt(comment.getCreatedAt())
                                            .modifiedAt(comment.getModifiedAt())
                                            .build()
                            ).collect(Collectors.toList()))
                    .build();
        }
    }

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserCollection{
        private Long collectionId;
        private String content;
        private String title;
        private Long collectionLike;
        private List<BookDto.CollectionBook> books;

        public static BookCollectionDto.UserCollection of(BookCollection collection){
            return UserCollection.builder()
                    .collectionId(collection.getCollectionId())
                    .content(collection.getContent())
                    .title(collection.getTitle())
                    .collectionLike(collection.getCollectionLikes().stream().count())
                    .books(collection.getCollectionBooks().stream().map(x -> BookDto.CollectionBook.of(x.getBook())).collect(Collectors.toList()))
                    .build();
        }
    }
    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class BookmarkedCollection{
        private Long collectionId;
        private String title;
        private String content;
        private String userName;
        private Long collectionLike;
        private List<BookDto.CollectionBook> books;
//        private Image bookCover;

        public static BookCollectionDto.BookmarkedCollection of(BookCollection collection){
            return BookmarkedCollection.builder()
                    .collectionId(collection.getCollectionId())
                    .title(collection.getTitle())
                    .content(collection.getContent())
                    .userName(collection.getUser().getNickName())
                    .collectionLike(collection.getCollectionLikes().stream().count())
                    .books(collection.getCollectionBooks().stream().map(x -> BookDto.CollectionBook.of(x.getBook())).collect(Collectors.toList()))
                    .build();
        }
    }
//    @Getter
//    @Builder
//    @AllArgsConstructor
//    @NoArgsConstructor
//    public static class CategoryCollection{
//        private String cover;
//        private String title;
//        private String author;
//
//        public static BookCollectionDto.CategoryCollection of(BookCollection collection){
//            return BookCollectionDto.CategoryCollection.builder()
////                    .cover(collection.getIsbn13().)
//                    .title(collection.getTitle())
//                    .build();
//        }
//    }

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class TagCollection{
        private Long collectionId;
        private String title;
        private String author;
        private List<BookDto.CollectionBook> books;

        public static BookCollectionDto.TagCollection of(BookCollection collection){
            return TagCollection.builder()
                    .collectionId(collection.getCollectionId())
                    .books(collection.getCollectionBooks().stream().map(x -> BookDto.CollectionBook.of(x.getBook())).collect(Collectors.toList()))
                    .title(collection.getTitle())
                    .author(collection.getUser().getNickName())
                    .build();
        }
    }

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class AuthorCollection{
        private String title;
        private List<BookDto.CollectionBook> books;


        //collection book
        public static AuthorCollection of(BookCollection collection){
            return AuthorCollection.builder()
                    .title(collection.getTitle())
                    .books(collection.getCollectionBooks().stream().map(x -> BookDto.CollectionBook.of(x.getBook())).collect(Collectors.toList()))
                    .build();
        }
    }

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CriticCollection{
        private String title;
        private List<BookDto.CollectionBook> books;


        //collection book
        public static CriticCollection of(BookCollection collection){
            return CriticCollection.builder()
                    .title("00 평론가가 평가한 그 책")
                    .books(collection.getCollectionBooks().stream().map(x -> BookDto.CollectionBook.of(x.getBook())).collect(Collectors.toList()))
                    .build();
        }
    }

}
