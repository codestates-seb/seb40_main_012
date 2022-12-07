package seb40_main_012.back.oauth.kakao.userInfo;

import java.util.Map;

public interface UserInfo {

    Map<String, Object> getAttributes();
    String getProviderId();
    String getProvider();
    String getEmail();
    String getName();
}
