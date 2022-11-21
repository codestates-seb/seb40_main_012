package seb40_main_012.back.config.auth.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
//@RedisHash(value = "refreshToken")
public class RefreshToken {
    @Id
    private long tokenId;

    private String email;

    private String tokenValue;

    private String session;

    @Builder
    public RefreshToken(String email, String tokenValue, String session) {
        this.email = email;
        this.tokenValue = tokenValue;
        this.session = session;
    }
}
