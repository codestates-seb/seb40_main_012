package seb40_main_012.back.config.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seb40_main_012.back.config.auth.entity.RefreshToken;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByEmail(String email);
    Optional<RefreshToken> deleteByEmail(String email);
}
