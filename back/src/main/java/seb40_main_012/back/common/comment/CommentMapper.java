package seb40_main_012.back.common.comment;

import lombok.extern.slf4j.Slf4j;
import org.mapstruct.Mapper;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import seb40_main_012.back.book.BookDto;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.common.comment.entity.CommentType;
import seb40_main_012.back.pairing.entity.Pairing;
import seb40_main_012.back.user.dto.UserDto;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    Comment commentPostToComment(CommentDto.Post postComment);

    Comment commentPatchToComment(CommentDto.Patch patchComment);

    Comment commentLikeToComment(CommentDto.Like likeComment);

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

        if ( comment == null ) {
            return null;
        }

        CommentDto.Response.ResponseBuilder response = CommentDto.Response.builder();

        response.commentId( comment.getCommentId() );
        response.userInformation(
                UserDto.ResponseDto.builder()
                                .email(comment.getUser().getEmail())
                                .nickName(comment.getUser().getNickName())
                                .bookTemp(comment.getUser().getBookTemp())
                                .roles(comment.getUser().getRoles())
                                .build()
        );
        response.isLiked( comment.getIsLiked() );
        response.commentType( comment.getCommentType() );
        response.body( comment.getBody() );
        response.likeCount( comment.getLikeCount() );
        response.view( comment.getView() );
        response.createdAt( comment.getCreatedAt() );
        response.modifiedAt( comment.getModifiedAt() );
        if ( comment.getBook() != null ) {
            response.bookTitle( comment.getBook().getTitle() );
        }
        if ( comment.getPairing() != null ) {
            response.pairingId( comment.getPairing().getPairingId() );
        }
        return response.build();
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

}
