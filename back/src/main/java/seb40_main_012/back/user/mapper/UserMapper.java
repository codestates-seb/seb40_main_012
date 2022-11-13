package seb40_main_012.back.user.mapper;

import org.mapstruct.Mapper;
import seb40_main_012.back.user.dto.UserDto;
import seb40_main_012.back.user.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
    default User userPostToUser(UserDto.PostDto postDto) {
        User.UserBuilder user = User.builder();

        user.email(postDto.getEmail());
        user.nickName(postDto.getNickName());
        user.password(postDto.getPassword());

        return user.build();
    }
    default UserDto.ResponseDto userToUserResponse(User user) {
        UserDto.ResponseDto.ResponseDtoBuilder responseDto = UserDto.ResponseDto.builder();

        responseDto.email(user.getEmail());
        responseDto.nickName(user.getNickName());

        return responseDto.build();
    }
}
