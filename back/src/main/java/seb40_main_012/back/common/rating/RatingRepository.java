package seb40_main_012.back.common.rating;

import org.springframework.data.jpa.repository.JpaRepository;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.common.like.entity.Like;
import seb40_main_012.back.pairing.entity.Pairing;
import seb40_main_012.back.user.entity.User;

public interface RatingRepository extends JpaRepository<Rating, Long> {

    Rating findByBookAndUser(Book book, User user);
}
