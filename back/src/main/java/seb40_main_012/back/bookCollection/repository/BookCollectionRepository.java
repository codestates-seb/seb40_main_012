package seb40_main_012.back.bookCollection.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.pairing.entity.Pairing;
import seb40_main_012.back.user.entity.User;

import java.util.List;

public interface BookCollectionRepository extends JpaRepository<BookCollection,Long> {
    Long countBy();
    List<BookCollection> findByUserUserId(Long userId);
    Long countByUserUserId(Long userId);

    @Query(nativeQuery = true,
            value = "SELECT * FROM BOOK_COLLECTION " +
                    "WHERE TITLE LIKE %:queryParam% " +
                    "OR CONTENT LIKE %:queryParam%")
    List<BookCollection> findBookCollectionsByQuery(@Param("queryParam") String queryParam);

}
