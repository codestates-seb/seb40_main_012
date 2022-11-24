package seb40_main_012.back.user.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import seb40_main_012.back.config.auth.dto.LoginDto;
import seb40_main_012.back.user.dto.UserDto;
import seb40_main_012.back.user.entity.User;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-11-24T15:19:15+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.5 (Azul Systems, Inc.)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User userPostToUser(UserDto.PostDto postDto) {
        if ( postDto == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.email( postDto.getEmail() );
        user.nickName( postDto.getNickName() );
        user.password( postDto.getPassword() );
        user.profileImage( postDto.getProfileImage() );

        return user.build();
    }

    @Override
    public UserDto.ResponseDto userToUserResponse(User user) {
        if ( user == null ) {
            return null;
        }

        UserDto.ResponseDto.ResponseDtoBuilder responseDto = UserDto.ResponseDto.builder();

        responseDto.nickName( user.getNickName() );
        responseDto.email( user.getEmail() );
        responseDto.bookTemp( user.getBookTemp() );
        List<String> list = user.getRoles();
        if ( list != null ) {
            responseDto.roles( new ArrayList<String>( list ) );
        }
        responseDto.profileImage( user.getProfileImage() );

        return responseDto.build();
    }

    @Override
    public LoginDto.ResponseDto userToLoginResponse(User user) {
        if ( user == null ) {
            return null;
        }

        LoginDto.ResponseDto.ResponseDtoBuilder responseDto = LoginDto.ResponseDto.builder();

        responseDto.firstLogin( user.isFirstLogin() );
        responseDto.nickName( user.getNickName() );
        responseDto.bookTemp( user.getBookTemp() );
        responseDto.email( user.getEmail() );
        List<String> list = user.getRoles();
        if ( list != null ) {
            responseDto.roles( new ArrayList<String>( list ) );
        }
        responseDto.profileImage( user.getProfileImage() );

        return responseDto.build();
    }
}
