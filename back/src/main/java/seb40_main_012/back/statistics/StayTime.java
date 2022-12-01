package seb40_main_012.back.statistics;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import seb40_main_012.back.user.entity.User;

import javax.persistence.*;
import java.time.Duration;
import java.time.LocalDateTime;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class StayTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long stayTimeId;

    @Column
    private String refreshToken;

    @Column
    private LocalDateTime signIn;

    @Column
    private LocalDateTime signOut;

    @Column
    private Duration stayTime;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "email")
    private User user;


}
