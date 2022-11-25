package seb40_main_012.back.bookCollection.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb40_main_012.back.bookCollection.entity.BookCollectionTag;
import seb40_main_012.back.bookCollection.entity.Tag;

import java.util.List;

public interface BookCollectionTagRepository extends JpaRepository<BookCollectionTag,Long> {
    List<BookCollectionTag> findByTag(Tag tag);
}
