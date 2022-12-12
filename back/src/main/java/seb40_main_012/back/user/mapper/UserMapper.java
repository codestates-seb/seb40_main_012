package seb40_main_012.back.user.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import seb40_main_012.back.config.auth.dto.LoginDto;
import seb40_main_012.back.user.dto.UserDto;
import seb40_main_012.back.user.entity.User;

import java.util.stream.Collectors;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
    User userPostToUser(UserDto.PostDto postDto);

    UserDto.ResponseDto userToUserResponse(User user);

    LoginDto.ResponseDto userToLoginResponse(User user); // 일반 로그인

    default LoginDto.firstLoginResponseDto userToFirstLoginResponse(User user) { // 첫 로그인 후 선호 정보 수정 시 사용
        LoginDto.firstLoginResponseDto responseDto = new LoginDto.firstLoginResponseDto();

        responseDto.setFirstLogin(user.isFirstLogin());
        responseDto.setNickName(user.getNickName());
        responseDto.setEmail(user.getEmail());
        responseDto.setRoles(user.getRoles());
        responseDto.setGenderType(user.getGender());
        responseDto.setAgeType(user.getAge());
        responseDto.setGenres(user.getCategories().stream()
                .map(userCategory -> userCategory.getCategory().getGenre()
                ).collect(Collectors.toList())
        );
        responseDto.setProfileImage(user.getProfileImage());

        return responseDto;
    }
}
