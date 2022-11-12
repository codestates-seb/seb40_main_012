package seb40_main_012.back.bookWiki;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/api/books")
public class BookWikiController {

    @PostMapping("/{book_id}/add")
    public ResponseEntity postBookWiki() {
        return null;
    }

    @PatchMapping("/{bookWikiId}/edit")
    public ResponseEntity patchBookWiki() {
        return null;
    }

    @GetMapping("/{bookWiki_id}")
    public ResponseEntity getBookWiki() {
        return null;
    }

    @DeleteMapping("/{bookWiki_id}/delete")
    public ResponseEntity deleteBookWiki() {
        return null;
    }
}
