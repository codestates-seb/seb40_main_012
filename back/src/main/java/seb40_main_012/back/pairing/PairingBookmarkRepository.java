package seb40_main_012.back.pairing;

import org.springframework.data.jpa.repository.JpaRepository;
import seb40_main_012.back.pairing.entity.PairingBookmark;

import java.util.List;

public interface PairingBookmarkRepository extends JpaRepository<PairingBookmark,Long> {
    PairingBookmark findByUserUserIdAndPairingPairingId(Long userId, Long pairingId);
    List<PairingBookmark> findByUserUserId(Long userId);
}
