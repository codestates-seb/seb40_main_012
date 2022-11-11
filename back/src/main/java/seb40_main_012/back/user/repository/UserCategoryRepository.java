package seb40_main_012.back.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb40_main_012.back.user.entity.UserCategory;

public interface UserCategoryRepository extends JpaRepository<UserCategory,Long> {
}
