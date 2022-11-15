package seb40_main_012.back.config.auth.dto;

import lombok.*;
import seb40_main_012.back.user.entity.UserCategory;
import seb40_main_012.back.user.entity.enums.AgeType;
import seb40_main_012.back.user.entity.enums.CategoryType;
import seb40_main_012.back.user.entity.enums.GenderType;

import java.util.List;

//@Getter
//@Builder
public class LoginDto {

    @Getter
    @Builder
    public static class PostDto {
        private String email;
        private String password;
    }

    @Getter
    @Builder
    public static class PatchDto {
        private GenderType genderType;
        private AgeType age;
        // TODO: 선호 장르 추가
    }

    @Setter
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ResponseDto {
        private boolean firstLogin;
    }
}
