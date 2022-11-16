package seb40_main_012.back.pairing;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.pairing.entity.Pairing;

@Repository
public interface PairingRepository extends JpaRepository<Pairing, Long> {

    Slice<Pairing> findSliceBy(Pageable pageable);
}
