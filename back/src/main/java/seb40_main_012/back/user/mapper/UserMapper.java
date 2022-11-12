package seb40_main_012.back.user.mapper;

import org.mapstruct.Mapper;
import seb40_main_012.back.user.dto.UserDto;
import seb40_main_012.back.user.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User userPostToUser(UserDto.PostDto postDto);
    UserDto.ResponseDto userToUserResponse(User user);
}
