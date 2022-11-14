package seb40_main_012.back.common.comment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import seb40_main_012.back.common.comment.entity.CommentType;
import seb40_main_012.back.user.dto.UserDto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

public class CommentDto {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Post {

        @NotBlank(message = "내용을 입력하셔야 합니다.")
        @Size(min = 5, max = 1000, message = "5자 이상 입력하셔야 합니다.")
        private String body;

    }

    @Data
    @Builder
    public static class Patch {

        private long commentId;

        @NotBlank(message = "내용을 입력하셔야 합니다.")
        @Size(min = 5, max = 1000, message = "5자 이상 입력하셔야 합니다.")
        private String body;

    }

    @Data
    @Builder
    public static class View {

        private long commentId;
        private long view;

    }

    @Data
    @Builder
    public static class Like {

        private long commentId;
//        private long userId;
        private long like;

    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {

        private long commentId;
        private UserDto.ResponseDto userInformation;
        private CommentType commentType;
        private String body;
        private long likeCount;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;

    }
}
