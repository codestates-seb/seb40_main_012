package seb40_main_012.back.oauth.userInfo;

import java.util.Map;

public class KakaoUserInfo implements OAuth2UserInfo {
    private Map<String, Object> attributes;
    private Map<String, Object> attributesAccount;
    private Map<String, Object> attributesProfile;

    public KakaoUserInfo(Map<String, Object> attributes) {
        /*
        System.out.println(attributes);
            {id=아이디값,
            connected_at=2022-02-22T15:50:21Z,
            properties={nickname=이름},
            kakao_account={
                profile_nickname_needs_agreement=false,
                profile={nickname=이름},
                has_email=true,
                email_needs_agreement=false,
                is_email_valid=true,
                is_email_verified=true,
                email=이메일}
            }
        */
        this.attributes = attributes;
        this.attributesAccount = (Map<String, Object>) attributes.get("kakao_account");
        this.attributesProfile = (Map<String, Object>) attributesAccount.get("profile");
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public String getProviderId() {
        return attributes.get("id").toString();
    }

    @Override
    public String getProvider() {
        return "Kakao";
    }

    @Override
    public String getEmail() {
        return attributesAccount.get("email").toString();
    }

    @Override
    public String getName() {
        return attributesProfile.get("nickname").toString();

    }

    @Override
    public String getProfileImage() {
        return attributesProfile.get("\"thumbnail_image\"").toString();
    }
}
