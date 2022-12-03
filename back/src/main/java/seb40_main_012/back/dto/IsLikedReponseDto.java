package seb40_main_012.back.bookWiki.dto;

import lombok.Getter;
import seb40_main_012.back.common.comment.CommentDto;

import java.util.List;

@Getter
public class IsLikedReponseDto<T> {

    private CommentDto.Response data;
    private Boolean isLiked;

    public IsLikedReponseDto(CommentDto.Response data, Boolean isLiked) {
        this.data =  data;
        this.isLiked = isLiked;
    }
}
