package seb40_main_012.back.bookCollectionBook;

import org.springframework.data.jpa.repository.JpaRepository;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.bookCollection.entity.BookCollection;

import java.util.List;

public interface BookCollectionBookRepository extends JpaRepository<BookCollectionBook,Long> {
    List<BookCollectionBook> findAllByBook(Book book);
    void deleteAllByBookCollection(BookCollection bookCollection);

}
