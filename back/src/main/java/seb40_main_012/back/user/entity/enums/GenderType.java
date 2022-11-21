package seb40_main_012.back.user.entity.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;

public enum GenderType {
    FEMALE,
    MALE,
    MYSTIC,
    NOBODY;

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
