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

//        public int totalResult;

        List<Item> item = new ArrayList<>();

        public int totalResults;
        public int itemsPerPage;
        public int startIndex;

        @Builder
        @NoArgsConstructor
        public static class Item {

            public String isbn13; // 책 식별자로 사용하기
            public String cover; // 커버 사진 링크
            public String title;
            public String author;
            public String categoryName;
            public String pubDate;
            public String description;



            public Item(String isbn13, String cover, String title, String author, String categoryName, String pubDate, String description) {
                this.isbn13 = isbn13;
                this.cover = cover;
                this.title = title;
                this.author = author;
                this.categoryName = categoryName;
                this.pubDate = pubDate;
                this.description = description;
            }
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
            public String publisher;
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
    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MainCollectionBook {
        List<Item> item = new ArrayList<>();
        public static class Item {
            public static String isbn13;
            public String cover;
            public String bookTitle;
            public String author;

        }
    }

    }



