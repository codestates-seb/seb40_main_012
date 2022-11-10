package seb40_main_012.back.comment;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Validated
@RestController
@RequestMapping
public class CommentController {

    @PostMapping
    public ResponseEntity postBookComment() {
        return null;
    }

    @PostMapping
    public ResponseEntity postPairingComment() {
        return null;
    }

    @PostMapping
    public ResponseEntity postBookCollectionComment() {
        return null;
    }

    @PatchMapping
    public ResponseEntity patchComment() {
        return null;
    }

    @GetMapping
    public ResponseEntity getComment() {
        return null;
    }

    @GetMapping
    public ResponseEntity getComments() {
        return null;
    }
}
