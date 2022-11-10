package seb40_main_012.back.pairing;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import seb40_main_012.back.comment.CommentDto;
import seb40_main_012.back.pairing.entity.Category;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.List;

@Data
@AllArgsConstructor
public class PairingDto {

    public static class Post {

        @NotEmpty(message = "사진을 등록하셔야 합니다.")
        private String imagePath;

        @NotEmpty(message = "내용을 입력하셔야 합니다.")
        @Size(min = 20, message = "20자 이상 입력하셔야 합니다.")
        private String body;

    }

    public static class Patch {

        private long pairingID;

        @NotEmpty(message = "내용을 입력하셔야 합니다.")
        @Size(min = 20, message = "20자 이상 입력하셔야 합니다.")
        private String body;

    }

    public static class Response {

        private long bookId;
        private long pairingId;
//        private UserDto.Response userInformation;
        private Category category;
        private String body;
        private long like;
        private List<CommentDto.Response> comments;


    }
}
