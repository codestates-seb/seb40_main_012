package seb40_main_012.back.bookCollection.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb40_main_012.back.bookCollection.entity.ISBN;
import seb40_main_012.back.bookCollection.entity.Tag;

public interface ISBNRepository extends JpaRepository<ISBN,Long> {
}
