package seb40_main_012.back.pairing.entity;

import lombok.Getter;

public enum ParingCategory {

    FILM("영화"),
    CUISINE("음식/장소"),
    MUSIC("음악"),
    BOOK("책"),
    ETC("기타");

    @Getter
    private final String value;

    ParingCategory(String value) {
        this.value = value;
    }
}
