package seb40_main_012.back.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb40_main_012.back.collectionTag.entity.CollectionTag;
import seb40_main_012.back.user.entity.User;

public interface UserRepository extends JpaRepository<User,Long> {
}
