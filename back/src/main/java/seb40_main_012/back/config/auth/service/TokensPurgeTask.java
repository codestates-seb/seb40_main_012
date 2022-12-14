package seb40_main_012.back.config.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb40_main_012.back.config.auth.repository.RefreshTokenRepository;

import java.time.LocalDateTime;

@Service
@Transactional
public class TokensPurgeTask {
    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Scheduled(cron = "${purge.cron.expression}")
    public void purgeExpired() {
        refreshTokenRepository.deleteAllByExpiredSince(LocalDateTime.now());
    }
}
