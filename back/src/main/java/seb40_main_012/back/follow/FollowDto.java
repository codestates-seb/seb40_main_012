package seb40_main_012.back.follow;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class FollowDto {

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {

//        private long userId;
        private String nickName;
        private String email;
//        private BigInteger followState; // boolean 값을 받기 위해 BigInteger 사용!
//        private BigInteger equalState;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CMResponse<T> {
        private int statusCode;
        private T data;
    }
}
