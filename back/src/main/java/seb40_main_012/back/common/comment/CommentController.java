package seb40_main_012.back.common.comment;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import seb40_main_012.back.book.BookService;
import seb40_main_012.back.bookCollection.dto.BookCollectionDto;
import seb40_main_012.back.bookCollection.service.BookCollectionService;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.common.like.LikeService;
import seb40_main_012.back.dto.SingleResponseDto;
import seb40_main_012.back.notification.NotificationService;
import seb40_main_012.back.pairing.PairingService;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class CommentController {

    private final CommentService commentService;
    private final BookService bookService;
    private final PairingService pairingService;
    private final BookCollectionService bookCollectionService;
    private final CommentMapper commentMapper;
    private final LikeService likeService;

    //    ------------------------------------------------------------
    private final NotificationService noticeService;
    //    ------------------------------------------------------------

    @PostMapping("/books/{isbn13}/comments/add")
    public ResponseEntity postBookComment(@PathVariable("isbn13") @Positive String isbn13,
                                          @Valid @RequestBody CommentDto.Post postComment) {

        Comment comment = commentMapper.commentPostToComment(postComment);
        Comment createdComment = commentService.createBookComment(comment, isbn13);
        CommentDto.Response response = commentMapper.commentToCommentResponse(createdComment);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.CREATED
        );
    }

    @PostMapping("/pairings/{pairing_id}/comments/add")
    public ResponseEntity postPairingComment(@PathVariable("pairing_id") @Positive long pairingId,
                                             @Valid @RequestBody CommentDto.Post postComment) {

        Comment comment = commentMapper.commentPostToComment(postComment);
        Comment createdComment = commentService.createPairingComment(comment, pairingId);
        CommentDto.Response response = commentMapper.commentToCommentResponse(createdComment);

//        ------------------------------------------------------------
        noticeService.notifyPostPairingCommentEvent(createdComment);
//        ------------------------------------------------------------

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.CREATED
        );
    }

    @PostMapping("/collections/{collection-id}/comments/add")
    @ResponseStatus(HttpStatus.CREATED)
    public CommentDto.Response postBookCollectionComment(@PathVariable("collection-id") Long collectionId, @Valid @RequestBody CommentDto.Post request) {

        Comment comment = commentMapper.commentPostToComment(request);
        Comment createdComment = commentService.createBookCollectionComment(comment, collectionId);
        CommentDto.Response response = commentMapper.commentToCommentResponse(createdComment);
        return response;
    }

    @PatchMapping("/comments/{comment_id}/edit")
    public ResponseEntity patchComment(@PathVariable("comment_id") @Positive long commentId,
                                       @Valid @RequestBody CommentDto.Patch patchComment) {

        Comment comment = commentMapper.commentPatchToComment(patchComment);
        Comment updatedComment = commentService.updateComment(comment, commentId);
        CommentDto.Response response = commentMapper.commentToCommentResponse(updatedComment);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }

    @PatchMapping("/comments/{comment_id}/like")
    public ResponseEntity createCommentLike(@PathVariable("comment_id") @Positive long commentId) {

        likeService.createCommentLike(commentId); // 좋아요 눌렀나 검증

//        Comment comment = commentMapper.commentLikeToComment(likeComment);
        Comment updatedLikeComment = commentService.addLike(commentId);
        CommentDto.Response response = commentMapper.commentToCommentResponse(updatedLikeComment);

//        ------------------------------------------------------------
        noticeService.notifyUpdateLikeCommentEvent(updatedLikeComment);
//        ------------------------------------------------------------

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }

    @PatchMapping("/comments/{comment_id}/dislike")
    public ResponseEntity deleteCommentLike(@PathVariable("comment_id") @Positive long commentId) {

        likeService.deleteCommentLike(commentId); // 좋아요 눌렀나 검증

//        Comment comment = commentMapper.commentLikeToComment(likeComment);
        Comment updatedLikeComment = commentService.removeLike(commentId);
        CommentDto.Response response = commentMapper.commentToCommentResponse(updatedLikeComment);

//        ------------------------------------------------------------
        noticeService.notifyUpdateLikeCommentEvent(updatedLikeComment);
//        ------------------------------------------------------------

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }

    @GetMapping("/comments/{comment_id}")
    public ResponseEntity getComment(
            @RequestHeader("Authorization") @Valid @Nullable String token,
            @PathVariable("comment_id") @Positive long commentId) {

        if (token == null) {

            Comment comment = commentService.updateView(commentId);
            comment.setIsLiked(null);
            CommentDto.Response response = commentMapper.commentToCommentResponse(comment);

            return new ResponseEntity<>(
                    new SingleResponseDto<>(response), HttpStatus.OK);

        } else {

            Comment comment = commentService.updateView(commentId);
            Comment isLiked = commentService.isLikedComment(commentId);
            CommentDto.Response response = commentMapper.commentToCommentResponse(comment);

            return new ResponseEntity<>(
                    new SingleResponseDto<>(response), HttpStatus.OK);
        }

    }

    @GetMapping("/comments")
    public ResponseEntity getComments() {

        List<Comment> sliceComments = commentService.findComments();
        Slice<CommentDto.Response> responses = commentMapper.commentsToCommentResponses(sliceComments);

        return new ResponseEntity<>(
                new SingleResponseDto<>(responses), HttpStatus.OK
        );
    }

    @DeleteMapping("/comments/{comment_id}/delete")
    public ResponseEntity deleteComment(@PathVariable("comment_id") @Positive long commentId) {

        commentService.deleteComment(commentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/comments/delete")
    public ResponseEntity deleteComments() {

        commentService.deleteComments();

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}