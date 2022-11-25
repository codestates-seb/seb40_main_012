package seb40_main_012.back.common.image;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.util.UriUtils;

import javax.validation.constraints.Positive;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.charset.StandardCharsets;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/images")
public class ImageController {

    private final ImageService imageService;
    private final ImageRepository imageRepository;

//    @GetMapping("/upload")
//    public String testUploadForm() {
//        return "upload-form";
//    }

    @PostMapping("/upload")
    public String uploadImage(
            @RequestParam("image") MultipartFile file
//            ,@RequestParam("files") @Nullable List<MultipartFile> files
    ) throws IOException { // 이미지 업로드

        Long savedImageId = imageService.saveImage(file);

        Image savedImage = imageService.findImage(savedImageId);

        log.info("multipartFile = {}", file);

//        for (MultipartFile multipartFile : files) {
//            imageService.saveImage(multipartFile);
//        }
        System.out.println(savedImage.getStoredPath());

        return "redirect:/";
    }

//    @GetMapping("/{image_id}")
//    public String viewImage(Model model) {
//
//        List<Image> images = imageRepository.findAll();
//        model.addAttribute("all", images);
//
//        return "view";
//    }

    @GetMapping("/{image_id}")
    public Resource viewImage(@PathVariable("image_id") @Positive long imageId,
                              Model model) throws IOException { // 이미지 조회

        Image image = imageRepository.findById(imageId).orElse(null);

        return new UrlResource("image: " + image.getStoredPath());
    }

    @GetMapping("/{image_id}/download")
    public ResponseEntity<Resource> downloadImage(@PathVariable("image_id") @Positive long imageId)
            throws MalformedURLException { // 이미지 다운로드

        Image image = imageRepository.findById(imageId).orElse(null);
        UrlResource resource = new UrlResource("image: " + image.getStoredPath());
        String encodedImageName = UriUtils.encode(image.getOriginalImageName(), StandardCharsets.UTF_8);

        log.info("encodedImageName = {}", encodedImageName);

        // 파일 다운로드 대화상자 헤더 설정
        // Content-Disposition 헤더에 attachment; file = "업로드 파일명" 값을 준다.
        String imageDisposition = "attachment; filename=\"" + encodedImageName + "\"";

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, imageDisposition)
                .body(resource);
    }

    @Bean
    public MultipartResolver multipartResolver() {
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
        multipartResolver.setMaxUploadSize(2000000000);
        return multipartResolver;
    }

}
