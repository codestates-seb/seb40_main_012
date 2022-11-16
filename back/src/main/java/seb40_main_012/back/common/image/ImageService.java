package seb40_main_012.back.common.image;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import seb40_main_012.back.advice.BusinessLogicException;
import seb40_main_012.back.advice.ExceptionCode;

import java.io.File;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class ImageService {

    private final ImageRepository imageRepository;

    @Value("")
    private String imageDir;

    public Long saveImage(MultipartFile files) throws IOException {
        if (files.isEmpty()) {return null;}

        String originalImageName = files.getOriginalFilename(); // 원래 파일 이름

        String uuid = UUID.randomUUID().toString(); // 파일 이름으로 사용할 UUID 생성

        String extension = originalImageName.substring(originalImageName.lastIndexOf(".")); // 확장자 추출

        String storedImageName = uuid + extension; // 파일 이름 + 확장자

        String storedPath = imageDir + storedImageName; // 파일 불러올 때 사용할 경

        Image image = Image.builder()
                .originalImageName(originalImageName)
                .storedImageName(storedImageName)
                .storedPath(storedPath)
                .build();

        files.transferTo(new File(storedPath));

        Image storedImage = imageRepository.save(image);

        return storedImage.getImageId();
    }

    public Image updateImage(Image image) {
        return null;
    }

    public Image findImage(long imageId) {
        return findVerifiedImage(imageId);
    }

    public void deleteImage(long imageId) {
        Image findImage = findVerifiedImage(imageId);
        imageRepository.delete(findImage);
    }

    public void verifyImage(long userId, Image image) {
    }

    public Image findVerifiedImage(long imageId) {
        Optional<Image> optionalImage = imageRepository.findById(imageId);
        return optionalImage.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.IMAGE_NOT_FOUND));
    }
}
