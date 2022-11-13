package seb40_main_012.back.user.entity.enums;

import lombok.Getter;

public enum CategoryType {
    POETRY("시"),
    NOVEL("소설"),
    ESSAY("수필"),
    PHILOSOPHY("철학"),
    ECONOMY("경제");

    @Getter
    private String value;
    CategoryType(String value){
        this.value = value;
    }
}
