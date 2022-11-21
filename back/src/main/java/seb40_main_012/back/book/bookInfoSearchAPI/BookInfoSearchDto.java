package seb40_main_012.back.book.bookInfoSearchAPI;

import lombok.*;

import java.util.ArrayList;
import java.util.List;


public class BookInfoSearchDto {

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class BookList {

        public int totalResult;

        List<Item> item = new ArrayList<>();

        static class Item {

            public String isbn13; // 책 식별자로 사용하기
            public String cover; // 커버 사진 링크
            public String title;
            public String author;
            public String categoryName;
            public String pubDate;
            public String description;
        }
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class BookInfo {

        List<Item> item = new ArrayList<>();

        public static class Item {

            public static String isbn13; // 책 식별자로 사용하기
            public String cover; // 커버 사진 링크
            public String title;
            public String author;
            public String categoryName;
            public String adult;
            public String pubDate;
            public String description;
            public Object subInfo;
        }
    }

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CollectionBook {
        List<Item> item = new ArrayList<>();
        public static class Item {
            public static String isbn13; // 책 식별자로 사용하기
            public String cover;
            public String title;
            public String author;

        }
    }
    }


