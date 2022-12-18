package seb40_main_012.back.common.rating;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.user.entity.User;

public interface RatingRepository extends JpaRepository<Rating, Long> {

    Rating findByBookAndUser(Book book, User user);

    @Query(nativeQuery = true, value = "select * " +
            "from rating " +
            "where isbn13 = :isbn13 " +
            "and User_Id = :userId")
    Rating findByIsbn13AndUserId(String isbn13, long userId);
}
