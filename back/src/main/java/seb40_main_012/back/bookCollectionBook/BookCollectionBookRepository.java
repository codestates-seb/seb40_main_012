package seb40_main_012.back.bookCollectionBook;

import org.springframework.data.jpa.repository.JpaRepository;
import seb40_main_012.back.bookCollection.entity.BookCollectionLike;

public interface BookCollectionBookRepository extends JpaRepository<BookCollectionBook,Long> {
}
