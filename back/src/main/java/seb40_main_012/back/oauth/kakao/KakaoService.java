package seb40_main_012.back.oauth.kakao;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.repository.UserRepository;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class KakaoService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public String getAccessToken(String authorize_code) {
        String access_Token = "";
        String refresh_Token = "";
        String reqURL = "https://kauth.kakao.com/oauth/token";

        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            //    POST 요청을 위해 기본값이 false인 setDoOutput을 true로
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            //    POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("content_type:" + "application/x-www-form-urlencoded");
            sb.append("&grant_type=authorization_code");
            sb.append("&client_id=e50e158c20358065eb3d6e2eabd76f5c");
            sb.append("&redirect_uri=http://localhost:3000/oauth/kakao");
            sb.append("&client_name=cherrypick");
//            sb.append("&client_secret=Y4aPCredJvfOGMtsTZHT2i50nX3EyvZ7");
            sb.append("&code=").append(authorize_code);
            bw.write(sb.toString());
            bw.flush();

            // 결과 코드가 200이면 성공
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            // 요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body : " + result);

            // Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            JsonElement element = JsonParser.parseString(result);

            access_Token = element.getAsJsonObject().get("access_token").getAsString();
            refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();

            System.out.println("access_token : " + access_Token);
            System.out.println("refresh_token : " + refresh_Token);

            br.close();
            bw.close();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return access_Token;
    }

    public HashMap<String, Object> getUserInfo(String access_Token) {

        // 요청하는 클라이언트마다 가진 정보가 다를 수 있기에 HashMap타입으로 선언
        HashMap<String, Object> userInfo = new HashMap<>();
        String reqURL = "https://kapi.kakao.com/v2/user/me";
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");

            // 요청에 필요한 Header에 포함될 내용
            conn.setRequestProperty("Authorization", "Bearer " + access_Token);

            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }

            JsonElement element = JsonParser.parseString(result);

            JsonObject properties = element.getAsJsonObject().get("properties").getAsJsonObject();
            JsonObject kakao_account = element.getAsJsonObject().get("kakao_account").getAsJsonObject();

            String nickname = properties.getAsJsonObject().get("nickname").getAsString();
            String picture = properties.getAsJsonObject().get("thumbnail_image").getAsString();
            String email = kakao_account.getAsJsonObject().get("email").getAsString();

            userInfo.put("nickname", nickname);
            userInfo.put("thumbnail_image", picture);
            userInfo.put("email", email);

        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return userInfo;
    }

    public User createUser(HashMap<String, Object> userInfo) { // OAuth 인증이 끝나 유저 정보를 받은 경우

        String email = userInfo.get("email").toString();
        String picture = userInfo.get("thumbnail_image").toString();
        String nickName = userInfo.get("nickname").toString();
        String encodedPass = bCryptPasswordEncoder.encode(userInfo.get("nickname").toString());

        User user = new User();

        if (userRepository.findByNickName(nickName) == null) { // + 해당 닉네임을 가진 회원이 없는 경우

            user = User.builder()
                    .email(email)
                    .nickName(nickName)
                    .bookTemp(36.5)
                    .firstLogin(true)
                    .profileImage(picture)
                    .roles(List.of("USER"))
                    .password(encodedPass)
                    .build();

            userRepository.save(user);

        } else if (userRepository.findByNickName(nickName) != null) { // 해당 닉네임을 가진 회원이 있는 경우

            user = User.builder()
                    .email(email)
                    .nickName(nickName + LocalDateTime.now())
                    .bookTemp(36.5)
                    .firstLogin(true)
                    .profileImage(picture)
                    .password(encodedPass)
                    .build();

            userRepository.save(user);
        }

        return user;
    }
}
