package seb40_main_012.back.user.entity.enums;

import com.fasterxml.jackson.annotation.JsonCreator;


public enum GenderType {
    FEMALE,
    MALE,
    MYSTIC,
    NOBODY,
    NONE; //선택 안했을 경우

//    @Getter
//    private String value;
//    GenderType(String value){
//        this.value = value;
//    }

    @JsonCreator
    public static GenderType from(String x){
        return GenderType.valueOf(x.toUpperCase());
    }
}
