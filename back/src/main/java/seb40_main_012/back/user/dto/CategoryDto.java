package seb40_main_012.back.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class CategoryDto {
    public static class PostDto{}

    @Getter
    @AllArgsConstructor
    @Builder
    public static class Response{
        private String categoryName;

        public static Response of(String categoryName) {
            return Response.builder().categoryName(categoryName).build();
        }
    }
//
}
