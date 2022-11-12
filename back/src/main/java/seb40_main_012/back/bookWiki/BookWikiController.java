package seb40_main_012.back.bookWiki;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import seb40_main_012.back.dto.SingleResponseDto;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/books")
public class BookWikiController {

    private final BookWikiService bookWikiService;
    private final BookWikiMapper bookWikiMapper;

    @PostMapping("/{book_id}/wiki/add")
    public ResponseEntity postBookWiki(@PathVariable("book_id") @Positive long bookId,
                                       @Valid @RequestBody BookWikiDto.Post postBookWiki) {

        BookWiki bookWiki = bookWikiMapper.bookWikiPostToBookWiki(postBookWiki);
        BookWiki createdBookWiki = bookWikiService.createBookWiki(bookWiki);
        BookWikiDto.Response response = bookWikiMapper.bookWikiTOBookWikiResponse(createdBookWiki);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.CREATED
        );
    }

    @PatchMapping("/{bookWiki_Id}/edit")
    public ResponseEntity patchBookWiki(@PathVariable("bookWiki_id") @Positive long bookWikiId,
                                        @Valid @RequestBody BookWikiDto.Patch patchBookWiki) {

        BookWiki bookWiki = bookWikiMapper.bookWikiPatchToBookWiki(patchBookWiki);
        BookWiki updatedBookWiki = bookWikiService.updateBookWiki(bookWiki, bookWikiId);
        BookWikiDto.Response response = bookWikiMapper.bookWikiTOBookWikiResponse(updatedBookWiki);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }

    @GetMapping("/{bookWiki_id}")
    public ResponseEntity getBookWiki(@PathVariable("bookWiki_id") @Positive long bookWikiId) {

        BookWiki bookWiki = bookWikiService.findBookWiki(bookWikiId);
        BookWikiDto.Response response = bookWikiMapper.bookWikiTOBookWikiResponse(bookWiki);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }

    //    --------------------------------------------------------------------------------------------
    //    --------------------------------------------------------------------------------------------
    @DeleteMapping("/{bookWiki_id}/delete") //필요한가?
    public ResponseEntity deleteBookWiki() {
        return null;
    }
    //    --------------------------------------------------------------------------------------------
    //    --------------------------------------------------------------------------------------------
}
