package seb40_main_012.back.user.dto;

import lombok.*;
//import seb40_main_012.back.config.auth.entity.enums.ProviderType; // OAuth2 반영 안함

import javax.persistence.Entity;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.util.List;

@Getter
@NoArgsConstructor
public class UserDto {

    @Getter
    @NoArgsConstructor
    public static class Profile {
        @NotBlank(message = "닉네임을 입력하셔야 합니다")
        @Pattern(regexp = "[0-9a-zA-Zㄱ-ㅎ가-힣\\s]{3,20}", message = "3~20자의 한글, 영문, 숫자만 사용 가능합니다")
        private String nickName;
    }

    @Getter
    @AllArgsConstructor
    public static class ProfileResponse {
        private String nickName;
    }



    @Getter
    @NoArgsConstructor
    public static class Password {
        @NotBlank(message = "패스워드를 입력해주세요.")
        @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,16}$", message = "8~16자 영문, 숫자, 특수문자(@$!%*?&)만 사용 가능합니다.")
        private String password;
    }

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PostDto {
        @Email
        @NotBlank(message = "이메일을 입력해주세요.")
        private String email;

        @NotBlank(message = "닉네임을 입력해주세요.")
        @Pattern(regexp = "[0-9a-zA-Zㄱ-ㅎ가-힣\\s]{3,20}", message = "3~20자의 한글, 영문, 숫자만 사용 가능합니다.")
        private String nickName;

        @NotBlank(message = "패스워드를 입력해주세요.")
        @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,16}$", message = "8~16자 영문, 숫자, 특수문자(@$!%*?&)만 사용 가능합니다.")
        private String password;

        @NotBlank(message = "기본 이미지를 넣으셔야 합니다")
        private String profileImage; // 프로필 이미지
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EmailDto { // 이메일 중복 검사
        @Email
        @NotBlank(message = "이메일을 입력하셔야 합니다")
        private String email;
    }

    @Setter
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ResponseDto {
        private String nickName;
        private String email;
        private double bookTemp;
        private List<String> roles;
        private String profileImage;
        //private ProviderType providerType; // OAuth2 반영 안함
    }
}
