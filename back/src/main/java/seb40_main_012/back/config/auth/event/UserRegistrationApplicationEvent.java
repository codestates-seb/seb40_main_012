package seb40_main_012.back.config.auth.event;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;
import seb40_main_012.back.user.entity.User;

@Getter
public class UserRegistrationApplicationEvent extends ApplicationEvent {
    private User user;

    public UserRegistrationApplicationEvent(Object source, User user) {
        super(source);
        this.user = user;
    }
}
