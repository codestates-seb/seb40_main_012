package seb40_main_012.back.statistics;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Duration;
import java.time.LocalDate;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Statistics {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long statisticsId;

    @Column
    LocalDate date;

    @Column
    private long totalVisitor;

    @Column
    private Duration averageStayTime;

    @Column
    private long pairingCount;

    @Column
    private long collectionCount;

    @Column
    private long commentCount;

    @Column
    private long female;

    @Column
    private long male;

    @Column
    private long otherGender;

    @Column
    private long nobody;

    @Column
    private long teenager;

    @Column
    private long twenties;

    @Column
    private long thirties;

    @Column
    private long forties;

    @Column
    private long fifties;

    @Column
    private long sixties;

    @Column
    private long seventies;

    @Column
    private long otgerAges;

    @Column
    private long novel;

    @Column
    private long essay;

    @Column
    private long poem;

    @Column
    private long art;

    @Column
    private long humanities;

    @Column
    private long social;

    @Column
    private long science;

    @Column
    private long comics;

    @Column
    private long etc;

}
