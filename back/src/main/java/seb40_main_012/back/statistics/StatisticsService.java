package seb40_main_012.back.statistics;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb40_main_012.back.pairing.entity.Pairing;

import java.time.LocalDate;

@Service
@Transactional
@RequiredArgsConstructor
public class StatisticsService {

    private final StatisticsRepository statisticsRepository;

    public void createTable(LocalDate localDate) {
        Statistics statistics = new Statistics();
        statistics.setDate(localDate);
        statisticsRepository.save(statistics);
    }

    Statistics findByDate(LocalDate date) {
        return statisticsRepository.findByDate(date);
    }
}
