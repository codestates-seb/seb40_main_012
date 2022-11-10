package seb40_main_012.back.pairing;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping
public class PairingController {

    @PostMapping
    public ResponseEntity postPairing() {
        return null;
    }

    @PatchMapping
    public ResponseEntity patchPairing() {
        return null;
    }

    @GetMapping
    public ResponseEntity getPairing() {
        return null;
    }

    @GetMapping
    public ResponseEntity getPairings() {
        return null;
    }
}
