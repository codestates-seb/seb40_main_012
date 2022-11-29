package seb40_main_012.back.config.auth.service;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import seb40_main_012.back.advice.BusinessLogicException;
import seb40_main_012.back.advice.ExceptionCode;
import seb40_main_012.back.config.auth.utils.CustomAuthorityUtils;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.repository.UserRepository;

import java.util.Collection;
import java.util.Optional;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;
    private final CustomAuthorityUtils authorityUtils;

    public UserDetailsServiceImpl(UserRepository userRepository, CustomAuthorityUtils authorityUtils) {
        this.userRepository = userRepository;
        this.authorityUtils = authorityUtils;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        User findUser = optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

        return new UserDetailsImpl(findUser);
    }

    public static class UserDetailsImpl extends User implements UserDetails {
        public UserDetailsImpl(User user) {
            setUserId(user.getUserId());
            setFirstLogin(user.isFirstLogin());
            setEmail(user.getEmail());
            updateNickName(user.getNickName());
            setBookTemp(user.getBookTemp());
            setIntroduction(user.getIntroduction());
            setPassword(user.getPassword());
            setRoles(user.getRoles());
            setProfileImage(user.getProfileImage());
            //setProviderType(user.getProviderType());
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
//            return authorityUtils.createAuthorities(this.getRoles());
            return null; //에러 때문에 주석 처리하였습니다.
        }

        @Override
        public String getUsername() {
            return getEmail();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }
}