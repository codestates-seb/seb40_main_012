package seb40_main_012.back.common.comment;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import seb40_main_012.back.common.comment.entity.Comment;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-11-25T13:05:46+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.5 (Azul Systems, Inc.)"
)
@Component
public class CommentMapperImpl implements CommentMapper {

    @Override
    public Comment commentPostToComment(CommentDto.Post postComment) {
        if ( postComment == null ) {
            return null;
        }

        Comment.CommentBuilder comment = Comment.builder();

        comment.body( postComment.getBody() );

        return comment.build();
    }

    @Override
    public Comment commentPatchToComment(CommentDto.Patch patchComment) {
        if ( patchComment == null ) {
            return null;
        }

        Comment.CommentBuilder comment = Comment.builder();

        comment.commentId( patchComment.getCommentId() );
        comment.body( patchComment.getBody() );

        return comment.build();
    }

    @Override
    public Comment commentLikeToComment(CommentDto.Like likeComment) {
        if ( likeComment == null ) {
            return null;
        }

        Comment.CommentBuilder comment = Comment.builder();

        comment.likeCount( likeComment.getLikeCount() );

        return comment.build();
    }
}
