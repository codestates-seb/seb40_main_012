//package seb40_main_012.back.config.auth.filter;
//
//import lombok.RequiredArgsConstructor;
//import lombok.SneakyThrows;
//import org.springframework.security.authentication.AuthenticationProvider;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.stereotype.Component;
//import seb40_main_012.back.oauth.OAuth2PrincipalDetails;
//import seb40_main_012.back.oauth.OAuth2PrincipalUserService;
//import seb40_main_012.back.user.entity.User;
//import seb40_main_012.back.user.repository.UserRepository;
//
//@Component
//@RequiredArgsConstructor
//public class AccessTokenAuthenticationProvider implements AuthenticationProvider {
//
//    private final OAuth2PrincipalUserService oAuth2PrincipalUserService;  //restTemplate를 통해서 AccessToken을 가지고 회원의 정보를 가져오는 역할을 한다.
//    private final UserRepository userRepository;//받아온 정보를 통해 DB에서 회원을 조회하는 역할을 한다.
//
//
//
//    @SneakyThrows
//    @Override
//    public Authentication authenticate(Authentication authentication) throws AuthenticationException {//ProviderManager가 호출한다. 인증을 처리한다
//
//        OAuth2PrincipalDetails oAuth2User = oAuth2PrincipalUserService.loadUser((AccessTokenSocialTypeToken) authentication);
//        //OAuth2UserDetails는  UserDetails를 상속받아 구현한 클래스이다. 이후 일반 회원가입 시 UserDetails를 사용하는 부분과의 다형성을 위해 이렇게 구현하였다.
//        //getOAuth2UserDetails에서는 restTemplate과 AccessToken을 가지고 회원정보를 조회해온다 (식별자 값을 가져옴)
//
//
//        oAuth2User.setRoles(member.getRole().name());//우리의 Role의 name은 ADMIN, USER, GUEST로 ROLE_을 붙여주는 과정이 필요하다. setRolse가 담당한다.
//
//        return AccessTokenSocialTypeToken.builder().principal(oAuth2User).authorities(oAuth2User.getAuthorities()).build();
//        //AccessTokenSocialTypeToken객체를 반환한다. principal은 OAuth2UserDetails객체이다. (formLogin에서는 UserDetails를 가져와서 결국 ContextHolder에 저장하기 때문에)
//        //이렇게 구현하면 UserDetails 타입으로 회원의 정보를 어디서든 조회할 수 있다.
//    }
//
//
//
//    @Override
//    public boolean supports(Class<?> authentication) {
//        return AccessTokenSocialTypeToken.class.isAssignableFrom(authentication); //AccessTokenSocialTypeToken타입의  authentication 객체이면 해당 Provider가 처리한다.
//    }
//}
