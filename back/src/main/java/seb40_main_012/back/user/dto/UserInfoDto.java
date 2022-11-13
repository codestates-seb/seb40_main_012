package seb40_main_012.back.user.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.entity.enums.AgeType;
import seb40_main_012.back.user.entity.enums.GenderType;

import java.util.List;

@Getter
@AllArgsConstructor
public class UserInfoDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @AllArgsConstructor
    @Builder
    public static class Post{
        private String introduction;
        private String gender;
        private String age;
        private List<String> category;

        public User toEntity(){
            return User.builder()
                    .introduction(introduction)
                    .gender(GenderType.from(gender))
                    .age(AgeType.from(age))
                    .build();
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @AllArgsConstructor
    @Builder
    @JsonInclude(JsonInclude.Include.NON_NULL) //-> response에만 붙여주자
    public static class Response{
        private String introduction;
        private String gender;
        private String age;
        private List<String> category;

        public Response of(User user){
            return null;
        }
    }

}
