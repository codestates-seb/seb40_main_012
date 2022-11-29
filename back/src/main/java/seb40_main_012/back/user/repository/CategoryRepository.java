package seb40_main_012.back.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import seb40_main_012.back.book.entity.Genre;
import seb40_main_012.back.user.entity.Category;
import seb40_main_012.back.user.entity.UserCategory;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category,Long> {
    Category findByGenre(Genre genre);

    @Query(nativeQuery = true, value =
            "SELECT GENRE FROM USERS " +
                    "INNER JOIN USER_CATEGORY " +
                    "ON USERS.USER_ID = USER_CATEGORY.USER_ID " +
                    "INNER JOIN CATEGORY " +
                    "ON USER_CATEGORY.CATEGORY_ID = CATEGORY.CATEGORY_ID " +
                    "WHERE USERS.USER_ID = :userId")
    List<String> findAllGenreByUserId(long userId);
}
