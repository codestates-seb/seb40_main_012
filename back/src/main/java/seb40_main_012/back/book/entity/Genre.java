package seb40_main_012.back.book.entity;

import lombok.Getter;

public enum Genre {

    NOVEL("소설"),
    ESSAY("수필"),
    POEM("시"),
    HUMANITIES("인문학"),
    SOCIAL("사회과학"),
    NATURAL("자연과학"),
    COMICS("만화"),
    ETC("기타");

    @Getter
    private final String value;

    Genre(String value) {
        this.value = value;
    }
}
