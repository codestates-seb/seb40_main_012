package seb40_main_012.back.bookCollection.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.user.entity.User;

import java.util.List;

public interface BookCollectionRepository extends JpaRepository<BookCollection, Long> {
    Long countBy();
    Long countByUser(User user);
    List<BookCollection> findByUserUserId(Long userId);

    BookCollection findByTitle(String title);

    void deleteAllByUser(User user);


    @Query(nativeQuery = true,
            value = "SELECT * FROM BOOK_COLLECTION " +
                    "INNER JOIN BOOK_COLLECTION_BOOK " +
                    "ON BOOK_COLLECTION.COLLECTION_ID = BOOK_COLLECTION_BOOK.COLLECTION_ID " +
                    "INNER JOIN BOOK " +
                    "ON BOOK_COLLECTION_BOOK.BOOK_ID = BOOK.ISBN13 " +
                    "WHERE LOWER(TITLE) LIKE %:queryParam% " +
                    "OR LOWER(BOOK_TITLE) LIKE %:queryParam% " +
                    "OR LOWER(CONTENT) LIKE %:queryParam%")
    List<BookCollection> findBookCollectionsByQuery(@Param("queryParam") String queryParam, Pageable pageable);

    @Query(nativeQuery = true,
            value = "SELECT * FROM BOOK_COLLECTION " +
                    "CROSS JOIN BOOK " +
                    "WHERE LOWER(TITLE) LIKE %:queryParam% " +
                    "OR LOWER(BOOK_TITLE) LIKE %:queryParam% " +
                    "OR LOWER(CONTENT) LIKE %:queryParam%")
    List<BookCollection> findTest(@Param("queryParam") String queryParam);

    @Query(nativeQuery = true,
            value = "SELECT * FROM BOOK_COLLECTION " +
            "INNER JOIN BOOK_COLLECTION_BOOK " +
            "ON BOOK_COLLECTION.COLLECTION_ID = BOOK_COLLECTION_BOOK.COLLECTION_ID " +
            "WHERE BOOK_ID = :isbn13")
    List<BookCollection> findAllCollectionsForTheBook(String isbn13);
}
