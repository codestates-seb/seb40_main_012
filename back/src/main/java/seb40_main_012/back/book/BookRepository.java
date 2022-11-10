package seb40_main_012.back.book;

import org.springframework.data.jpa.repository.JpaRepository;
import seb40_main_012.back.book.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long> {
}
