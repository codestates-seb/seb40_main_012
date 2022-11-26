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
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class myPageResponse { // 작성일 순으로 내림차순 - 한 번에 전부 리턴하기

        private long commentCount; // 나의 총 댓글 개수
        private long commentId; // 코멘트 식별 번호
        private long contentId; // 책의 경우 ISBN13, 페어링과 컬렉션의 경우 각각의 ID
        private long likeCount; // 코멘트 현재 좋아요 개수
        private String title; // 책,페어링,컬렉션 통합 타이틀 가능한지 화인할 것
        private String cover; // 책 커버
        private List<String> collectionCover; // 컬렉션에 속한 책 커버 4개. 컬렉션에 추가된 순으로 오름차순
        private Double myBookRating; // 내가 매긴 별점. 책의 경우에만 표시. 나머지는 null 처리
        private String author; // 책의 경우에만 표시. 나머지는 null 처리
        private CommentType commentType; // 책, 페어링, 컬렉션 구분자
        private String body; // 댓글 내용
        private LocalDateTime createdAt; // 코멘트 작성 날짜. 정렬 편하게 하기 위해
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
