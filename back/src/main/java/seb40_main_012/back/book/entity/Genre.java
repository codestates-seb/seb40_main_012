package seb40_main_012.back.book.entity;

import lombok.Getter;

public enum Genre {

    NOVEL("소설"),
    ESSAY("수필"),
    POEM("시"),
    HISTORY("역사"),
    COMICS("만화"),
    TRAVEL("여행"),
    ETC("기타"),
    PHILOSOPHY("철학"),
    ECONOMY("경제");

    @Getter
    private final String value;

    Genre(String value) {
        this.value = value;
    }
}
