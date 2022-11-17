package seb40_main_012.back.bookCollection.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb40_main_012.back.bookCollection.entity.BookCollectionBookmark;
import seb40_main_012.back.bookCollection.entity.BookCollectionLike;

import java.util.List;

public interface BookCollectionBookmarkRepository extends JpaRepository<BookCollectionBookmark,Long> {
    BookCollectionBookmark findByUserIdAndCollectionId(Long userId, Long collectionId);
    List<BookCollectionBookmark> findByUserId(Long userId);
}
