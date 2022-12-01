package seb40_main_012.back.statistics;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StayTimeRepository extends JpaRepository<StayTime, Long> {

    @Query(nativeQuery = true, value =
            "SELECT * FROM STAY_TIME " +
            "WHERE USER_ID = :userId"
    )
    List<StayTime> findAllByUserId(long userId);

    @Query(nativeQuery = true, value =
            "SELECT * FROM STAY_TIME " +
                    "WHERE REFRESH_TOKEN = :token"
    )
    StayTime findByToken(String token);

    @Modifying
    @Query(nativeQuery = true, value = "DELETE FROM STAY_TIME WHERE REFRESH_TOKEN = :token")
    void deleteByToken(String token);
}
