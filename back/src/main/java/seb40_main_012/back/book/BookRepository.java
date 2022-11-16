package seb40_main_012.back.book;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import seb40_main_012.back.book.entity.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
}
