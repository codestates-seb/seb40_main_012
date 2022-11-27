package seb40_main_012.back.pairing;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.SliceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import seb40_main_012.back.book.BookService;
import seb40_main_012.back.common.bookmark.BookmarkService;
import seb40_main_012.back.common.image.AwsS3Service;
import seb40_main_012.back.common.image.ImageController;
import seb40_main_012.back.common.image.ImageService;
import seb40_main_012.back.common.like.LikeService;
import seb40_main_012.back.dto.SingleResponseDto;
//import seb40_main_012.back.notification.NotificationService;
import seb40_main_012.back.notification.NotificationService;
import seb40_main_012.back.pairing.entity.Pairing;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.service.UserService;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/books")
public class PairingController {

    private final PairingService pairingService;
    private final BookmarkService bookmarkService;
    private final PairingMapper pairingMapper;
    private final BookService bookService;
    private final LikeService likeService;
    private final ImageController imageController;
    private final AwsS3Service awsS3Service;
    private final ImageService imageService;
    private final MultipartResolver multipartResolver;
    //    ------------------------------------------------------------
    private final NotificationService noticeService;
//    ------------------------------------------------------------

    @PostMapping("/{isbn13}/pairings/add")
    public ResponseEntity postPairing(
            @PathVariable("isbn13") @Positive String isbn13,
            @RequestParam(value = "image") @Nullable MultipartFile file,
            @Valid @RequestPart(value = "postPairingDto") PairingDto.Post postPairing) throws Exception {

        String imagePath = null;

        if (file != null) {
            imagePath = awsS3Service.uploadToS3(file);
        }

        Pairing pairing = pairingMapper.pairingPostToPairing(postPairing);
        pairing.setImagePath(imagePath);
        Pairing createPairing = pairingService.createPairing(pairing, isbn13);

        PairingDto.Response response = pairingMapper.pairingToPairingResponse(createPairing);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    @PatchMapping("/pairings/{pairing_id}/edit")
    public ResponseEntity patchPairing(
            @PathVariable("pairing_id") @Positive long pairingId,
            @RequestParam(value = "image") @Nullable MultipartFile file,
            @Valid @RequestPart(value = "patchPairingDto") PairingDto.Patch patchPairing) throws Exception {

        if (pairingService.findPairing(pairingId).getImage() == null && file == null) {

            Pairing pairing = pairingMapper.pairingPatchToPairing(patchPairing);
            Pairing updatedPairing = pairingService.updatePairing(pairing, pairingId);
            PairingDto.Response response = pairingMapper.pairingToPairingResponse(updatedPairing);

            return new ResponseEntity<>(
                    new SingleResponseDto<>(response), HttpStatus.OK);

        } else if (pairingService.findPairing(pairingId).getImage() == null && file != null) {

            String imagePath = awsS3Service.uploadToS3(file);
            Pairing pairing = pairingMapper.pairingPatchToPairing(patchPairing);
            pairing.setImagePath(imagePath);
            Pairing updatedPairing = pairingService.updatePairing(pairing, pairingId);
//            long imageId = imageService.savePairingImage(file, updatedPairing); // 이미지 새로 저장

            PairingDto.Response response = pairingMapper.pairingToPairingResponse(updatedPairing);

            return new ResponseEntity<>(
                    new SingleResponseDto<>(response), HttpStatus.OK);

        } else if (pairingService.findPairing(pairingId).getImage() != null && file == null) {

            Pairing pairing = pairingMapper.pairingPatchToPairing(patchPairing);
            pairing.setImagePath(null);
            Pairing updatedPairing = pairingService.updatePairing(pairing, pairingId);
            PairingDto.Response response = pairingMapper.pairingToPairingResponse(updatedPairing);

            return new ResponseEntity<>(
                    new SingleResponseDto<>(response), HttpStatus.OK);

        } else if (pairingService.findPairing(pairingId).getImage() != null && file != null) {

            awsS3Service.removeFromS3(pairingService.findPairing(pairingId).getImagePath()); // 기존 이미지 삭제
            String imagePath = awsS3Service.uploadToS3(file); // 새 이미지 저장
            Pairing pairing = pairingMapper.pairingPatchToPairing(patchPairing);
            pairing.setImagePath(imagePath);
            Pairing updatedPairing = pairingService.updatePairing(pairing, pairingId);

            PairingDto.Response response = pairingMapper.pairingToPairingResponse(updatedPairing);

            return new ResponseEntity<>(
                    new SingleResponseDto<>(response), HttpStatus.OK);

        } else return new ResponseEntity(null,HttpStatus.I_AM_A_TEAPOT);

    }

    @PatchMapping("/pairings/{pairing_id}/like")
    public ResponseEntity createPairingLike(@PathVariable("pairing_id") @Positive long pairingId) {


        likeService.createPairingLike(pairingId); // 좋아요 눌렀는지 검증

//        Pairing pairing = pairingMapper.pairingLikeToPairing(likePairing);
        Pairing updatedLikePairing = pairingService.addLike(pairingId);
        PairingDto.Response response = pairingMapper.pairingToPairingResponse(updatedLikePairing);

//        ------------------------------------------------------------
        noticeService.notifyUpdateLikePairingEvent(updatedLikePairing);
//        ------------------------------------------------------------

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }

    @PatchMapping("/pairings/{pairing_id}/dislike")
    public ResponseEntity deletePairingLike(@PathVariable("pairing_id") @Positive long pairingId) {


        likeService.deletePairingLike(pairingId); // 싫어요 눌렀는지 검증

//        Pairing pairing = pairingMapper.pairingLikeToPairing(likePairing);
        Pairing updatedLikePairing = pairingService.removeLike(pairingId);
        PairingDto.Response response = pairingMapper.pairingToPairingResponse(updatedLikePairing);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }

//    @PatchMapping("/pairings/{pairing_id}/like")
//    public ResponseEntity updateLikePairing(@RequestHeader("Authorization") long userId,
//                                            @PathVariable("pairing_id") @Positive long pairingId,
//                                            @Valid @RequestBody PairingDto.Like likePairing) {
//
//        likeService.createPairingLike(likePairing);
//
//        Pairing pairing = pairingService.updateLike(pairingMapper.pairingLikeToPairing(likePairing));
//
//        return new ResponseEntity<>(
//                new SingleResponseDto<>(pairingMapper.pairingToPairingResponse(pairing)), HttpStatus.OK
//        );
//    }

//    @PatchMapping("/pairings/{pairing_id}") // 조회 기능에 통합
//    public ResponseEntity updateViewPairing(@PathVariable("pairing_id") @Positive long pairingId) {
//
//        Pairing viewedPairing = pairingService.updateView(pairingId);
//        PairingDto.Response response = pairingMapper.pairingToPairingResponse(viewedPairing);
//
//        return new ResponseEntity<>(
//                new SingleResponseDto<>(response), HttpStatus.OK
//        );
//    }

    @GetMapping("/pairings/{pairing_id}")
    public ResponseEntity getPairing(
            @RequestHeader("Authorization") @Valid @Nullable String token,
            @PathVariable("pairing_id") @Positive long pairingId) {
        if (token == null) {

            Pairing pairing = pairingService.updateView(pairingId);
            pairing.setIsLiked(null);
            pairing.setIsBookmarked(null);
            PairingDto.Response response = pairingMapper.pairingToPairingResponse(pairing);

            if (pairing.getImage() != null) {
                response.setImagePath(pairing.getImage().getStoredPath());
            }

            return new ResponseEntity<>(
                    new SingleResponseDto<>(response), HttpStatus.OK);
        } else {

            Pairing pairing = pairingService.updateView(pairingId);
            pairingService.isBookMarkedPairing(pairing);   //북마크 여부 확인용 로직 추가
            Pairing isLikedComments = pairingService.isLikedComments(pairingId);
            PairingDto.Response response = pairingMapper.pairingToPairingResponse(pairing);

            if (pairing.getImage() != null) {
                response.setImagePath(pairing.getImage().getStoredPath());
            }

            return new ResponseEntity<>(
                    new SingleResponseDto<>(response), HttpStatus.OK);
        }
    }

    //    --------------------------------------------------------------------------------------------
//    --------------------------------------------------------------------------------------------
//    조회 API 세분화
//    --------------------------------------------------------------------------------------------
//    --------------------------------------------------------------------------------------------
    @GetMapping("/pairings/likes") // 좋아요 > 최신순 슬라이스로 받기
    public ResponseEntity getPairings() {

        List<Pairing> pairingList = pairingService.findPairings();
        SliceImpl<PairingDto.Response> responses = pairingMapper.pairingsToPairingResponses(pairingList);

        return new ResponseEntity<>(
                new SingleResponseDto<>(responses), HttpStatus.OK
        );
    }

    @GetMapping("/pairings/newest") // 최신순 슬라이스로 받기
    public ResponseEntity getPairingsNewest() {

        List<Pairing> pairingList = pairingService.findPairingsNewest();
        SliceImpl<PairingDto.Response> responses = pairingMapper.pairingsToPairingResponses(pairingList);

//        Slice<Pairing> slicePairings = pairingService.findPairingsNewest();
//        List<PairingDto.Response> responses = pairingMapper.pairingsToPairingResponses(listPairings);

        return new ResponseEntity<>(
                new SingleResponseDto<>(responses), HttpStatus.OK
        );
    }

    @GetMapping("/pairings/film/likes") // 필름 카테고리 좋아요 순 슬라이스로 받기
    public ResponseEntity getFilmPairingsLikes() {

        List<Pairing> pairingList = pairingService.findFilmPairingsLikes();
        SliceImpl<PairingDto.Response> responses = pairingMapper.pairingsToPairingResponses(pairingList);

        return new ResponseEntity<>(
                new SingleResponseDto<>(responses), HttpStatus.OK
        );
    }

    @GetMapping("/pairings/film/newest") // 필름 카테고리 좋아요 순 슬라이스로 받기
    public ResponseEntity getFilmPairingsNewest() {

        List<Pairing> pairingList = pairingService.findFilmPairingsNewest();
        SliceImpl<PairingDto.Response> responses = pairingMapper.pairingsToPairingResponses(pairingList);

        return new ResponseEntity<>(
                new SingleResponseDto<>(responses), HttpStatus.OK
        );
    }

    @GetMapping("/pairings/cuisine/likes") // 음식/장소 카테고리 좋아요 순 슬라이스로 받기
    public ResponseEntity getCuisinePairingsLikes() {

        List<Pairing> pairingList = pairingService.findCuisinePairingsLikes();
        SliceImpl<PairingDto.Response> responses = pairingMapper.pairingsToPairingResponses(pairingList);

        return new ResponseEntity<>(
                new SingleResponseDto<>(responses), HttpStatus.OK
        );
    }

    @GetMapping("/pairings/cuisine/newest") // 음식/장소 카테고리 좋아요 순 슬라이스로 받기
    public ResponseEntity getCuisinePairingsNewest() {

        List<Pairing> pairingList = pairingService.findCuisinePairingsNewest();
        SliceImpl<PairingDto.Response> responses = pairingMapper.pairingsToPairingResponses(pairingList);

        return new ResponseEntity<>(
                new SingleResponseDto<>(responses), HttpStatus.OK
        );
    }

    @GetMapping("/pairings/music/likes") // 음악 카테고리 좋아요 순 슬라이스로 받기
    public ResponseEntity getMusicPairingsLikes() {

        List<Pairing> pairingList = pairingService.findMusicPairingsLikes();
        SliceImpl<PairingDto.Response> responses = pairingMapper.pairingsToPairingResponses(pairingList);

        return new ResponseEntity<>(
                new SingleResponseDto<>(responses), HttpStatus.OK
        );
    }

    @GetMapping("/pairings/music/newest") // 음악 카테고리 좋아요 순 슬라이스로 받기
    public ResponseEntity getMusicPairingsNewest() {

        List<Pairing> pairingList = pairingService.findMusicPairingsNewest();
        SliceImpl<PairingDto.Response> responses = pairingMapper.pairingsToPairingResponses(pairingList);

        return new ResponseEntity<>(
                new SingleResponseDto<>(responses), HttpStatus.OK
        );
    }

    @GetMapping("/pairings/book/likes") // 책 카테고리 좋아요 순 슬라이스로 받기
    public ResponseEntity getBookPairingsLikes() {

        List<Pairing> pairingList = pairingService.findBookPairingsLikes();
        SliceImpl<PairingDto.Response> responses = pairingMapper.pairingsToPairingResponses(pairingList);

        return new ResponseEntity<>(
                new SingleResponseDto<>(responses), HttpStatus.OK
        );
    }

    @GetMapping("/pairings/book/newest") // 책 카테고리 좋아요 순 슬라이스로 받기
    public ResponseEntity getBookPairingsNewest() {

        List<Pairing> pairingList = pairingService.findBookPairingsNewest();
        SliceImpl<PairingDto.Response> responses = pairingMapper.pairingsToPairingResponses(pairingList);

        return new ResponseEntity<>(
                new SingleResponseDto<>(responses), HttpStatus.OK
        );
    }

    @GetMapping("/pairings/etc/likes") // 기타 카테고리 좋아요 순 슬라이스로 받기
    public ResponseEntity getEtcPairingsLikes() {

        List<Pairing> pairingList = pairingService.findEtcPairingsLikes();
        SliceImpl<PairingDto.Response> responses = pairingMapper.pairingsToPairingResponses(pairingList);

        return new ResponseEntity<>(
                new SingleResponseDto<>(responses), HttpStatus.OK
        );
    }

    @GetMapping("/pairings/etc/newest") // 기타 카테고리 좋아요 순 슬라이스로 받기
    public ResponseEntity getEtcPairingsNewest() {

        List<Pairing> pairingList = pairingService.findEtcPairingsNewest();
        SliceImpl<PairingDto.Response> responses = pairingMapper.pairingsToPairingResponses(pairingList);

        return new ResponseEntity<>(
                new SingleResponseDto<>(responses), HttpStatus.OK
        );
    }

//    --------------------------------------------------------------------------------------------
//    --------------------------------------------------------------------------------------------

    @GetMapping("/pairing/best")
    public ResponseEntity bestTenPairings() {
        List<Pairing> response = pairingService.findBestPairingsLikes();

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }


    @DeleteMapping("/pairings/{pairing_id}/delete")
    public ResponseEntity deletePairing(@PathVariable("pairing_id") @Positive long pairingId) {

        pairingService.deletePairing(pairingId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/pairings/delete")
    public ResponseEntity deletePairings() {

        pairingService.deletePairings();

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/pairings/{pairing-id}/bookmark")
    @ResponseStatus(HttpStatus.OK)
    public PairingDto.Response bookmarkPairing(@PathVariable("pairing-id") Long pairingId) {
        bookmarkService.bookmarkPairing(pairingId);
        Pairing findPairing = pairingService.findVerifiedPairing(pairingId);
        PairingDto.Response response = pairingMapper.pairingToPairingResponse(findPairing);
        return response;
    }

}