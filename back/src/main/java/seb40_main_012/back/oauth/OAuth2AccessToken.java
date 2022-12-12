package seb40_main_012.back.oauth;

import lombok.Builder;
import lombok.Setter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Setter
public class OAuth2AccessToken extends AbstractAuthenticationToken {

    private OAuth2UserDetails principal; //OAuth2UserDetails 타입
    private String accessToken;
    private Collection<GrantedAuthority> authorities;

    public OAuth2AccessToken(String accessToken) {
        super(null);
        this.accessToken = accessToken;
        setAuthenticated(false);
    }

    @Builder
    public OAuth2AccessToken(Object principal, Collection<? extends GrantedAuthority> authorities) {
        super(authorities);
        this.principal = (OAuth2UserDetails) principal;
        super.setAuthenticated(true); // must use super, as we override
    }

    @Override
    public Object getPrincipal() {
        return this.principal;
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public Collection<GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public String getAccessToken() {
        return accessToken;
    }
}
