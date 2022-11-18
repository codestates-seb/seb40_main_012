package seb40_main_012.back.book;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Range;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.book.entity.Genre;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.bookWiki.BookWiki;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.pairing.entity.Pairing;

import javax.validation.constraints.Digits;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;
import java.util.List;

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

        private long bookId;
        private String isbn13;
        private String title;
        private Genre genre;
        private BookWiki bookWiki;
        private double averageRating;
        private long view;
        private List<Comment> comments;
        private List<Pairing> pairings;
        private List<BookCollection> bookCollections;
        private List<Book> similarBooks;

    }
}