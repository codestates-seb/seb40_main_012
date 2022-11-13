package seb40_main_012.back.bookWiki;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class BookWikiDto {

    @Data
    @Builder
    public static class Post{

        private String imagePath;
        private String spacetimeBackground;
        private String characterTree;
        private String objectInside;
        private String trivia;
        private String appendix;
        private String objectOutside;

    }
    @Data
    @Builder
    public static class Patch{

        private String imagePath;
        private String spacetimeBackground;
        private String characterTree;
        private String objectInside;
        private String trivia;
        private String appendix;
        private String objectOutside;

    }
    @Data
    @Builder
    public static class View{

        private long commentId;
        private long view;

    }
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response{

        private long bookId;
        private long bookWikiId;
        private String imagePath;
        private String spacetimeBackground;
        private String characterTree;
        private String objectInside;
        private String trivia;
        private String appendix;
        private String objectOutside;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;

    }
}
