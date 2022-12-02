package seb40_main_012.back.book;

import lombok.*;
import org.hibernate.validator.constraints.Range;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.SliceImpl;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.book.entity.Genre;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.bookWiki.BookWiki;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.pairing.entity.Pairing;

import java.util.List;
import java.util.Optional;

public class BookDto {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Post {

        private String isbn13;
        private long averageRating;
        private List<Comment> comments;
        private String commentBody;

    }

    @Data
    @Builder
    public static class Patch {

    }

//    @Data
//    @Builder
//    public static class View {
//
//        private long bookId;
//        private long view;
//
//    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Rating {

        @Range(min = 0, max = 5)
        private double rating;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {

        private String isbn13;
        private Double myRating;
        private boolean isBookmarked;
        private Optional<Comment> myComment;
        private String cover;
        private String title;
        private String author;
        private Optional<Pairing> bestPairing;
        private String subTitle;
        private String itemPage;
        private Genre genre;
        private String pubDate;
        private String publisher;
        private String adult;
        private String description;
        private BookWiki bookWiki;
        private double averageRating;
        private long ratingCount;
        private long view;
        private long commentCount;
        private long pairingCount;
        private long bookCollectionCount;
//        private SliceImpl<Comment> comments;
        private Page<Comment> comments;
        private SliceImpl<Pairing> pairings;
        private SliceImpl<BookCollection> bookCollections;
//        private List<Book> similarBooks;

    }

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class BookmarkResponse{
        private boolean result;
        private String isbn13;
        public static BookmarkResponse of(Book book,boolean result){
            return BookmarkResponse.builder()
                    .result(result)
                    .isbn13(book.getIsbn13())
                    .build();
        }
    }

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class BookmarkedBook{
        private String isbn13;
        private String title;
        private String author;
        private double averageRating;
        private String bookCover;

        public static BookmarkedBook of(Book book){
            return BookmarkedBook.builder()
                    .isbn13(book.getIsbn13())
                    .title(book.getTitle())
                    .author(book.getAuthor())
                    .averageRating(book.getAverageRating())
                    .bookCover(book.getCover())
                    .build();
        }
    }

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CollectionBook{
        private String isbn13;
        private String title;
        private String author;
        private double averageRating;
        private String bookCover;

        public static CollectionBook of(Book book){
            return CollectionBook.builder()
                    .isbn13(book.getIsbn13())
                    .title(book.getTitle())
                    .author(book.getAuthor())
                    .averageRating(book.getAverageRating())
                    .bookCover(book.getCover())
                    .build();
        }
    }
}
