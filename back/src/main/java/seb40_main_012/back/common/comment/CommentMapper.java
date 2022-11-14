package seb40_main_012.back.common.comment;

import org.mapstruct.Mapper;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.user.dto.UserDto;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    Comment commentPostToComment(CommentDto.Post postComment);
    Comment commentPatchToComment(CommentDto.Patch patchComment);
    Comment commentLikeToComment(CommentDto.Like likeComment);
//    Comment commentViewToComment(CommentDto.View viewComment);
    default CommentDto.Response commentToCommentResponse(Comment comment) {

      return CommentDto.Response.builder()
              .commentId(comment.getCommentId())
              .userInformation(
                      UserDto.ResponseDto.builder()
                              .email(comment.getUser().getEmail())
                              .nickName(comment.getUser().getNickName())
                              .build()
              )
              .commentType(comment.getCommentType())
              .body(comment.getBody())
              .likeCount(comment.getLikeCount())
              .createdAt(comment.getCreatedAt())
              .modifiedAt(comment.getModifiedAt())
              .build();
    };
    List<CommentDto.Response> commentsToCommentResponses(List<Comment> comments);
}