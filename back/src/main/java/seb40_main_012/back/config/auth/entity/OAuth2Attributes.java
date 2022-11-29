package seb40_main_012.back.config.auth.entity;

import lombok.Builder;
import lombok.Getter;
import seb40_main_012.back.config.auth.entity.enums.ProviderType;
import seb40_main_012.back.user.entity.User;

import java.util.List;
import java.util.Map;

@Getter
public class OAuth2Attributes {
    private Map<String, Object> attributes;
    private String nameAttributeKey;
    private String name;
    private String email;
    private String picture;
    private String site;

    @Builder
    public OAuth2Attributes(Map<String, Object> attributes, String nameAttributeKey, String name, String email, String picture, String site) {
        this.attributes = attributes;
        this.nameAttributeKey = nameAttributeKey;
        this.name = name;
        this.email = email;
        this.picture = picture;
        this.site = site;
    }

    public static OAuth2Attributes of(String registrationId, String userNameAttributeName, Map<String, Object> attributes) {
        if(registrationId.equals("naver"))
            return ofNaver(registrationId, attributes, "id");

        return ofGoogle(registrationId, attributes, userNameAttributeName);
    }

    // 구글
    public static OAuth2Attributes ofGoogle(String site, Map<String, Object> attributes, String nameAttributeKey) {
        return OAuth2Attributes.builder()
                .attributes(attributes)
                .nameAttributeKey(nameAttributeKey)
                .name((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .picture((String) attributes.get("picture"))
                .site(site)
                .build();
    }

    // 네이버
    public static OAuth2Attributes ofNaver(String site, Map<String, Object> attributes, String nameAttributeKey) {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");

        return OAuth2Attributes.builder()
                .attributes(attributes)
                .nameAttributeKey(nameAttributeKey)
                .name((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .picture((String) attributes.get("profile_image"))
                .site(site)
                .build();
    }

    public User toEntity() {
        User user = new User();
        user.setFirstLogin(true);
        user.setNickName(name);
        user.setEmail(email);
        user.setBookTemp(0.0);
        user.setProfileImage(picture);
        user.setRoles(List.of("USER"));
        user.setProviderType(ProviderType.valueOf(site.toUpperCase()));

        return user;
    }
}
