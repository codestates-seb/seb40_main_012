package seb40_main_012.back.bookWiki;

import java.time.LocalDateTime;

public class BookWikiDto {

    public static class Post{

        private String imagePath;
        private String spacetimeBackground;
        private String characterTree;
        private String objectInside;
        private String trivia;
        private String appendix;
        private String objectOutside;

    }
    public static class Patch{

        private String imagePath;
        private String spacetimeBackground;
        private String characterTree;
        private String objectInside;
        private String trivia;
        private String appendix;
        private String objectOutside;

    }
    public static class View{

        private long commentId;
        private long view;

    }
    public static class Response{

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
