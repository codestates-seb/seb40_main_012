package seb40_main_012.back.pairing;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb40_main_012.back.pairing.entity.Pairing;

@Service
@Transactional
public class PairingService {

    public Pairing createPairing(Pairing pairing) {
        return null;
    }

    public Pairing updatePairing(Pairing pairing) {
        return null;
    }

    public Pairing updateView(Pairing pairing, long pairingId) {
        return null;
    }

    public Pairing findPairing(long pairingId) {
        return null;
    }

    public Page<Pairing> findPairings(int page, int size) {
        return null;
    }

    public void deletePairing(long pairingId) {
    }

    public void verifyPairing(long userId, Pairing pairing) {
    }

    public void findVerifiedPairing(long pairingId) {
    }
}
