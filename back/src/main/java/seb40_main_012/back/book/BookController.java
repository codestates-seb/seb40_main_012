package seb40_main_012.back.book;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Validated
@RestController
@RequestMapping
public class BookController {

//    @GetMapping
//    public ResponseEntity postBook() {
//
//        Map<Object, Object> map = new HashMap<>();
//        map.put("testId", "corsTest");
//        map.put("testBody", "Cors Test Body");
//
//        System.out.println("# CORS TEST");
//
//        return new ResponseEntity<>(map, HttpStatus.OK);
//    }
}
