package seb40_main_012.back.common.bookmark;

import org.springframework.data.jpa.repository.JpaRepository;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.pairing.entity.Pairing;
import seb40_main_012.back.user.entity.User;

import java.util.List;

public interface BookmarkRepository extends JpaRepository<Bookmark,Long> {
    Bookmark findByUserAndBookCollection(User user, BookCollection collection);

    Bookmark findByUserAndPairing(User user, Pairing pairing);
    Bookmark findByUserAndBook(User user, Book book);

    List<Bookmark> findByUser(User user);
}
