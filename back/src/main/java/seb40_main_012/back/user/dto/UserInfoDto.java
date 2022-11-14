package seb40_main_012.back.user.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import seb40_main_012.back.book.entity.Genre;
import seb40_main_012.back.user.entity.Category;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.entity.enums.AgeType;
import seb40_main_012.back.user.entity.enums.GenderType;

import java.util.List;
import java.util.stream.Collectors;

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
        private List<Genre> category;

        public User toEntity(){
            return User.builder()
                    .introduction(introduction)
                    .gender(GenderType.from(gender))
                    .age(AgeType.from(age))
                    .build();
        }
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @JsonInclude(JsonInclude.Include.NON_NULL) //-> response에만 붙여주자
    public static class Response{
        private String introduction;
        private String gender;
        private String age;
        private List<CategoryDto.Response> category;


        public static Response of(User user){
            return Response.builder()
                    .introduction(user.getIntroduction())
                    .gender(user.getGender().getValue())
                    .age(user.getAge().getValue())
                    .category(user.getCategories().stream()
                            .map(x -> CategoryDto.Response.of(x.getCategory().getGenre().getValue())).collect(Collectors.toList()))
                    .build();
        }
    }

}
