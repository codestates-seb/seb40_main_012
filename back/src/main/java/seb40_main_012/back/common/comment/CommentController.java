package seb40_main_012.back.common.comment;

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
import seb40_main_012.back.pairing.entity.Pairing;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@Validated
@RestController
@RequestMapping("/api")
public class CommentController {

    private final CommentService commentService;
    private final BookService bookService;
    private final PairingService pairingService;
    private final BookCollectionService bookCollectionService;
    private final CommentMapper commentMapper;
    private final LikeService likeService;

    public CommentController(CommentService commentService, BookService bookService, PairingService pairingService,
                             BookCollectionService bookCollectionService, CommentMapper commentMapper, LikeService likeService) {
        this.commentService = commentService;
        this.bookService = bookService;
        this.pairingService = pairingService;
        this.bookCollectionService = bookCollectionService;
        this.commentMapper = commentMapper;
        this.likeService = likeService;
    }

    @PostMapping("/books/{book_id}/comments/add")
    public ResponseEntity postBookComment(@RequestHeader("Authorization") long userId,
                                          @PathVariable("book_id") @Positive long bookId,
                                          @Valid @RequestBody CommentDto.Post postComment) {

        Comment comment = commentMapper.commentPostToComment(postComment);
        Comment createdComment = commentService.createBookComment(comment, bookId);
        CommentDto.Response response = commentMapper.commentTOCommentResponse(createdComment);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.CREATED
        );
    }

    @PostMapping("/pairings/{pairing_id}/comments/add")
    public ResponseEntity postPairingComment(@RequestHeader("Authorization") long userId,
                                             @PathVariable("pairing_id") @Positive long pairingId,
                                             @Valid @RequestBody CommentDto.Post postComment) {

        Comment comment = commentMapper.commentPostToComment(postComment);
        Comment createdComment = commentService.createPairingComment(comment, pairingId);
        CommentDto.Response response = commentMapper.commentTOCommentResponse(createdComment);

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
        CommentDto.Response response = commentMapper.commentTOCommentResponse(updatedComment);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }

    @PatchMapping("/comments/{comment_id}/like")
    public ResponseEntity updateLikePairing(@RequestHeader("Authorization") long userId,
                                            @PathVariable("comment_id") @Positive long commentId,
                                            @Valid @RequestBody CommentDto.Like likeComment) {

        likeService.createCommentLike(likeComment);

        Comment comment = commentService.updateLike(commentMapper.commentLikeToComment(likeComment), commentId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(commentMapper.commentTOCommentResponse(comment)), HttpStatus.OK
        );
    }

    @GetMapping("/comments/{comment_id}")
    public ResponseEntity getComment(@PathVariable("comment_id") @Positive long commentId) {

        Comment comment = commentService.findComment(commentId);
        CommentDto.Response response = commentMapper.commentTOCommentResponse(comment);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }

    @GetMapping("/comments")
    public ResponseEntity getComments() {
        return null;
    }

    @DeleteMapping("/comments/{comments_id}/delete")
    public ResponseEntity deleteComment() {
        return null;
    }
}
