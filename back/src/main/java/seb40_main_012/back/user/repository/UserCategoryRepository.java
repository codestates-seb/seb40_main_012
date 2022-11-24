package seb40_main_012.back.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb40_main_012.back.user.entity.Category;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.entity.UserCategory;

import java.util.List;

public interface UserCategoryRepository extends JpaRepository<UserCategory,Long> {
    List<UserCategory> findByUserUserId(Long userId);

    List<UserCategory> findByCategory(Category category);
    UserCategory findByCategoryAndUser(Category category,User user);

    List<UserCategory> findAllByUser(User user);
    void deleteByUser(User user);
}
