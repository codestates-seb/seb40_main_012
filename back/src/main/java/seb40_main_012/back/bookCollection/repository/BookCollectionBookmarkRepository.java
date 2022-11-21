package seb40_main_012.back.bookCollection.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.bookCollection.entity.BookCollectionBookmark;
import seb40_main_012.back.bookCollection.entity.BookCollectionLike;
import seb40_main_012.back.user.entity.User;

import java.util.Collection;
import java.util.List;

public interface BookCollectionBookmarkRepository extends JpaRepository<BookCollectionBookmark,Long> {
    BookCollectionBookmark findByUserAndBookCollection(User user, BookCollection collection);
    List<BookCollectionBookmark> findByUserUserId(Long userId);
}
