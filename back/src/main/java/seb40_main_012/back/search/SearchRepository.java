package seb40_main_012.back.search;

import org.springframework.data.jpa.repository.JpaRepository;
import seb40_main_012.back.book.entity.Book;

public interface SearchRepository extends JpaRepository<Book, Long> {
}
