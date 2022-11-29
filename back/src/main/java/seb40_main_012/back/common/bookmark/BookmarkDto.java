package seb40_main_012.back.common.bookmark;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import seb40_main_012.back.book.BookDto;
import seb40_main_012.back.bookCollection.dto.BookCollectionDto;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.pairing.PairingDto;

import java.util.List;
import java.util.stream.Collectors;

public class BookmarkDto {
    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Collection {
        private Long bookmarkId;
        private BookCollectionDto.BookmarkedCollection collections;

        public static Collection of(Bookmark bookmark) {
            return Collection.builder()
                    .bookmarkId(bookmark.getBookmarkId())
                    .collections(BookCollectionDto.BookmarkedCollection.of(bookmark.getBookCollection()))
                    .build();
        }
    }

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Pairing {
        private Long bookmarkId;
        private PairingDto.BookmarkedPairing collections;

        public static Pairing of(Bookmark bookmark) {
            return Pairing.builder()
                    .bookmarkId(bookmark.getBookmarkId())
                    .collections(PairingDto.BookmarkedPairing.of(bookmark.getPairing()))
                    .build();
        }
    }

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Book {
        private Long bookmarkId;
        private BookDto.BookmarkedBook collections;

        public static Book of(Bookmark bookmark) {
            return Book.builder()
                    .bookmarkId(bookmark.getBookmarkId())
                    .collections(BookDto.BookmarkedBook.of(bookmark.getBook()))
                    .build();
        }
    }


}
