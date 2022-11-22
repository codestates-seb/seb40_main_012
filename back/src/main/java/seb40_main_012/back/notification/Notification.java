package seb40_main_012.back.notification;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import seb40_main_012.back.user.entity.User;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "notificationId")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long notificationId;

//    @Embedded
//    private NotificationContent content;
//
    @Column
    private String url; // 알림 링크

    @Column
    private String body; // 알림 내용

    @Column
    private String likeUserNickName;

    @Column(nullable = false)
    private String commentUserNickName;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User receiver;

    @Column
    private String receiverPairingTitle; // receiver 페어링 타이틀

    @Column
    private String receiverCommentBody; // receiver 코멘트 내용

    @Column(nullable = false)
    private boolean isRead;

    @Column
    private LocalDateTime createdAt;
}
