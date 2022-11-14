package seb40_main_012.back.config.auth.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
//@Builder
public class LoginDto {
    private String email;
    private String password;
}
