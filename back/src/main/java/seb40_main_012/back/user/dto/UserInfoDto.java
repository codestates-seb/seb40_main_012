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
        private String profileImage;
        private String introduction;
        private String gender;
        private String age;
        private String nickname;
        private List<Genre> category;

        public User toEntity(){
            /** 로직 dto에서 제거 예정 */
            if(profileImage==null) {
                profileImage = "";
            }
            if(gender == "NONE"){
                gender = "NONE";
            }
            if(age == "NONE"){
                age = "NONE";
            }
            User user = User.builder()
                    .introduction(introduction)
                    .gender(GenderType.from(gender))
                    .age(AgeType.from(age))
                    .profileImage(profileImage)
                    .nickName(nickname)
                    .build();
            return user;
        }
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
//    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class Response{
        private String profileImage;
        private String introduction;
        private String gender;
        private String age;
        private String nickname;
        private double temp;
//        private List<CategoryDto.Response> category;
        private List<String> category;


        public static Response of(User user){
            /** 로직 dto에서 제거 예정 */
            String introduction;
            String genderType;
            String ageType;
            String profileImage;
            List<String> category;
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
            if(user.getProfileImage()==null){
                profileImage = "";
            }
            else{
                profileImage = user.getProfileImage();
            }
            if(!user.getCategories().isEmpty()){
                category = user.getCategories().stream()
                        .map(x -> x.getCategory().getGenre().name()).collect(Collectors.toList());
            }else {
                category = null;
            }


            return Response.builder()
                    .profileImage(profileImage)
                    .introduction(introduction)
                    .gender(genderType)
                    .age(ageType)
                    .nickname(user.getNickName())
                    .temp(user.getBookTemp())
//                    .category(user.getCategories().stream()
//                            .map(x -> CategoryDto.Response.of(x.getCategory().getGenre().getValue())).collect(Collectors.toList()))
                    .category(category)
                    .build();
        }
    }

}
