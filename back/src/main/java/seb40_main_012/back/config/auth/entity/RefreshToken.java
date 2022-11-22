package seb40_main_012.back.config.auth.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
//@RedisHash(value = "refreshToken")
public class RefreshToken {
    private String email;

    @Id
    private String tokenValue;

    @Builder
    public RefreshToken(String email, String tokenValue) {
        this.email = email;
        this.tokenValue = tokenValue;
    }
}
