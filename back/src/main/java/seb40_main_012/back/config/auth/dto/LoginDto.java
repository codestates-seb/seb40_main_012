package seb40_main_012.back.config.auth.dto;

import lombok.*;
import seb40_main_012.back.book.entity.Genre;
import seb40_main_012.back.user.entity.enums.AgeType;
import seb40_main_012.back.user.entity.enums.GenderType;

import javax.validation.constraints.NotBlank;
import java.util.List;

public class LoginDto {

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PostDto {
        @NotBlank(message = "이메일을 입력하셔야 합니다")
        private String email;
        @NotBlank(message = "패스워드를 입력하셔야 합니다")
        private String password;
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PatchDto {
        private GenderType genderType;
        private AgeType age;
        private List<String> genres;
    }

    @Setter
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ResponseDto {
        private boolean firstLogin;
        private String nickName;
        private String email;
        private List<String> roles;
    }

    @Setter
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class firstLoginResponseDto {
        private boolean firstLogin;
        private String nickName;
        private String email;
        private List<String> roles;
        private GenderType genderType;
        private AgeType ageType;
        private List<Genre> genres;
    }
}
