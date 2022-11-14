package seb40_main_012.back.common.comment;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import seb40_main_012.back.book.BookService;
import seb40_main_012.back.bookCollection.service.BookCollectionService;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.common.like.LikeService;
import seb40_main_012.back.dto.SingleResponseDto;
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

    @PostMapping("/books/{book_id}/comments/add")
    public ResponseEntity postBookComment(
            @RequestHeader("Authorization") long userId,
            @PathVariable("book_id") @Positive long bookId,
            @Valid @RequestBody CommentDto.Post postComment) {

        Comment comment = commentMapper.commentPostToComment(postComment);
        Comment createdComment = commentService.createBookComment(comment, bookId);
        CommentDto.Response response = commentMapper.commentToCommentResponse(createdComment);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.CREATED
        );
    }

    @PostMapping("/pairings/{pairing_id}/comments/add")
    public ResponseEntity postPairingComment(
            @RequestHeader("Authorization") long userId,
            @PathVariable("pairing_id") @Positive long pairingId,
            @Valid @RequestBody CommentDto.Post postComment) {

        Comment comment = commentMapper.commentPostToComment(postComment);
        Comment createdComment = commentService.createPairingComment(comment, pairingId);
        CommentDto.Response response = commentMapper.commentToCommentResponse(createdComment);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.CREATED
        );
    }

    @PostMapping("/bookcollections/{bookcollection_id}/comments/add")
    public ResponseEntity postBookCollectionComment(@RequestHeader("Authorization") long userId) {
        return null;
    }

    @PatchMapping("/comments/{comments_id}/edit")
    public ResponseEntity patchComment(@RequestHeader("Authorization") long userId,
                                       @PathVariable("comment_id") @Positive long commentId,
                                       @Valid @RequestBody CommentDto.Patch patchComment) {

        Comment comment = commentMapper.commentPatchToComment(patchComment);
        Comment updatedComment = commentService.updateComment(comment, commentId);
        CommentDto.Response response = commentMapper.commentToCommentResponse(updatedComment);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }

    @PatchMapping("/comments/{comment_id}/like")
    public ResponseEntity updateLikeComment(@RequestHeader("Authorization") long userId,
                                            @PathVariable("comment_id") @Positive long commentId,
                                            @Valid @RequestBody CommentDto.Like likeComment) {

        likeService.createCommentLike(likeComment);

        likeComment.setCommentId(commentId);

        Comment comment = commentService.updateLike(commentMapper.commentLikeToComment(likeComment));

        return new ResponseEntity<>(
                new SingleResponseDto<>(commentMapper.commentToCommentResponse(comment)), HttpStatus.OK
        );
    }

//    @PatchMapping("/comments/{comment_id}/like")
//    public ResponseEntity updateLikeComment(@RequestHeader("Authorization") long userId,
//                                            @PathVariable("comment_id") @Positive long commentId,
//                                            @Valid @RequestBody CommentDto.Like likeComment) {
//
//        likeService.createCommentLike(likeComment);
//
//        Comment comment = commentService.updateLike(commentMapper.commentLikeToComment(likeComment), commentId);
//
//        return new ResponseEntity<>(
//                new SingleResponseDto<>(commentMapper.commentToCommentResponse(comment)), HttpStatus.OK
//        );
//    }

    @PatchMapping("/comments/{comment_id}")
    public ResponseEntity updateViewPairing(@RequestBody CommentDto.View viewComment,
                                            @PathVariable("comment_id") @Positive long commentId) {
//        Comment comment = commentMapper.commentViewToComment(viewComment);
        Comment viewedComment = commentService.updateView(commentId);
        CommentDto.Response response = commentMapper.commentToCommentResponse(viewedComment);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }


    @GetMapping("/comments/{comment_id}")
    public ResponseEntity getComment(@PathVariable("comment_id") @Positive long commentId) {

        Comment comment = commentService.findComment(commentId);
        CommentDto.Response response = commentMapper.commentToCommentResponse(comment);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }

//    @GetMapping("/comments") // 페이지네이션으로 조회
//    public ResponseEntity getComments(@Positive @RequestParam int page,
//                                      @Positive @RequestParam(required = false, defaultValue = "15") int size) {
//
//        Page<Comment> pageComments = commentService.findComments(page - 1, size);
//        List<Comment> comments = pageComments.getContent();
//        List<CommentDto.Response> responses = commentMapper.commentsToCommentResponses(comments);
//
//        return new ResponseEntity<>(
//                new MultiResponseDto<>(responses, pageComments), HttpStatus.OK
//        );
//    }

    @GetMapping("/comments") // 리스트로 조회
    public ResponseEntity getComments() {

        List<Comment> listComments = commentService.findComments();
        List<CommentDto.Response> responses = commentMapper.commentsToCommentResponses(listComments);

        return new ResponseEntity<>(
                new SingleResponseDto<>(responses), HttpStatus.OK
        );
    }

    @DeleteMapping("/comments/{comment_id}/delete")
    public ResponseEntity deleteComment(@RequestHeader("Authorization") long userId,
                                        @PathVariable("comment_id") @Positive long commentId) {

        commentService.deleteComment(commentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
