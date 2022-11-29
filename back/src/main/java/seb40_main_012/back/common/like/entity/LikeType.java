package seb40_main_012.back.common.like.entity;

import lombok.Getter;

public enum LikeType {

    PAIRING("페어링"),
    COMMENT("코멘트"),
    BOOK_COLLECTION("컬렉션");


    @Getter
    private final String value;

    LikeType(String value) {
        this.value = value;
    }
}
