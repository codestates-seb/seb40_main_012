package seb40_main_012.back.common.image;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb40_main_012.back.advice.BusinessLogicException;
import seb40_main_012.back.advice.ExceptionCode;
import seb40_main_012.back.common.comment.entity.Comment;

import java.util.Optional;

@Service
@Transactional
public class ImageService {

    private final ImageService imageService;
    private final ImageRepository imageRepository;

    public ImageService(ImageService imageService, ImageRepository imageRepository) {
        this.imageService = imageService;
        this.imageRepository = imageRepository;
    }

    public Image createImage(Image image) {
        return null;
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
