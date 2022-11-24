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
import java.util.Optional;
import java.util.stream.Collectors;

@Getter
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
        private String bookTitle;
        private long pairingId;
        private Boolean isLiked;
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
    public static class CommentList{
        private List<CommentDto.BookComment> bookComment;
        private List<CommentDto.PairingComment> pairingComment;
        private List<CommentDto.CollectionComment> collectionComment;

        public static CommentList of(List<CommentDto.BookComment> bookComment,
                                     List<CommentDto.PairingComment> pairingComment,
                                     List<CommentDto.CollectionComment> collectionComment){
            if(bookComment==null) bookComment=null;
            if(pairingComment==null) pairingComment=null;
            if(collectionComment==null) collectionComment=null;
            return CommentList.builder()
                    .bookComment(bookComment)
                    .pairingComment(pairingComment)
                    .collectionComment(collectionComment)
                    .build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BookComment{
        private String commentType;
        private Long commentId;
        private Long commentLike;
        private String content;
        private String bookName;
        private String author;
        private String cover;
        private Long rating;


        public static BookComment of(Comment comment){
            return BookComment.builder()
                    .commentId(comment.getCommentId())
                    .commentType(comment.getCommentType().toString())
                    .content(comment.getBody())
                    .bookName(comment.getBook().getTitle())
                    .author(comment.getBook().getAuthor())
                    .rating(comment.getBook().getRatingCount())
                    .commentLike(comment.getLikeCount())
                    .build();
        }
    }
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PairingComment{
        private String commentType;
        private Long commentId;
        private Long commentLike;
        private String content;
        private String pairingTitle;
        private String cover;

        public static PairingComment of(Comment comment){
            return PairingComment.builder()
                    .commentId(comment.getCommentId())
                    .commentType(comment.getCommentType().toString())
                    .content(comment.getBody())
                    .pairingTitle(comment.getPairing().getTitle())
                    .cover(comment.getPairing().getBook().getCover())
                    .commentLike(comment.getLikeCount())
                    .build();
        }
    }
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CollectionComment{
        private String commentType;
        private Long commentId;
        private Long commentLike;
        private String content;
        private String collectionTitle;
        private List<String> cover;

        public static CollectionComment of(Comment comment){
            return CollectionComment.builder()
                    .commentId(comment.getCommentId())
                    .commentType(comment.getCommentType().toString())
                    .content(comment.getBody())
                    .collectionTitle(comment.getBookCollection().getTitle())
                    .cover(comment.getBookCollection().getCollectionBooks().stream().limit(4)
                            .map(x ->
                               x.getBook().getCover()

                            ).collect(Collectors.toList()))
                    .commentLike(comment.getLikeCount())
                    .build();
        }
    }

}
