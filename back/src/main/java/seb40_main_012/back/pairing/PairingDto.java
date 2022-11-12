package seb40_main_012.back.pairing;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import seb40_main_012.back.common.comment.CommentDto;
import seb40_main_012.back.pairing.entity.Category;
import seb40_main_012.back.user.dto.UserDto;

import javax.persistence.Column;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
public class PairingDto {

    @Data
    public static class Post {

        @NotEmpty(message = "내용을 입력하셔야 합니다.")
        @Size(min = 20, message = "20자 이상 입력하셔야 합니다.")
        private String body;

        @NotEmpty(message = "카테고리를 선택하셔야 합니다.")
        private Category category;

        private String imagePath;

        private String outLinkPath;

    }

    @Data
    public static class Patch {

        private long pairingID;

        @NotEmpty(message = "내용을 입력하셔야 합니다.")
        @Size(min = 20, message = "20자 이상 입력하셔야 합니다.")
        private String body;

        private String imagePath;

        private String outLinkPath;

    }

    public static class Response {

        private long bookId;
        private long pairingId;
        private UserDto.ResponseDto userInformation;
        private Category category;
        private String body;
        private long likeCount;
        private String imagePath;
        private String outLinkPath;
        private List<CommentDto.Response> comments;
        private LocalDateTime createdAt = LocalDateTime.now();
        private LocalDateTime modifiedAt = LocalDateTime.now();

    }

    public static class View {

        private long pairingId;
        private long view;

    }

    @Data
    public static class Like {

        private long pairingId;
        private long userId;
        private long like;

    }

}
