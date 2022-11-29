package seb40_main_012.back.common.image;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import marvin.image.MarvinImage;
import org.marvinproject.image.transform.scale.Scale;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import seb40_main_012.back.advice.BusinessLogicException;
import seb40_main_012.back.advice.ExceptionCode;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.Arrays;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AwsS3Service {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    public String uploadToS3(MultipartFile files) throws Exception {
        validateFileExists(files);

        if (files.isEmpty()) {
            return null;
        }

        String originalImageName = files.getOriginalFilename(); // 원래 파일 이름

        String uuid = UUID.randomUUID().toString(); // 파일 이름으로 사용할 UUID 생성

        String extension = files.getContentType().substring(files.getContentType().lastIndexOf("/") + 1); // 확장자 추출

        String[] extensions = {"png", "jpg", "jpeg"};

        if (!Arrays.asList(extensions).contains(extension)) {
            throw new IllegalArgumentException("지원하지 않는 포맷입니다.");
        }

        String storedImageName = uuid +'.'+ extension; // 파일 이름 + 확장자

        MultipartFile resizedFile = resizeImage(files, extension, storedImageName, 500);

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(resizedFile.getSize());
        objectMetadata.setContentType(resizedFile.getContentType());

        InputStream inputStream = resizedFile.getInputStream();

        amazonS3Client.putObject(new PutObjectRequest(bucketName, "pairingImages/" + storedImageName, inputStream, objectMetadata)
                .withCannedAcl(CannedAccessControlList.PublicRead));

        return amazonS3Client.getUrl(bucketName, "pairingImages/" + storedImageName).toString();
    }

    public String uploadProfileImageToS3(MultipartFile files) throws Exception {
        validateFileExists(files);

        if (files.isEmpty()) {
            return null;
        }

        String originalImageName = files.getOriginalFilename(); // 원래 파일 이름

        String uuid = UUID.randomUUID().toString(); // 파일 이름으로 사용할 UUID 생성

        String extension = files.getContentType().substring(files.getContentType().lastIndexOf("/") + 1); // 확장자 추출

        String[] extensions = {"png", "jpg", "jpeg"};

        if (!Arrays.asList(extensions).contains(extension)) {
            throw new IllegalArgumentException("지원하지 않는 포맷입니다.");
        }

        String storedImageName = uuid +'.'+ extension; // 파일 이름 + 확장자

        MultipartFile resizedFile = resizeImage(files, extension, storedImageName, 160);

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(resizedFile.getSize());
        objectMetadata.setContentType(resizedFile.getContentType());

        InputStream inputStream = resizedFile.getInputStream();

        amazonS3Client.putObject(new PutObjectRequest(bucketName, "profileImages/" + storedImageName, inputStream, objectMetadata)
                .withCannedAcl(CannedAccessControlList.PublicRead));

        return amazonS3Client.getUrl(bucketName, "profileImages/" + storedImageName).toString();
    }

    public void removeFromS3(String imagePath) {
        amazonS3Client.deleteObject(bucketName, imagePath);
    }

    private void validateFileExists(MultipartFile multipartFile) {
        if (multipartFile.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.NOT_FOUND);
        }
    }

    private MultipartFile resizeImage(MultipartFile file, String extension, String storedImageName, int limit) throws Exception {

        BufferedImage image = ImageIO.read(file.getInputStream());

        int width = image.getWidth();
        int height = image.getHeight();

        MarvinImage marvinImage = new MarvinImage(image);

        Scale scale = new Scale();

        if (width <= 500 && height <= 500) {
            return file;
        } else if (width <= 500 && height > 500) {
            scale.load();
            scale.setAttribute("newHeight", limit);
            scale.setAttribute("newWidth", limit * width / height);
        } else if (width > 500 && height <= 500) {
            scale.load();
            scale.setAttribute("newHeight", limit * height / width);
            scale.setAttribute("newWidth", limit);
        } else if (width > 500 && height > 500) {
            if (width >= height) {
                scale.load();
                scale.setAttribute("newHeight", limit * height / width);
                scale.setAttribute("newWidth", limit);
            } else if (width <= height) {
                scale.load();
                scale.setAttribute("newHeight", limit);
                scale.setAttribute("newWidth", limit * width / height);
            }
        }
        scale.process(marvinImage.clone(), marvinImage, null, null, false);

        BufferedImage imageNoAlpha = marvinImage.getBufferedImageNoAlpha();
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        ImageIO.write(imageNoAlpha, extension, byteArrayOutputStream);

        byteArrayOutputStream.flush();

        return new MockMultipartFile(storedImageName, byteArrayOutputStream.toByteArray());

    }
}
