package seb40_main_012.back.bookCollection.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.pairing.entity.Pairing;

import java.util.List;

public interface BookCollectionRepository extends JpaRepository<BookCollection,Long> {
    Long countBy();
    List<BookCollection> findByUseId(Long userId);
    Long countByUserId(Long userId);
}
