package seb40_main_012.back.follow;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;
import seb40_main_012.back.user.entity.User;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(
        name = "FOLLOW",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "follow_following",
                        columnNames = {"followingUserId", "followedUserId"}
                )
        }
)
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long followId;

    @JsonIgnoreProperties
    @ManyToOne
    @JoinColumn(name = "followingUserId") // 팔로우 하는 유저 아이디
    private User followingUser;

    @JsonIgnoreProperties
    @ManyToOne
    @JoinColumn(name = "followedUserId") // 팔로잉 당하는 유저 아이디
    private User followedUser;

    @CreationTimestamp // 자동으로 현재시간 담김
    private Timestamp createDate;
}
