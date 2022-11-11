package seb40_main_012.back.bookCollection.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb40_main_012.back.bookCollection.entity.BookCollectionTag;

public interface BookCollectionTagRepository extends JpaRepository<BookCollectionTag,Long> {
}
