package seb40_main_012.back.pairing;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import seb40_main_012.back.common.comment.CommentDto;
import seb40_main_012.back.pairing.entity.Category;
import seb40_main_012.back.user.dto.UserDto;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

public class PairingDto {

    @Data
    public static class Post {

        @NotEmpty(message = "내용을 입력하셔야 합니다.")
        @Size(max = 30, message = "30자를 넘을 수 없습니다.")
        private String title;

        @NotEmpty(message = "내용을 입력하셔야 합니다.")
        @Size(max = 500, message = "500자를 넘을 수 없습니다.")
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
        @Size(max = 30, message = "30자를 넘을 수 없습니다.")
        private String title;

        @NotEmpty(message = "내용을 입력하셔야 합니다.")
        @Size(max = 500, message = "500자를 넘을 수 없습니다.")
        private String body;

        private String imagePath;

        private String outLinkPath;

    }

    @Data
    @Builder
    public static class View {

        private long pairingId;
        private long view;

    }

    @Data
    @Builder
    public static class Like {

        private long pairingId;
        private long userId;
        private long like;

    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {

        private long bookId;
        private long pairingId;
        private UserDto.ResponseDto userInformation;
        private Category category;
        private String title;
        private String body;
        private long likeCount;
        private String imagePath;
        private String outLinkPath;
        private List<CommentDto.Response> comments;
        private LocalDateTime createdAt = LocalDateTime.now();
        private LocalDateTime modifiedAt = LocalDateTime.now();

    }

}
