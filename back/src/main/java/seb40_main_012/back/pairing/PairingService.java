package seb40_main_012.back.pairing;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb40_main_012.back.advice.BusinessLogicException;
import seb40_main_012.back.advice.ExceptionCode;
import seb40_main_012.back.book.BookRepository;
import seb40_main_012.back.book.BookService;
import seb40_main_012.back.book.bookInfoSearchAPI.BookInfoSearchService;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.common.like.LikeRepository;
import seb40_main_012.back.pairing.entity.Pairing;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.repository.UserRepository;
import seb40_main_012.back.user.service.UserService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class PairingService {

    private final PairingRepository pairingRepository;
    private final LikeRepository likeRepository;
    private final BookService bookService;
    private final BookRepository bookRepository;
    private final UserService userService;
    private final UserRepository userRepository;
    private final BookInfoSearchService bookInfoSearchService;

    public Pairing createPairing(Pairing pairing, String isbn13) {

        User findUser = userService.getLoginUser();

        Book findBook = bookService.findVerifiedBook(isbn13);

        Pairing savedPairing =
                Pairing.builder()
                        .book(findBook)
                        .user(findUser)
                        .pairingCategory(pairing.getPairingCategory())
                        .imagePath(pairing.getImagePath())
                        .title(pairing.getTitle())
                        .body(pairing.getBody())
                        .outLinkPath(pairing.getOutLinkPath())
                        .createdAt(LocalDateTime.now())
                        .modifiedAt(LocalDateTime.now())
                        .build();

        findBook.getPairings().add(savedPairing);

        return pairingRepository.save(savedPairing);
    }

    public Pairing updatePairing(Pairing pairing, long pairingId) {

        User findUser = userService.getLoginUser();

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
                        .image(findPairing.getImage())
                        .comments(findPairing.getComments())
                        .likes(findPairing.getLikes())
                        .createdAt(findPairing.getCreatedAt())
                        .modifiedAt(LocalDateTime.now())
                        .build();

        return pairingRepository.save(updatedPairing);
    }

    public Pairing addLike(long pairingId) {

        User findUser = userService.getLoginUser();

        Pairing findPairing = findVerifiedPairing(pairingId);

        findPairing.setLikeCount(findPairing.getLikeCount() + 1);

        findPairing.setIsLiked(true);

        return pairingRepository.save(findPairing);
    }

    public Pairing removeLike(long pairingId) {

        User findUser = userService.getLoginUser();

        Pairing findPairing = findVerifiedPairing(pairingId);

        findPairing.setLikeCount(findPairing.getLikeCount() - 1);

        findPairing.setIsLiked(false);

        return pairingRepository.saveAndFlush(findPairing);
    }

    public Pairing updateView(long pairingId) {

        Pairing findPairing = findVerifiedPairing(pairingId);

        findPairing.setView(findPairing.getView() + 1); // View +1

        return pairingRepository.save(findPairing);
    }

    public Pairing isLikedComments(long pairingId) {

        User findUser = userService.getLoginUser();

        Pairing findPairing = findVerifiedPairing(pairingId);

        Pairing isLikedPairing = isLikedPairing(findPairing, findUser);

//        findPairing.setView(findPairing.getView() + 1); // View +1

        List<Comment> isLikedComments = isLikedPairing.getComments().stream()
                .map(comment -> isLikedComment(comment, findUser))
                .collect(Collectors.toList());

        isLikedPairing.setComments(isLikedComments);

        return pairingRepository.save(isLikedPairing);
    }

    public Pairing isLikedPairing(Pairing pairing, User user) {

        Boolean isLiked;

        if (likeRepository.findByPairingAndUser(pairing, user) == null) { //좋아요 안 누른 경우
            isLiked = false;
        } else {
            isLiked = true;
        }

        pairing.setIsLiked(isLiked);

        return pairing;
    }

    public Comment isLikedComment(Comment comment, User user) {


        Boolean isLiked;

        if (likeRepository.findByCommentAndUser(comment, user) == null) { //좋아요 안 누른 경우
            isLiked = false;
        } else {
            isLiked = true;
        }

        comment.setIsLiked(isLiked);

        return comment;
    }


    public Pairing findPairing(long pairingId) {
        return findVerifiedPairing(pairingId);
    }

//    --------------------------------------------------------------------------------------------
//    --------------------------------------------------------------------------------------------
//    조회 API 세분화
//    --------------------------------------------------------------------------------------------
//    --------------------------------------------------------------------------------------------
    public List<Pairing> findPairings() { // 전체 슬라이스 처리 및 좋아요 내림차순 정렬

        PageRequest pageRequest = PageRequest.of(0, 10);

        return pairingRepository.findSliceBy(pageRequest);
    }

    public List<Pairing> findPairingsNewest() { // 전체 슬라이스 처리 및 등록일 내림차순 정렬

        PageRequest pageRequest = PageRequest.of(0, 10);

        return pairingRepository.findSliceByCreatedAt(pageRequest);
    }

    public List<Pairing> findFilmPairingsLikes() { // 영화 카테고리 슬라이스 처리 및 좋아요 내림차순 정렬

        PageRequest pageRequest = PageRequest.of(0, 10);

        return pairingRepository.findCategorySliceByLikeDesc("FILM", pageRequest);
    }

    public List<Pairing> findFilmPairingsNewest() { // 영화 카테고리 슬라이스 처리 및 등록일 내림차순 정렬

        PageRequest pageRequest = PageRequest.of(0, 10);

        return pairingRepository.findCategorySliceByNewestDesc("FILM", pageRequest);
    }

    public List<Pairing> findCuisinePairingsLikes() { // 음식/장소 카테고리 슬라이스 처리 및 좋아요 내림차순 정렬

        PageRequest pageRequest = PageRequest.of(0, 10);

        return pairingRepository.findCategorySliceByLikeDesc("CUISINE", pageRequest);
    }

    public List<Pairing> findCuisinePairingsNewest() { // 음식/장소 카테고리 슬라이스 처리 및 등록일 내림차순 정렬

        PageRequest pageRequest = PageRequest.of(0, 10);


        return pairingRepository.findCategorySliceByNewestDesc("CUISINE", pageRequest);
    }

    public List<Pairing> findMusicPairingsLikes() { // 음악 카테고리 슬라이스 처리 및 좋아요 내림차순 정렬

        PageRequest pageRequest = PageRequest.of(0, 10);

        return pairingRepository.findCategorySliceByLikeDesc("MUSIC", pageRequest);
    }

    public List<Pairing> findMusicPairingsNewest() { // 음악 카테고리 슬라이스 처리 및 등록일 내림차순 정렬

        PageRequest pageRequest = PageRequest.of(0, 10);


        return pairingRepository.findCategorySliceByNewestDesc("MUSIC", pageRequest);
    }

    public List<Pairing> findBookPairingsLikes() { // 책 카테고리 슬라이스 처리 및 좋아요 내림차순 정렬

        PageRequest pageRequest = PageRequest.of(0, 10);

        return pairingRepository.findCategorySliceByLikeDesc("BOOK", pageRequest);
    }

    public List<Pairing> findBookPairingsNewest() { // 책 카테고리 슬라이스 처리 및 등록일 내림차순 정렬

        PageRequest pageRequest = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "created_At"));


        return pairingRepository.findCategorySliceByNewestDesc("BOOK", pageRequest);
    }

    public List<Pairing> findEtcPairingsLikes() { // 기타 카테고리 슬라이스 처리 및 좋아요 내림차순 정렬

        PageRequest pageRequest = PageRequest.of(0, 10);

        return pairingRepository.findCategorySliceByLikeDesc("ETC", pageRequest);
    }

    public List<Pairing> findEtcPairingsNewest() { // 기타 카테고리 슬라이스 처리 및 등록일 내림차순 정렬

        PageRequest pageRequest = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "created_At"));

        return pairingRepository.findCategorySliceByNewestDesc("ETC", pageRequest);
    }

    public List<Pairing> findBestPairingsLikes() { // 기타 카테고리 슬라이스 처리 및 등록일 내림차순 정렬

        return pairingRepository.findBestTenCategory();
    }

//    --------------------------------------------------------------------------------------------
//    --------------------------------------------------------------------------------------------
//    --------------------------------------------------------------------------------------------
//    --------------------------------------------------------------------------------------------

//    public List<Pairing> findPairings() { // 리스트 처리 및 좋아요 내림차순 정렬
//
//        return pairingRepository.findAll(
//
//                Sort.by("likeCount").descending()
//        );
//    }

    public void deletePairing(long pairingId) {

        User findUser = userService.getLoginUser();

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
