package seb40_main_012.back.bookCollectionBook;

import lombok.Builder;
import lombok.Data;
import seb40_main_012.back.bookCollection.entity.BookCollectionTag;

import javax.validation.constraints.Positive;
import java.util.List;

public class BookCollectionBookDto {

    @Data
    public static class Post {

        @Positive
        private long bookId;

    }

    @Data
    public static class Patch {

    }

    @Data
    @Builder
    public static class Response {

        private long bookId;
        private long bookCollectionId;
        private String title;
        private String content;
        private String author;    //getUserName()
        private List<BookCollectionTag> tags;

    }

}
