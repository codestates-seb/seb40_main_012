package seb40_main_012.back.book;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import seb40_main_012.back.book.entity.Book;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    Optional<Book> findByIsbn13(String isbn13);

    @Query(nativeQuery = true, value = "select * " +
            "from Book " +
            "order by " + "average_rating " + "desc " +
            "limit 5")
    List<Book> findCarouselBooks();

    @Query(nativeQuery = true, value = "select * " +
            "from book " +
            "order by " + "view " + "desc " +
            "limit 5")
    List<Book> findBestBooks();

    @Query(nativeQuery = true, value = "select * " +
            "from book " +
            "where genre = :name " +
            "order by " + "view " + "desc")
    List<Book> findRecommendedBooks(@Param("name") String name);

    @Query(nativeQuery = true, value = "select *" +
            "from book " +
            "where author = :author " +
            "order by " + "view " +  "desc " +
            "limit 6")
    List<Book> findWritersBooks(@Param("author") String author);
}
