package seb40_main_012.back.common.comment;

import lombok.extern.slf4j.Slf4j;
import org.mapstruct.Mapper;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.common.comment.entity.CommentType;
import seb40_main_012.back.user.dto.UserDto;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    Comment commentPostToComment(CommentDto.Post postComment);

    Comment commentPatchToComment(CommentDto.Patch patchComment);

    Comment commentLikeToComment(CommentDto.Like likeComment);

    //    Comment commentViewToComment(CommentDto.View viewComment);
    default CommentDto.Response myCommentToCommentResponse(Comment comment) {

        return CommentDto.Response.builder()
                .commentId(comment.getCommentId())
                .bookTitle(comment.getBook().getTitle())
                .commentType(CommentType.BOOK)
                .isLiked(comment.getIsLiked())
                .body(comment.getBody())
                .likeCount(comment.getLikeCount())
                .view(comment.getView())
                .createdAt(comment.getCreatedAt())
                .modifiedAt(comment.getModifiedAt())
                .build();
    }

    default CommentDto.Response commentToCommentResponse(Comment comment)
    {

        return CommentDto.Response.builder()
                .commentId(comment.getCommentId())
                .userInformation(
                        UserDto.ResponseDto.builder()
                                .email(comment.getUser().getEmail())
                                .nickName(comment.getUser().getNickName())
                                .bookTemp(comment.getUser().getBookTemp())
                                .roles(comment.getUser().getRoles())
                                .build()
                )
                .isLiked(comment.getIsLiked())
                .commentType(comment.getCommentType())
                .body(comment.getBody())
                .likeCount(comment.getLikeCount())
                .view(comment.getView())
                .createdAt(comment.getCreatedAt())
                .modifiedAt(comment.getModifiedAt())
                .build();
    }

    default CommentDto.Response bookCommentToCommentResponse(Comment comment)
    {

        return CommentDto.Response.builder()
                .commentId(comment.getCommentId())
                .bookTitle(comment.getBook().getTitle())
                .userInformation(
                        UserDto.ResponseDto.builder()
                                .email(comment.getUser().getEmail())
                                .nickName(comment.getUser().getNickName())
                                .bookTemp(comment.getUser().getBookTemp())
                                .roles(comment.getUser().getRoles())
                                .build()
                )
                .commentType(comment.getCommentType())
                .body(comment.getBody())
                .likeCount(comment.getLikeCount())
                .view(comment.getView())
                .createdAt(comment.getCreatedAt())
                .modifiedAt(comment.getModifiedAt())
                .build();
    }

    default CommentDto.Response pairingCommentToCommentResponse(Comment comment)
    {

        return CommentDto.Response.builder()
                .commentId(comment.getCommentId())
                .pairingId(comment.getPairing().getPairingId())
                .userInformation(
                        UserDto.ResponseDto.builder()
                                .email(comment.getUser().getEmail())
                                .nickName(comment.getUser().getNickName())
                                .bookTemp(comment.getUser().getBookTemp())
                                .roles(comment.getUser().getRoles())
                                .build()
                )
                .commentType(comment.getCommentType())
                .body(comment.getBody())
                .likeCount(comment.getLikeCount())
                .view(comment.getView())
                .createdAt(comment.getCreatedAt())
                .modifiedAt(comment.getModifiedAt())
                .build();
    }

    default SliceImpl<CommentDto.Response> commentsToCommentResponses(List<Comment> comments) {

        if (comments == null) return null;

        return new SliceImpl<>(
                comments.stream()
                        .map(comment -> CommentDto.Response.builder()
                                .commentId(comment.getCommentId())
                                .userInformation(
                                        UserDto.ResponseDto.builder()
                                                .email(comment.getUser().getEmail())
                                                .nickName(comment.getUser().getNickName())
                                                .roles(comment.getUser().getRoles())
                                                .build()
                                )
                                .commentType(comment.getCommentType())
                                .body(comment.getBody())
                                .likeCount(comment.getLikeCount())
                                .view(comment.getView())
                                .createdAt(comment.getCreatedAt())
                                .modifiedAt(comment.getModifiedAt())
                                .build()
                        ).collect(Collectors.toList())

        );

    }

    ;
//    List<CommentDto.Response> commentsToCommentResponses(List<Comment> comments);
}
