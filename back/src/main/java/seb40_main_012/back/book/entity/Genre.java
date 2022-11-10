package seb40_main_012.back.book.entity;

import lombok.Getter;

public enum Genre {

    NOVEL("소설"),
    ESSAY("수필"),
    POEM("시"),
    HISTORY("역사"),
    COMICS("만화"),
    TRAVEL("여행"),
    ETC("기타");

    @Getter
    private final String genre;

    Genre(String genre) {
        this.genre = genre;
    }
}
