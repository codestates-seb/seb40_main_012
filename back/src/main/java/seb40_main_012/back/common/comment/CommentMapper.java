package seb40_main_012.back.common.comment;

import org.mapstruct.Mapper;
import org.springframework.data.domain.SliceImpl;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.common.comment.entity.CommentType;
import seb40_main_012.back.common.rating.Rating;
import seb40_main_012.back.user.dto.UserDto;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
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


    default CommentDto.Response commentToCommentResponse(Comment comment) {

        if (comment == null) {
            return null;
        }

        CommentDto.Response.ResponseBuilder response = CommentDto.Response.builder();

        response.commentId(comment.getCommentId());
        response.userInformation(
                UserDto.ResponseDto.builder()
                        .email(comment.getUser().getEmail())
                        .nickName(comment.getUser().getNickName())
                        .bookTemp(comment.getUser().getBookTemp())
                        .roles(comment.getUser().getRoles())
                        .build()
        );
        response.isLiked(comment.getIsLiked());
        response.commentType(comment.getCommentType());
        response.body(comment.getBody());
        response.likeCount(comment.getLikeCount());
        response.view(comment.getView());
        response.createdAt(comment.getCreatedAt());
        response.modifiedAt(comment.getModifiedAt());
        if (comment.getBook() != null) {
            response.bookTitle(comment.getBook().getTitle());
        }
        if (comment.getPairing() != null) {
            response.pairingId(comment.getPairing().getPairingId());
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

    default List<CommentDto.myPageResponse> commentsToMyPageResponse(List<Comment> comments) {

        if (comments == null) {
            return null;
        }

        List<CommentDto.myPageResponse> responseList = new ArrayList<>();

        for (int i = 0; i < comments.size(); i++) {

            CommentDto.myPageResponse myPageResponse = new CommentDto.myPageResponse();

            myPageResponse.setCommentCount(comments.size()); // 코멘트 개수
            myPageResponse.setCommentId(comments.get(i).getCommentId()); // 코멘트 식별 번호
            myPageResponse.setCommentType(comments.get(i).getCommentType()); // 코멘트 타입

            // 콘텐츠 아이디 통합
            if (comments.get(i).getCommentType() == CommentType.BOOK)
                myPageResponse.setContentId(Long.parseLong(comments.get(i).getBook().getIsbn13()));
            if (comments.get(i).getCommentType() == CommentType.PAIRING)
                myPageResponse.setContentId(comments.get(i).getPairing().getPairingId());
            if (comments.get(i).getCommentType() == CommentType.BOOK_COLLECTION)
                myPageResponse.setContentId(comments.get(i).getBookCollection().getCollectionId());

            myPageResponse.setLikeCount(comments.get(i).getLikeCount()); // 댓글 좋아요 개수

            // 타이틀 통합
            if (comments.get(i).getCommentType() == CommentType.BOOK)
                myPageResponse.setTitle(comments.get(i).getBook().getTitle());
            if (comments.get(i).getCommentType() == CommentType.PAIRING)
                myPageResponse.setTitle(comments.get(i).getPairing().getTitle());
            if (comments.get(i).getCommentType() == CommentType.BOOK_COLLECTION)
                myPageResponse.setTitle(comments.get(i).getBookCollection().getTitle());

            // 책 커버
            if (comments.get(i).getCommentType() == CommentType.BOOK)
                myPageResponse.setCover(comments.get(i).getBook().getCover());
            else myPageResponse.setCover(null);

            // 북 컬렉션 커버
            if (comments.get(i).getCommentType() == CommentType.BOOK_COLLECTION) {

                if (comments.get(i).getBookCollection().getCollectionBooks().size() == 0) {
                    myPageResponse.setCollectionCover(null);
                }

                if (comments.get(i).getBookCollection().getCollectionBooks().size() == 1) {
                    myPageResponse.setCollectionCover(
                            List.of(
                                    comments.get(i).getBookCollection().getCollectionBooks().get(0).getBook().getCover()
                            ));
                } else if (comments.get(i).getBookCollection().getCollectionBooks().size() == 2) {
                    myPageResponse.setCollectionCover(
                            List.of(
                                    comments.get(i).getBookCollection().getCollectionBooks().get(0).getBook().getCover(),
                                    comments.get(i).getBookCollection().getCollectionBooks().get(1).getBook().getCover()
                            ));
                } else if (comments.get(i).getBookCollection().getCollectionBooks().size() == 3) {
                    myPageResponse.setCollectionCover(
                            List.of(
                                    comments.get(i).getBookCollection().getCollectionBooks().get(0).getBook().getCover(),
                                    comments.get(i).getBookCollection().getCollectionBooks().get(1).getBook().getCover(),
                                    comments.get(i).getBookCollection().getCollectionBooks().get(2).getBook().getCover()
                            ));
                } else if (comments.get(i).getBookCollection().getCollectionBooks().size() >= 4){
                    myPageResponse.setCollectionCover(
                            List.of(
                                    comments.get(i).getBookCollection().getCollectionBooks().get(0).getBook().getCover(),
                                    comments.get(i).getBookCollection().getCollectionBooks().get(1).getBook().getCover(),
                                    comments.get(i).getBookCollection().getCollectionBooks().get(2).getBook().getCover(),
                                    comments.get(i).getBookCollection().getCollectionBooks().get(3).getBook().getCover()
                            )
                    );
                }
            }

            // 책에 매긴 나의 별점과 책 저자
            if (comments.get(i).getCommentType() == CommentType.BOOK) {
                String isbn13 = comments.get(i).getBook().getIsbn13();
                myPageResponse.setMyBookRating(comments.get(i).getBook().getRatings().stream()
                        .filter(rating -> Objects.equals(rating.getBook().getIsbn13(), isbn13))
                        .mapToDouble(Rating::getUserBookRating).sum());
                myPageResponse.setAuthor(comments.get(i).getBook().getAuthor());
            }
            else {
                myPageResponse.setMyBookRating(null);
                myPageResponse.setAuthor(null);
            }

            myPageResponse.setBody(comments.get(i).getBody()); // 댓글 내용
            myPageResponse.setCreatedAt(comments.get(i).getCreatedAt()); // 생성 일자

            responseList.add(myPageResponse);
        }

                List<CommentDto.myPageResponse> result = responseList.stream()
                        .sorted(Comparator.comparing(CommentDto.myPageResponse::getCreatedAt).reversed())
                        .collect(Collectors.toList());

        return result;
    }
}
