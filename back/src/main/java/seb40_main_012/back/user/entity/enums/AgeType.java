package seb40_main_012.back.user.entity.enums;

import com.fasterxml.jackson.annotation.JsonCreator;


public enum AgeType {
    TEENAGER(),
    TWENTIES(),
    THIRTIES(),
    FORTIES(),
    FIFTIES(),
    SIXTIES(),
    SEVENTIES(),
    OTHERS(),
    NONE; //선택 안했을 경우

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
//    Nullable<AgeType> ageType = null;
}
