//package seb40_main_012.back.oauth.google;
//
//import com.google.gson.JsonElement;
//import com.google.gson.JsonParser;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//import seb40_main_012.back.user.entity.User;
//import seb40_main_012.back.user.repository.UserRepository;
//
//import java.io.*;
//import java.net.HttpURLConnection;
//import java.net.URL;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.stream.Collectors;
//
//@Service
//@Transactional
//@RequiredArgsConstructor
//public class GoogleService {
//    private String GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
//
//    @Value("${spring.security.oauth2.client.registration.google.clientId}")
//    private String GOOGLE_CLIENT_ID;
//
//    @Value("${spring.security.oauth2.client.registration.google.clientSecret}")
//    private String GOOGLE_CLIENT_SECRET;
//    private String GOOGLE_CALLBACK_URL = "http://localhost:3000/oauth/google";
//    private String GOOGLE_USER_INFO_URL = "https://www.googleapis.com/oauth2/v1/userinfo";
//
//    private final UserRepository userRepository;
//
//    public String getGoogleAccessToken(String code) {
//        try {
//            URL url = new URL(GOOGLE_TOKEN_URL);
//            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
//            conn.setRequestMethod("POST");
//            conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
//            conn.setDoOutput(true);
//
//            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
//            StringBuilder sb = new StringBuilder();
//            sb.append("grant_type=authorization_code");
//            sb.append("&client_id="+GOOGLE_CLIENT_ID);
//            sb.append("&client_secret=" + GOOGLE_CLIENT_SECRET);
//            sb.append("&code="+code);
//            sb.append("&redirect_uri="+GOOGLE_CALLBACK_URL);
//            bw.write(sb.toString());
//            bw.flush();
//
//            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
//            StringBuilder sb2 = new StringBuilder();
//            String line;
//
//            while ((line = br.readLine()) != null) {
//                sb2.append(line);
//            }
//
//            if (conn.getResponseCode() == 200) {
//                JsonElement element = JsonParser.parseString(sb2.toString());
//
//                String accessToken = element.getAsJsonObject().get("access_token").getAsString();
//                return accessToken;
//            }
//        } catch (IOException e) {
//            throw new IllegalArgumentException("알 수 없는 구글 로그인 Access Token 요청 URL 입니다 :: " + GOOGLE_TOKEN_URL);
//        }
//
//        return "구글 로그인 요청 처리 실패";
//    }
//
//    public HashMap<String, Object> getUserInfo(String token) {
//        HashMap<String, Object> userInfo = new HashMap<>();
//        try {
//            URL url = new URL(GOOGLE_USER_INFO_URL);
//            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
//            conn.setRequestMethod("GET");
//
//            conn.setRequestProperty("Authorization", "Bearer " + token);
//
//            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
//            StringBuilder sb = new StringBuilder();
//            String line;
//
//            while ((line = br.readLine()) != null) {
//                sb.append(line);
//            }
//
//            if (conn.getResponseCode() == 200) {
//                JsonElement element = JsonParser.parseString(sb.toString());
//
//                String nickName = element.getAsJsonObject().get("name").getAsString();
//                String email = element.getAsJsonObject().get("email").getAsString();
//                String profileImage = element.getAsJsonObject().get("picture").getAsString();
//
//                userInfo.put("nickName", nickName);
//                userInfo.put("email", email);
//                userInfo.put("profileImage", profileImage);
//            }
//        } catch (IOException e) {
//            throw new IllegalArgumentException("알 수 없는 구글 User Info 요청 URL 입니다 :: " + GOOGLE_USER_INFO_URL);
//        }
//
//        return userInfo;
//    }
//
//    public User saveOrUpdate(HashMap<String, Object> userInfo) {
//        User user = userRepository.findByEmail(userInfo.get("email").toString())
//                .orElse(
//                        User.builder()
//                                .firstLogin(true)
//                                .nickName(userInfo.get("nickName").toString() + "_GOOGLE")
//                                .email(userInfo.get("email").toString())
//                                .bookTemp(36.5)
//                                .profileImage(userInfo.get("profileImage").toString())
//                                .roles(List.of("USER"))
//                                .build()
//                );
//
//        return userRepository.save(user);
//    }
//}
