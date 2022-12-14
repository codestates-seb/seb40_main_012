package seb40_main_012.back.config.auth.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
//@RedisHash(value = "refreshToken")
public class RefreshToken {
    private String email;

    @Id
    private String tokenValue;

    private LocalDateTime expiryDate;

    @Builder
    public RefreshToken(String email, String tokenValue, LocalDateTime expiryDate) {
        this.email = email;
        this.tokenValue = tokenValue;
        this.expiryDate = expiryDate;
    }
}
