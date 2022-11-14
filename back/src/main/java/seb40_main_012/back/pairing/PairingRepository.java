package seb40_main_012.back.pairing;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import seb40_main_012.back.pairing.entity.Pairing;


@Repository
public interface PairingRepository extends JpaRepository<Pairing, Long> {
}
