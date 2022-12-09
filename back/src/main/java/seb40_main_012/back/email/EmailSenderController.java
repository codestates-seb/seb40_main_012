package seb40_main_012.back.email;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Slf4j
@Component
@Transactional
@RequiredArgsConstructor
public class EmailSenderController {

    private final JavaMailSender javaMailSender;

    @Async // 이메일 비동기 처리를 위해 추가
    public void send(String toAddress, String title, String body) throws MessagingException {
        MimeMessage mailMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mailMessage, "UTF-8");

        mimeMessageHelper.setTo(toAddress);
        mimeMessageHelper.setSubject(title);
        mimeMessageHelper.setText(body, true);
        javaMailSender.send(mailMessage);

        log.info("Sent Email");
    }
}
