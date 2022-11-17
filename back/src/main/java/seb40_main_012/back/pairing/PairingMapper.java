package seb40_main_012.back.pairing;

import org.mapstruct.Mapper;
import org.springframework.data.domain.SliceImpl;
import seb40_main_012.back.common.comment.CommentDto;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.pairing.entity.Pairing;
import seb40_main_012.back.user.dto.UserDto;
import seb40_main_012.back.user.entity.User;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface PairingMapper {

    default Pairing pairingPostToPairing(PairingDto.Post postPairing) {

        return Pairing.builder()
                .title(postPairing.getTitle())
                .body(postPairing.getBody())
                .pairingCategory(postPairing.getPairingCategory())
                .imagePath(postPairing.getImagePath())
                .outLinkPath(postPairing.getOutLinkPath())
                .build();

    }

    ;

    Pairing pairingPatchToPairing(PairingDto.Patch patchPairing);

    Pairing pairingLikeToPairing(PairingDto.Like likePairing);

//    Pairing pairingViewToPairing(PairingDto.View viewPairing);

    default PairingDto.Response pairingToPairingResponse(Pairing pairing) {

        User user = pairing.getUser();

        List<Comment> comments = pairing.getComments();

        List<CommentDto.Response> commentResponses = new ArrayList<>();

        if (comments == null) {
            commentResponses = new ArrayList<>();
        } else {
            commentResponses =
                    comments.stream()
                            .map(comment ->
                                    CommentDto.Response.builder()
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
                                            .view(comment.getView())
                                            .createdAt(comment.getCreatedAt())
                                            .modifiedAt(comment.getModifiedAt())
                                            .build()
                            ).collect(Collectors.toList());
        }

        return PairingDto.Response.builder()
                .bookId(pairing.getBook().getBookId())
                .pairingId(pairing.getPairingId())
                .userInformation(
                        UserDto.ResponseDto.builder()
                                .email(user.getEmail())
                                .nickName(user.getNickName())
                                .roles(user.getRoles())
                                .build()
                )
                .pairingCategory(pairing.getPairingCategory())
                .title(pairing.getTitle())
                .body(pairing.getBody())
                .likeCount(pairing.getLikeCount())
                .view(pairing.getView())
                .imagePath(pairing.getImagePath())
                .outLinkPath(pairing.getOutLinkPath())
                .comments(commentResponses)
                .createdAt(pairing.getCreatedAt())
                .modifiedAt(pairing.getModifiedAt())
                .build();

    }

    ;


    default SliceImpl<PairingDto.Response> pairingsToPairingResponses(List<Pairing> pairings) {

        if (pairings == null) return null;

        return new SliceImpl<>(
                pairings.stream()
                        .map(pairing -> PairingDto.Response.builder()
                                .bookId(pairing.getBook().getBookId())
                                .pairingId(pairing.getPairingId())
                                .userInformation(
                                        UserDto.ResponseDto.builder()
                                                .email(pairing.getUser().getEmail())
                                                .nickName(pairing.getUser().getNickName())
                                                .roles(pairing.getUser().getRoles())
                                                .build()
                                )
                                .pairingCategory(pairing.getPairingCategory())
                                .title(pairing.getTitle())
                                .body(pairing.getBody())
                                .likeCount(pairing.getLikeCount())
                                .view(pairing.getView())
                                .imagePath(pairing.getImagePath())
                                .outLinkPath(pairing.getOutLinkPath())
                                .comments(
                                        pairing.getComments().stream()
                                                .map(comment ->
                                                        CommentDto.Response.builder()
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
                                                                .view(comment.getView())
                                                                .createdAt(comment.getCreatedAt())
                                                                .modifiedAt(comment.getModifiedAt())
                                                                .build()
                                                ).collect(Collectors.toList())
                                )
                                .createdAt(pairing.getCreatedAt())
                                .modifiedAt(pairing.getModifiedAt())
                                .build()
                        ).collect(Collectors.toList())

        );

    }
}
