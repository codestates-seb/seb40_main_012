package seb40_main_012.back.user.entity.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;

public enum AgeType {
    TEENAGER(),
    TWENTIES(),
    THIRTIES(),
    FORTIES(),
    FIFTIES(),
    SIXTIES(),
    SEVENTIES();

//    @Getter
//    private String value;
//    AgeType(String value){
//        this.value = value;
//    }

    @JsonCreator
    public static AgeType from(String x){
        /** value로 키타입 조회하도록 변경해야됨*/
        return AgeType.valueOf(x.toUpperCase());
    }
}
