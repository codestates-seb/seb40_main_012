package seb40_main_012.back.pairing;

import org.springframework.data.jpa.repository.JpaRepository;
import seb40_main_012.back.pairing.entity.Pairing;

public interface PairingRepository extends JpaRepository<Pairing, Long> {
}
