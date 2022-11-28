package seb40_main_012.back.statistics;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;

public interface StatisticsRepository extends JpaRepository<Statistics, Long>{

    @Query(nativeQuery = true, value = "SELECT * " +
            "FROM STATISTICS " +
            "WHERE DATE = :date")
    Statistics findByDate (LocalDate date);
}
