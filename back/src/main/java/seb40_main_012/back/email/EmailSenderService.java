package seb40_main_012.back.email;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.security.GeneralSecurityException;

@Service
@RequiredArgsConstructor
public class EmailSenderService {

    private final JavaMailSender javaMailSender;
    private final EmailSenderController emailSenderController;

    private String title = "[가입을 환영합니다] Cherry Pick에 오신 것을 환영합니다.";

    @Async
    public void sendSignupEmail(String toAddress) throws GeneralSecurityException {
        try {
            String body =
                    "<img src=\"https://user-images.githubusercontent.com/13742045/203527798-844b9a71-ecb5-441d-a52f-4abb337f07f3.png\" width=\"700\">" +
                            "<br><br>" +
                            "<font size = \"5\">" +
                            "<h1>안녕하세요, 체리<font color=\"#6741FF\">픽</font> 팀입니다.</h1>" +
                            "<h2>" + "&lt;달리는 감자&gt;에서 🍒를 담아 만들었어요." + "</h2>" +
                            "<h2>책과 이어지는 페어링으로 함께 온기를 나누어요.</h2>" +
                            "<h3>바로가기: <A href = \"https://cherry-pick.co.kr/\" target = \"blank\">https://cherry-pick.co.kr/</A></h3>" +
                            "<font>";
            emailSenderController.send(toAddress, title, body);
        } catch (MessagingException e) {
            throw new RuntimeException("메일 전송에 실패했습니다.");
        }
    }

    @Async
    public void sendAuthCode(String toAddress, String authNum) throws GeneralSecurityException {
        try {
            String body =
                    "<img src=\"https://user-images.githubusercontent.com/13742045/203527798-844b9a71-ecb5-441d-a52f-4abb337f07f3.png\" width=\"700\">" +
                            "<br><br>" +
                            "<font size = \"5\">" +
                            "<h1>안녕하세요, 체리<font color=\"#6741FF\">픽</font> 팀입니다.</h1>" +
                            "<h3>" + "아래의 인증코드를 입력하시면 메일 인증이 정상적으로 완료됩니다." + "</h3>" +
                            "<div align=\"center\" style=\"border:1px solid black; font-family:verdana;\">" +
                            "<h2>인증 코드: <font color=\"#026645\">" + authNum + "</font></h2>" +
                            "</div>" +
                            "<font>";
            emailSenderController.send(toAddress, "[CherryPick] 가입 인증 메일입니다", body);
        } catch (MessagingException e) {
            throw new RuntimeException("인증 메일 전송에 실패했습니다.");
        }
    }
}
