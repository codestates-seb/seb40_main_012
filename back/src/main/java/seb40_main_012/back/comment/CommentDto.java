package seb40_main_012.back.comment;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Data
public class CommentDto {

    public static class Post {

        @NotBlank(message = "내용을 입력하셔야 합니다.")
        @Size(min = 20, message = "20자 이상 입력하셔야 합니다.")
        private String body;

    }

    public static class Patch {

        private long commentId;

        @NotBlank(message = "내용을 입력하셔야 합니다.")
        @Size(min = 20, message = "20자 이상 입력하셔야 합니다.")
        private String body;

    }

    public static class Response {

        private long commentId;
//        private UserDto.Response userInformation;
        private String body;
        private String commentType;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;

    }
}
