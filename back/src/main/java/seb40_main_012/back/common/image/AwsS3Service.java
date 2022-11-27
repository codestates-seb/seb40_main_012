package seb40_main_012.back.common.image;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import seb40_main_012.back.advice.BusinessLogicException;
import seb40_main_012.back.advice.ExceptionCode;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AwsS3Service {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    public String uploadToS3(MultipartFile files) throws IOException {
        validateFileExists(files);

        if (files.isEmpty()) {
            return null;
        }

        String originalImageName = files.getOriginalFilename(); // 원래 파일 이름

        String uuid = UUID.randomUUID().toString(); // 파일 이름으로 사용할 UUID 생성

        String extension = originalImageName.substring(originalImageName.lastIndexOf(".")); // 확장자 추출

        String storedImageName = uuid + extension; // 파일 이름 + 확장자

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(files.getContentType());

        InputStream inputStream = files.getInputStream();

        amazonS3Client.putObject(new PutObjectRequest(bucketName, storedImageName, inputStream, objectMetadata)
                .withCannedAcl(CannedAccessControlList.PublicRead));


        return amazonS3Client.getUrl(bucketName, storedImageName).toString();
    }

    public void removeFromS3(String imagePath) {
        amazonS3Client.deleteObject(bucketName, imagePath);
    }

    private void validateFileExists(MultipartFile multipartFile) {
        if (multipartFile.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.NOT_FOUND);
        }
    }
}
