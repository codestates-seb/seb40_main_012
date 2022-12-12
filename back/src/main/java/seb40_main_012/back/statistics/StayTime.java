package seb40_main_012.back.statistics;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import seb40_main_012.back.user.entity.User;

import javax.persistence.*;
import java.time.LocalDate;
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
    private LocalDate signOutDay;

    @Column
    private LocalDateTime signIn;

    @Column
    private LocalDateTime signOut;

    @Column
    private long stayTime;

    @Column
    private String stayTimeStr;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_Id")
    private User user;


}
