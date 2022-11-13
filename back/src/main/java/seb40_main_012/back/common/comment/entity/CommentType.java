package seb40_main_012.back.common.comment.entity;

import lombok.Getter;

public enum CommentType {

    BOOK("책"),
    PAIRING("페어링"),
    BOOK_COLLECTION("컬렉션");

    @Getter
    private final String commentType;

    CommentType(String commentType) {
        this.commentType = commentType;
    }
}
