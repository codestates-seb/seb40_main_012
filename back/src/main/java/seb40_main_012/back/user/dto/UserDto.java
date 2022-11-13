package seb40_main_012.back.user.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import seb40_main_012.back.user.entity.Category;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.entity.UserCategory;
import seb40_main_012.back.user.entity.enums.AgeType;
import seb40_main_012.back.user.entity.enums.GenderType;

import java.util.List;

@Getter
//@AllArgsConstructor
@NoArgsConstructor
//@Builder
public class UserDto {
    public static class ResponseDto{}

    @Getter
    @NoArgsConstructor
    public static class Profile{
        private String nickname;
    }

    @Getter
    @NoArgsConstructor
    public static class Password{
        private String password;
    }



}
