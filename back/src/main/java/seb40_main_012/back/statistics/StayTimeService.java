package seb40_main_012.back.statistics;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class StayTimeService {

    private final StayTimeRepository stayTimeRepository;
}
