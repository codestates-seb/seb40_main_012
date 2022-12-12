package seb40_main_012.back.statistics;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class StayTimeService {

    private final StayTimeRepository stayTimeRepository;

    public void createStayTimeTable() {
        StayTime stayTime = new StayTime();
        stayTimeRepository.save(stayTime);
    }

    public StayTime getByUserId(long userId) {
        return null;
    }
}
