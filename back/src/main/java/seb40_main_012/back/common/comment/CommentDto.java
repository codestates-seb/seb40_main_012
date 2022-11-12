package seb40_main_012.back.common.comment;

import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

public class CommentDto {

    @Data
    public static class Post {

        @NotBlank(message = "내용을 입력하셔야 합니다.")
        @Size(min = 5, max = 1000, message = "5자 이상 입력하셔야 합니다.")
        private String body;

    }

    @Data
    public static class Patch {

        private long commentId;

        @NotBlank(message = "내용을 입력하셔야 합니다.")
        @Size(min = 5, max = 1000, message = "5자 이상 입력하셔야 합니다.")
        private String body;

    }

    @Data
    @Builder
    public static class Response {

        private long commentId;
        //        private UserDto.Response userInformation;
        private String commentType;
        private String body;
        private long likeCount;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;

    }

    @Data
    public static class View {

        private long commentId;
        private long view;

    }

    @Data
    public static class Like {

        private long commentId;
        private long userId;
        private long like;

    }
}
