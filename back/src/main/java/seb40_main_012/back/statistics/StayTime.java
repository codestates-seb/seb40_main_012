package seb40_main_012.back.statistics;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
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
    private LocalDateTime signIn;

    @Column
    private LocalDateTime signOut;

}
