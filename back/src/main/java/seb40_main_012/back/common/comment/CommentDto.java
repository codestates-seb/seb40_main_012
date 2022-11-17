package seb40_main_012.back.common.comment;

import lombok.*;
import lombok.*;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.common.comment.entity.CommentType;
import seb40_main_012.back.user.dto.UserDto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.awt.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
public class CommentDto {

    @Data
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
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Like {

        private long likeCount;

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
        private long view;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;


    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserComment{
        private String content;
        private String bookName;
        private String author;
//        private Image  bookCover;
        private Long rating;
        private Long commentLike;

        public static UserComment of(Comment comment){
            return UserComment.builder()
                    .content(comment.getBody())
                    .bookName(comment.getBook().getTitle())
                    .author(comment.getBook().getAuthor())
                    .rating(comment.getBook().getRatingCount())
                    .commentLike(comment.getLikeCount())
                    .build();
        }
    }
}
