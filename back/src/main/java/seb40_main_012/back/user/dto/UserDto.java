package seb40_main_012.back.user.dto;

import lombok.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Getter
@NoArgsConstructor
public class UserDto {

    @Getter
    @NoArgsConstructor
    public static class Profile {
        private String nickname;
    }

    @Getter
    @NoArgsConstructor
    public static class Password {
        private String password;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class PostDto {
        @NotBlank
        @Email
        private String email;

        @NotBlank
        private String nickName;

        @NotBlank
        private String password;
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ResponseDto {
        private String email;
        private String nickName;
        private List<String> roles;
    }
}