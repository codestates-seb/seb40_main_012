package seb40_main_012.back.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

//@Getter
public class UserDto {
    @Getter
    @Builder
    @AllArgsConstructor
    public static class PostDto{
        @NotBlank
        @Email
        private String email;

        @NotBlank
        private String nickname;

        @NotBlank
        private String password;
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ResponseDto{
        private String email;
        private String nickname;
    }
}
