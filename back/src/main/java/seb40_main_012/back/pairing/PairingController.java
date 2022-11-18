package seb40_main_012.back.pairing;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import seb40_main_012.back.book.BookService;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.common.like.LikeService;
import seb40_main_012.back.dto.SingleResponseDto;
import seb40_main_012.back.pairing.entity.Pairing;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/books")
public class PairingController {

    private final PairingService pairingService;
    private final PairingMapper pairingMapper;
    private final BookService bookService;
    private final LikeService likeService;

    @PostMapping("/{isbn13}/pairings/add")
    public ResponseEntity postPairing(
//            @RequestHeader("Authorization") long userId,
            @PathVariable("isbn13") @Positive String isbn13,
            @Valid @RequestBody PairingDto.Post postPairing) {

        Pairing pairing = pairingMapper.pairingPostToPairing(postPairing);
        Pairing createPairing = pairingService.createPairing(pairing, isbn13);
        PairingDto.Response response = pairingMapper.pairingToPairingResponse(createPairing);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.CREATED);

//        EntityModel<Pairing> entityModel = EntityModel.of(pairingService.createPairing(pairing, bookId),
//                linkTo(methodOn(PairingDto.Post.class).getOutLinkPath()).withRel("link"));

//        return ResponseEntity
//                .created(entityModel.getRequiredLink(IanaLinkRelations.SEARCH).toUri())
//                .body(entityModel);
    }

    @PatchMapping("/pairings/{pairing_id}/edit")
    public ResponseEntity patchPairing(@PathVariable("pairing_id") @Positive long pairingId,
                                       @Valid @RequestBody PairingDto.Patch patchPairing) {

        Pairing pairing = pairingMapper.pairingPatchToPairing(patchPairing);
        Pairing updatedPairing = pairingService.updatePairing(pairing, pairingId);
        PairingDto.Response response = pairingMapper.pairingToPairingResponse(updatedPairing);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK);

//        EntityModel<Pairing> entityModel = EntityModel.of(pairingService.updatePairing(pairing, pairingId),
//                linkTo(methodOn(PairingDto.Patch.class).getOutLinkPath()).withRel("link"));
//
//        return ResponseEntity
//                .ok()
//                .body(entityModel);
    }

    @PatchMapping("/pairings/{pairing_id}/like")
    public ResponseEntity updateLikePairing(@PathVariable("pairing_id") @Positive long pairingId,
                                            @Valid @RequestBody PairingDto.Like likePairing) {


        likeService.createPairingLike(pairingId); // 좋아요 눌렀는지 검증

        Pairing pairing = pairingMapper.pairingLikeToPairing(likePairing);
        Pairing updatedLikePairing = pairingService.updateLike(pairing, pairingId);
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
    public ResponseEntity getPairing(@PathVariable("pairing_id") @Positive long pairingId) {

        Pairing pairing = pairingService.updateView(pairingId);
        PairingDto.Response response = pairingMapper.pairingToPairingResponse(pairing);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }

//    @GetMapping("/pairings") // 페이지네이션으로 받기
//    public ResponseEntity getPairings(@Positive @RequestParam int page,
//                                      @Positive @RequestParam(required = false, defaultValue = "15") int size) {
//
//        Page<Pairing> pagePairings = pairingService.findPairings(page - 1, size);
//        List<Pairing> pairings = pagePairings.getContent();
//        List<PairingDto.Response> responses = pairingMapper.pairingsToPairingResponses(pairings);
//
//        return new ResponseEntity<>(
//                new MultiResponseDto<>(responses, pagePairings), HttpStatus.OK
//        );
//    }

//    @GetMapping("/pairings") // 리스트로 받기
//    public ResponseEntity getPairings() {
//
//        List<Pairing> listPairings = pairingService.findPairings();
//        List<PairingDto.Response> responses = pairingMapper.pairingsToPairingResponses(listPairings);
//
//        return new ResponseEntity<>(
//                new SingleResponseDto<>(responses), HttpStatus.OK
//        );
//    }

//    --------------------------------------------------------------------------------------------
//    --------------------------------------------------------------------------------------------
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

    @PostMapping("/pairings/{pairing-id}/bookmark")
    @ResponseStatus(HttpStatus.OK)
    public boolean bookmarkPairing(@RequestHeader("Authorization") Long userId, @PathVariable("pairing-id") Long pairingId){
        return pairingService.bookmarkPairing(userId,pairingId);
    }


}
