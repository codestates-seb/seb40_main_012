package seb40_main_012.back.config.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;
import seb40_main_012.back.config.auth.entity.RefreshToken;

import java.util.List;
import java.util.Optional;

@Transactional
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByTokenValue(String tokenValue);

    Optional<RefreshToken> deleteByTokenValue(String tokenValue);
}
