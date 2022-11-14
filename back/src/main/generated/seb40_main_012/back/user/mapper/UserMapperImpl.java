package seb40_main_012.back.user.mapper;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import seb40_main_012.back.user.dto.UserDto;
import seb40_main_012.back.user.entity.User;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-11-14T16:13:10+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.5 (Azul Systems, Inc.)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User userPostToUser(UserDto.PostDto postDto) {
        if ( postDto == null ) {
            return null;
        }

        User user = new User();

        return user;
    }

    @Override
    public UserDto.ResponseDto userToUserResponse(User user) {
        if ( user == null ) {
            return null;
        }

        UserDto.ResponseDto responseDto = new UserDto.ResponseDto();

        return responseDto;
    }
}
