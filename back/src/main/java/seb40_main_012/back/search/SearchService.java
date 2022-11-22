package seb40_main_012.back.search;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.bookCollection.repository.BookCollectionRepository;
import seb40_main_012.back.common.comment.CommentRepository;
import seb40_main_012.back.pairing.PairingRepository;
import seb40_main_012.back.pairing.entity.Pairing;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SearchService {

    private final PairingRepository pairingRepository;
    private final BookCollectionRepository bookCollectionRepository;
    private final CommentRepository commentRepository;

    public List<Pairing> findAllPairingByQuery(String queryParam) {

        List<Pairing> result = pairingRepository.findPairingsByQuery(queryParam);

        return result;
    }

    public List<BookCollection> findAllBookCollectionsByQuery(String queryParam) {

        List<BookCollection> result = bookCollectionRepository.findBookCollectionsByQuery(queryParam);

        return result;
    }
}
