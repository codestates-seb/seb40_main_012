package seb40_main_012.back.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb40_main_012.back.user.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email);

    User findByNickName(String nickName);

}
