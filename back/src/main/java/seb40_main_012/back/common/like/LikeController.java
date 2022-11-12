package seb40_main_012.back.common.like;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;

public class LikeController {

    @PostMapping
    public ResponseEntity postLike() {
        return null;
    }

    @PatchMapping
    public ResponseEntity patchLike() {
        return null;
    }

    @GetMapping
    public ResponseEntity getLike() {
        return null;
    }

    @GetMapping
    public ResponseEntity getLikes() {
        return null;
    }
}
