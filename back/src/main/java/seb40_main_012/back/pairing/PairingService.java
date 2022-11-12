package seb40_main_012.back.pairing;

import lombok.RequiredArgsConstructor;
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
import seb40_main_012.back.common.like.LikeService;
import seb40_main_012.back.pairing.entity.Pairing;
import seb40_main_012.back.user.repository.UserRepository;
import seb40_main_012.back.user.service.UserService;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class PairingService {

    private final PairingRepository pairingRepository;
    private final BookService bookService;
    private final BookRepository bookRepository;
    private final UserService userService;
    private final UserRepository userRepository;
    private final LikeService likeService;

    public Pairing createPairing(Pairing pairing, long bookId) {
        Book findBook = bookService.findBook(bookId);
//        User findUser = userService.findUser(userId);

        Pairing savedPairing =
                Pairing.builder()
                        .book(findBook)
//                        .user(findUser)
                        .imagePath(pairing.getImagePath())
                        .title(pairing.getTitle())
                        .body(pairing.getBody())
                        .outLinkPath(pairing.getOutLinkPath())
                        .createdAt(pairing.getCreatedAt())
                        .modifiedAt(pairing.getModifiedAt())
                        .build();

        findBook.getPairings().add(savedPairing);

        return pairingRepository.save(savedPairing);
    }

    public Pairing updatePairing(Pairing pairing, long pairingId) {

        Pairing findPairing = findVerifiedPairing(pairingId);

        Pairing updatedPairing =
                Pairing.builder()
                        .book(findPairing.getBook())
                        .user(findPairing.getUser())
                        .pairingId(findPairing.getPairingId())
                        .imagePath(pairing.getImagePath())
                        .title(pairing.getTitle())
                        .body(pairing.getBody())
                        .outLinkPath(pairing.getOutLinkPath())
                        .likeCount(findPairing.getLikeCount())
                        .view(findPairing.getView())
                        .images(findPairing.getImages())
                        .comments(findPairing.getComments())
                        .likes(findPairing.getLikes())
                        .createdAt(findPairing.getCreatedAt())
                        .modifiedAt(LocalDateTime.now())
                        .build();

        return pairingRepository.save(updatedPairing);
    }

    public Pairing updateLike(Pairing pairing, long pairingId) { // Like Count 값만 변경

        Pairing findPairing = findVerifiedPairing(pairingId);

        findPairing.setLikeCount(findPairing.getLikeCount());

        return pairingRepository.save(findPairing);
    }

    public Pairing updateView(long pairingId) {

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
