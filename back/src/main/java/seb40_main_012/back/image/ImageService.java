package seb40_main_012.back.image;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.comment.entity.Comment;

@Service
@Transactional
public class ImageService {

    public Image createImage(Image image) {
        return null;
    }

    public Image updateImage(Image image) {
        return null;
    }

    public Image findImage(long imageId) {
        return null;
    }

    public void deleteImage(long imageId) {
    }

    public void verifyImage(long userId, Image image) {
    }

    public void findVerifiedImage(long imageId) {
    }
}
