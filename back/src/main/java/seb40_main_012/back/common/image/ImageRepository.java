package seb40_main_012.back.common.image;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Long> {

    @Modifying
    @Query(nativeQuery = true, value = "DELETE FROM IMAGE WHERE PAIRING_ID = :pairingId")
    void deleteByPairingId(long pairingId);

    @Query(nativeQuery = true, value = "SELECT * FROM IMAGE WHERE PAIRING_ID = :pairingId")
    Optional<Image> findByPairingId(long pairingId);
}
