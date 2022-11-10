package seb40_main_012.back.userCategory.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.userCategory.entity.UserCategory;

public interface UserCategoryRepository extends JpaRepository<UserCategory,Long> {
}
