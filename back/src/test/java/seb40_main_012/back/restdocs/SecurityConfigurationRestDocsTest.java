package seb40_main_012.back.restdocs;

import com.google.gson.Gson;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;
import seb40_main_012.back.config.SecurityConfiguration;
import seb40_main_012.back.config.auth.cookie.CookieManager;
import seb40_main_012.back.config.auth.dto.LoginDto;
import seb40_main_012.back.config.auth.jwt.JwtTokenizer;
import seb40_main_012.back.config.auth.userdetails.UserDetailsServiceImpl;
import seb40_main_012.back.user.entity.User;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static seb40_main_012.back.util.ApiDocumentUtils.getDocumentRequest;
import static seb40_main_012.back.util.ApiDocumentUtils.getDocumentResponse;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
@Import({SecurityConfiguration.class})
public class SecurityConfigurationRestDocsTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @MockBean
    private AuthenticationManager authenticationManager;

    @MockBean
    private UserDetailsServiceImpl userDetailsServiceImpl;

    @InjectMocks
    private JwtTokenizer jwtTokenizer;

    @InjectMocks
    private CookieManager cookieManager;

    @Test
    void loginTest() throws Exception {
        User user = new User();
        user.setEmail("test@test.com");
        user.setNickName("테스트");
        user.setPassword(encoder.encode("1234"));
        user.setBookTemp(36.5);
        user.setRoles(List.of("USER"));

        LoginDto.PostDto loginDto =
                LoginDto.PostDto.builder()
                        .email("test@test.com")
                        .password("1234")
                        .build();

        String content = gson.toJson(loginDto);

        LoginDto.ResponseDto response =
                LoginDto.ResponseDto.builder()
                        .firstLogin(true)
                        .nickName("테스트")
                        .bookTemp(36.5)
                        .email("test@test.com")
                        .roles(List.of("USER"))
                        .build();

        UserDetailsServiceImpl.UserDetailsImpl userDetails = new UserDetailsServiceImpl.UserDetailsImpl(user);

        when(userDetailsServiceImpl.loadUserByUsername("test@test.com")).thenReturn(userDetails);

        ResultActions actions =
                mockMvc.perform(post("/api/login")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
                );

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstLogin").value(response.isFirstLogin()))
                .andExpect(jsonPath("$.nickName").value(response.getNickName()))
                .andExpect(jsonPath("$.bookTemp").value(response.getBookTemp()))
                .andExpect(jsonPath("$.email").value(response.getEmail()))
                .andExpect(jsonPath("$.roles").value(String.join(",", response.getRoles())))
                .andDo(document(
                        "User_Login",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        requestFields(
                                List.of(
                                        fieldWithPath("email").type(JsonFieldType.STRING).description("회원 이메일"),
                                        fieldWithPath("password").type(JsonFieldType.STRING).description("회원 비밀번호")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("firstLogin").type(JsonFieldType.BOOLEAN).description("최초 로그인 여부"),
                                        fieldWithPath("nickName").type(JsonFieldType.STRING).description("회원 닉네임"),
                                        fieldWithPath("bookTemp").type(JsonFieldType.NUMBER).description("책의 온기"),
                                        fieldWithPath("email").type(JsonFieldType.STRING).description("회원 이메일"),
                                        fieldWithPath("roles[]").type(JsonFieldType.ARRAY).description("회원 역할")
                                )
                        )
                ));
    }
}
