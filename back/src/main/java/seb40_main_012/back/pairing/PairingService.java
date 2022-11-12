package seb40_main_012.back.pairing;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb40_main_012.back.advice.BusinessLogicException;
import seb40_main_012.back.advice.ExceptionCode;
import seb40_main_012.back.book.BookRepository;
import seb40_main_012.back.book.BookService;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.common.like.LikeService;
import seb40_main_012.back.pairing.entity.Pairing;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.repository.UserRepository;
import seb40_main_012.back.user.service.UserService;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
public class PairingService {

    private final PairingRepository pairingRepository;
    private final BookService bookService;
    private final BookRepository bookRepository;
    private final UserService userService;
    private final UserRepository userRepository;
    private final LikeService likeService;

    public PairingService(PairingRepository pairingRepository, BookService bookService,
                          BookRepository bookRepository, UserService userService, UserRepository userRepository,
                          LikeService likeService) {
        this.pairingRepository = pairingRepository;
        this.bookService = bookService;
        this.bookRepository = bookRepository;
        this.userService = userService;
        this.userRepository = userRepository;
        this.likeService = likeService;
    }

    public Pairing createPairing(Pairing pairing, long bookId) {
        Book findBook = bookService.findBook(bookId);
//        User findUser = userService.findUser(userId);

        Pairing savedPairing =
                Pairing.builder()
                        .book(findBook)
//                        .user(findUser)
//                        .pairingId(pairing.getPairingId())
                        .imagePath(pairing.getImagePath())
                        .body(pairing.getBody())
                        .createdAt(pairing.getCreatedAt())
                        .modifiedAt(pairing.getModifiedAt())
                        .build();

        findBook.getPairings().add(savedPairing);

        return pairingRepository.save(savedPairing);
    }

    public Pairing updatePairing(Pairing pairing, long pairingId) {

        Pairing findPairing = findVerifiedPairing(pairingId);
        findPairing.setBody(pairing.getBody());
        findPairing.setModifiedAt(LocalDateTime.now());

        return pairingRepository.save(findPairing);
    }

    public Pairing updateLike(Pairing pairing, long pairingId) { // Like Count 값만 변경

        Pairing findPairing = findVerifiedPairing(pairingId);

        findPairing.setLikeCount(findPairing.getLikeCount());

        return pairingRepository.save(findPairing);
    }

    public Pairing updateView(Pairing pairing, long pairingId) {

        Pairing findPairing = findVerifiedPairing(pairingId);

        findPairing.setView(findPairing.getView() + 1); // View +1

        return pairingRepository.save(findPairing);
    }

    public Pairing findPairing(long pairingId) {
        return findVerifiedPairing(pairingId);
    }

    public Page<Pairing> findPairings(int page, int size) { // 페이징 처리 및 좋아요 내림차순 정렬

        return pairingRepository.findAll(
                PageRequest.of(page, size, Sort.by("likeCount").descending())
        );
    }

    public void deletePairing(long pairingId) {

        Pairing findPairing = findVerifiedPairing(pairingId);

        pairingRepository.delete(findPairing);
    }


    public Pairing findVerifiedPairing(long pairingId) {
        Optional<Pairing> optionalPairing = pairingRepository.findById(pairingId);
        return optionalPairing.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.PAIRING_NOT_FOUND));
    }
}


//    public Pairing addLike(long pairingId, long userId) {
//        Pairing findPairing = findVerifiedPairing(pairingId);
//
//        likeService.createPairingLike(pairingId, userId);
//
//        findPairing.setLikeCount(findPairing.getLikeCount() + 1);
//
//        return pairingRepository.save(findPairing);
//    }
//
//    public Pairing cancelLike(long pairingId, long userId) {
//        Pairing findPairing = findVerifiedPairing(pairingId);
//
//        likeService.createPairingLike(pairingId, userId);
//
//        findPairing.setLikeCount(findPairing.getLikeCount() - 1);
//
//        return pairingRepository.save(findPairing);
//    }
