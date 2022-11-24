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
        private String nickname;
        private List<Genre> category;

        public User toEntity(){
            return User.builder()
                    .introduction(introduction)
                    .gender(GenderType.from(gender))
                    .age(AgeType.from(age))
                    .nickName(nickname)
                    .build();
        }
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
//    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class Response{
        private String introduction;
        private String gender;
        private String age;
        private String nickname;
        private double temp;
//        private List<CategoryDto.Response> category;
        private List<Genre> category;


        public static Response of(User user){
            /** null을 더 효율적으로 처리할 수 있는 방법 고민, */
            String introduction;
            String genderType;
            String ageType;
            if(user.getGender()==null){
                genderType = "";
            }
            else{
                genderType = user.getGender().toString();
            }
            if(user.getAge()==null){
                ageType = "";
            }
            else{
                ageType = user.getAge().toString();
            }
            if(user.getIntroduction()==null){
                introduction = "";
            }
            else{
                introduction = user.getIntroduction();
            }

            return Response.builder()
                    .introduction(introduction)
                    .gender(genderType)
                    .age(ageType)
                    .nickname(user.getNickName())
                    .temp(user.getBookTemp())
//                    .category(user.getCategories().stream()
//                            .map(x -> CategoryDto.Response.of(x.getCategory().getGenre().getValue())).collect(Collectors.toList()))
                    .category(user.getCategories().stream()
                            .map(x -> x.getCategory().getGenre()).collect(Collectors.toList()))
                    .build();
        }
    }

}
