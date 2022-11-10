package seb40_main_012.back.comment;

import org.mapstruct.Mapper;
import seb40_main_012.back.comment.entity.Comment;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    Comment commentPostToComment(CommentDto.Post commentPost);
    Comment commentPatchToComment(CommentDto.Patch commentPatch);
    CommentDto.Response commentTOCommentResponse(Comment comment);
    List<CommentDto.Response> commentsToCommentResponses(List<Comment> comments);
}
