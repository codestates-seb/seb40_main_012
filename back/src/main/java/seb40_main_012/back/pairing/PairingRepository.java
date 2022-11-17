package seb40_main_012.back.pairing;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import seb40_main_012.back.common.comment.entity.Comment;

import seb40_main_012.back.pairing.entity.Pairing;

import java.util.List;

public interface PairingRepository extends JpaRepository<Pairing, Long> {


    Slice<Pairing> findSliceBy(Pageable pageable);

//    @Query(nativeQuery = true, value = "SELECT * FROM PAIRING WHERE BOOK_ID =:1; ")
//    Slice<Pairing> findCategorySliceBy(Pageable pageable);

//    @Query(nativeQuery = true, value = "select * " +
//            "from Pairing " +
//            "where pairing_category = :name")
//    Slice<Pairing> findCategorySliceBy(@Param("name") String name);

    @Query(nativeQuery = true, value = "select * " +
            "from Pairing " +
            "where pairing_category = :name ")
//            + "order by " + "like_count " + "desc")
    Slice<Pairing> findCategorySliceByLikeDesc(@Param("name") String name, Pageable pageable);

    @Query(nativeQuery = true, value = "select * " +
            "from Pairing " +
            "where pairing_category = :name " +
            "order by " + "created_at " + "desc")
    Slice<Pairing> findCategorySliceByNewestDesc(@Param("name") String name, Pageable pageable);

    @Query(nativeQuery = true, value = "select * " +
            "from Pairing " +
            "order by " + "like_count " + "desc " +
            "limit 10")
    List<Pairing> findBestTenCategory();

    Long countBy();

    List<Pairing> findByUser_UserId(Long userId);

}

