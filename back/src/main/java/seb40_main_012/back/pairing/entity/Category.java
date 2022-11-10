package seb40_main_012.back.pairing.entity;

import lombok.Getter;

public enum Category {

    FILM("영화"),
    FOOD("음식"),
    MUSIC("음악"),
    BOOK("책"),
    ETC("기타");

    @Getter
    private final String categoryName;

    Category(String categoryName) {
        this.categoryName = categoryName;
    }
}
