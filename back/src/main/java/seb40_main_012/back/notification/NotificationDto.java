package seb40_main_012.back.notification;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.time.LocalDateTime;

public class NotificationDto {

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {

        private long notificationId;
        private String likeUserNickName;
        private String commentUserNickName;
        private String receiverPairingTitle;
        private String receiverCommentBody;
        private boolean isRead;
        private LocalDateTime createdAt;

        public static NotificationDto.Response from(Notification notification) {
            return Response.builder()
                    .likeUserNickName(notification.getLikeUserNickName())
                    .commentUserNickName(notification.getCommentUserNickName())
                    .receiverPairingTitle(notification.getReceiverPairingTitle())
                    .receiverCommentBody(notification.getReceiverCommentBody())
                    .isRead(notification.isRead())
                    .createdAt(notification.getCreatedAt())
                    .build();
        }
    }
}
