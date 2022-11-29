package seb40_main_012.back.follow;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {

    @Modifying // INSERT 실행시 강제
    @Query(nativeQuery = true, value = "INSERT INTO follow (following_User_Id, followed_User_Id, create_date) " +
            "VALUES(:followingUserId, :followedUserId, current_timestamp)")
    Integer makeFollow(Long followingUserId, Long followedUserId);

    @Modifying
    @Query(nativeQuery = true, value = "DELETE FROM follow WHERE following_User_Id = :followingUserId " +
            "AND followed_User_Id=:followedUserId")
    Integer makeUnFollow(Long followingUserId, Long followedUserId);

    @Query(nativeQuery = true, value = "select count(*) from follow where following_User_Id = :userId AND followed_User_Id = :followedUserId")
    Long countFollower(Long userId, Long followedUserId); // 나의 팔로워 숫자

    @Query(nativeQuery = true, value = "select count(*) from follow where following_User_Id = :userId")
    Long countFollowing(Long userId); // 내가 팔로워 하고 있는 숫자

    @Query(nativeQuery = true, value = "select following_user_id from follow where followed_User_Id =:userId")
    List<Long> findFollowersByUserId(Long userId);

    @Query(nativeQuery = true, value = "select followed_user_id from follow where following_User_Id =:userId")
    List<Long> findFollowingsByUserId(Long userId);
}
