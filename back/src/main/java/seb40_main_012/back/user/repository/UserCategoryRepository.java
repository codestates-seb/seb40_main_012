package seb40_main_012.back.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import seb40_main_012.back.user.entity.Category;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.entity.UserCategory;

import java.util.List;

public interface UserCategoryRepository extends JpaRepository<UserCategory,Long> {
    List<UserCategory> findByUserUserId(Long userId);

    List<UserCategory> findByCategory(Category category);
    UserCategory findByCategoryAndUser(Category category,User user);



    List<UserCategory> findAllByUser(User user);

    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "DELETE FROM USER_CATEGORY WHERE USER_ID =:userId")
    void deleteByUserUserId(@Param("userId") Long userId);

    void deleteAllByUser(User user);
}
