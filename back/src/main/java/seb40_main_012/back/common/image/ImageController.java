package seb40_main_012.back.common.image;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriUtils;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.Positive;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Validated
@RestController
@RequestMapping("/api/images")
public class ImageController {

    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @Value("${/Users/gnidinger/Desktop/}")
    private String imageDirectory;

    @GetMapping("/upload")
    public String newImage() {
        return "upload-form";
    }

    @PostMapping("/upload")
    public String uploadImage(@RequestParam String imageName,
                              @RequestParam MultipartFile file,
                              HttpServletRequest request) throws IOException {

        log.info("request = {}", request);
        log.info("sampleStringData = {}", imageName);
        log.info("multipartFile = {}", file);

        if (!file.isEmpty()) {
            String downloadPath = imageDirectory + file.getOriginalFilename();

            log.info("Image Download Path = {}", downloadPath);

            file.transferTo(new File(downloadPath));
        }

        return "upload-form";
    }

    @GetMapping("/{image_id}")
    public ResponseEntity<Resource> downloadImage(@PathVariable("image_id") @Positive long imageId) throws MalformedURLException {

        Image findImage = imageService.findImage(imageId);
        String storedImageName = findImage.getStoreImageName();
        String uploadImageName = findImage.getUploadImageName();

        UrlResource resource = new UrlResource("image:" + imageDirectory + storedImageName);

        log.info("uploadImageName = {}", uploadImageName);

        String encodedUploadImageName = UriUtils.encode(uploadImageName, StandardCharsets.UTF_8);
        String imageDisposition = "attachment; filename=\"" + encodedUploadImageName + "\"";

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, imageDisposition)
                .body(resource);
    }

    @PostMapping
    public ResponseEntity postImage() {
        return null;
    }

    @PatchMapping
    public ResponseEntity patchImage() {
        return null;
    }

    @GetMapping
    public ResponseEntity getImage() {
        return null;
    }

    @GetMapping
    public ResponseEntity getImages() {
        return null;
    }
}
