package seb40_main_012.back.bookWiki;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import seb40_main_012.back.dto.SingleResponseDto;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@Validated
@Transactional
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/books")
public class BookWikiController {

    private final BookWikiService bookWikiService;
    private final BookWikiMapper bookWikiMapper;

    @PostMapping("/{isbn13}/wikis/add")
    public ResponseEntity postBookWiki(@PathVariable("isbn13") @Positive String isbn13,
                                       @Valid @RequestBody BookWikiDto.Post postBookWiki) {

        BookWiki bookWiki = bookWikiMapper.bookWikiPostToBookWiki(postBookWiki);
        BookWiki createdBookWiki = bookWikiService.createBookWiki(isbn13, bookWiki);
        BookWikiDto.Response response = bookWikiMapper.bookWikiToBookWikiResponse(createdBookWiki);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.CREATED
        );
    }

    @PatchMapping("/wikis/{bookWiki_id}/edit")
    public ResponseEntity patchBookWiki(@PathVariable("bookWiki_id") @Positive long bookWikiId,
                                        @Valid @RequestBody BookWikiDto.Patch patchBookWiki) {

        BookWiki bookWiki = bookWikiMapper.bookWikiPatchToBookWiki(patchBookWiki);
        BookWiki updatedBookWiki = bookWikiService.updateBookWiki(bookWiki, bookWikiId);
        BookWikiDto.Response response = bookWikiMapper.bookWikiToBookWikiResponse(updatedBookWiki);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }

    @GetMapping("/wikis/{bookWiki_id}")
    public ResponseEntity getBookWiki(@PathVariable("bookWiki_id") @Positive long bookWikiId) {

        bookWikiService.updateView(bookWikiId); // 조회수 올리기

        BookWiki bookWiki = bookWikiService.findBookWiki(bookWikiId);
        BookWikiDto.Response response = bookWikiMapper.bookWikiToBookWikiResponse(bookWiki);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }

    //    --------------------------------------------------------------------------------------------
    //    --------------------------------------------------------------------------------------------
    @DeleteMapping("/wikis/{bookWiki_id}/delete") //필요한가?
    public ResponseEntity deleteBookWiki() {
        return null;
    }
    //    --------------------------------------------------------------------------------------------
    //    --------------------------------------------------------------------------------------------
}
