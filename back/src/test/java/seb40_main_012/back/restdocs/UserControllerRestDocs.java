//package seb40_main_012.back.restdocs;
//
//import com.google.gson.Gson;
//import org.apache.tomcat.util.http.parser.Authorization;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
//import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.context.TestConfiguration;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.context.annotation.ComponentScan;
//import org.springframework.context.annotation.FilterType;
//import org.springframework.http.MediaType;
//import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
//import org.springframework.restdocs.payload.JsonFieldType;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.builders.WebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.test.context.support.WithAnonymousUser;
//import org.springframework.security.test.context.support.WithMockUser;
//import org.springframework.security.test.context.support.WithUserDetails;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.ResultActions;
//import org.springframework.transaction.annotation.Transactional;
//import seb40_main_012.back.common.comment.CommentDto;
//import seb40_main_012.back.common.comment.entity.Comment;
//import seb40_main_012.back.config.SecurityConfiguration;
//import seb40_main_012.back.config.auth.dto.LoginDto;
//import seb40_main_012.back.config.auth.filter.JwtAuthenticationFilter;
//import seb40_main_012.back.config.auth.handler.UserAuthenticationSuccessHandler;
//import seb40_main_012.back.config.auth.jwt.JwtTokenizer;
//import seb40_main_012.back.user.controller.UserController;
//import seb40_main_012.back.user.dto.UserDto;
//import seb40_main_012.back.user.entity.User;
//import seb40_main_012.back.user.mapper.UserMapper;
//import seb40_main_012.back.user.repository.UserRepository;
//import seb40_main_012.back.user.service.UserService;
//
//import javax.servlet.FilterChain;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.util.ArrayList;
//import java.util.Collection;
//import java.util.List;
//
//import static org.mockito.ArgumentMatchers.*;
//import static org.mockito.BDDMockito.given;
//import static org.mockito.Mockito.when;
//import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
//import static org.springframework.restdocs.payload.PayloadDocumentation.*;
//import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
//import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
//import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.anonymous;
//import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//import static seb40_main_012.back.util.ApiDocumentUtils.getDocumentRequest;
//import static seb40_main_012.back.util.ApiDocumentUtils.getDocumentResponse;
//
//@Transactional
//@SpringBootTest
//@AutoConfigureMockMvc
//@AutoConfigureRestDocs
//public class UserControllerRestDocs {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Autowired
//    private Gson gson;
//
//    @MockBean
//    private UserService userService;
//
//    @MockBean
//    private UserMapper userMapper;
//
//
//    @Test
//    void postUserTest() throws Exception { // 회원 가입
//
//        UserDto.PostDto post =
//                UserDto.PostDto.builder()
//                        .email("running_potato@email.com")
//                        .nickName("Running Potato")
//                        .password("12345678")
//                        .build();
//
//        String content = gson.toJson(post);
//
//        UserDto.ResponseDto response =
//                UserDto.ResponseDto.builder()
//                        .nickName("Running Potato")
//                        .email("running_potato@email.com")
//                        .roles(List.of("USER"))
//                        .build();
//
//        given(userMapper.userPostToUser(Mockito.any(UserDto.PostDto.class))).willReturn(new User());
//        given(userService.createUser(Mockito.any(User.class))).willReturn(new User());
//        given(userMapper.userToUserResponse(Mockito.any(User.class))).willReturn(response);
//
//        ResultActions actions =
//                mockMvc.perform(
//                        RestDocumentationRequestBuilders.post("/api/users")
//                                .accept(MediaType.APPLICATION_JSON)
//                                .contentType(MediaType.APPLICATION_JSON)
//                                .content(content)
//                );
//
//        actions
//                .andExpect(status().isCreated())
//                .andExpect(jsonPath("$.data.nickName").value(post.getNickName()))
//                .andExpect(jsonPath("$.data.email").value(post.getEmail()))
//                .andDo(document(
//                        "Post_User",
//                        getDocumentRequest(),
//                        getDocumentResponse(),
//                        requestFields(
//                                List.of(
//                                        fieldWithPath("nickName").type(JsonFieldType.STRING).description("회원 닉네임"),
//                                        fieldWithPath("email").type(JsonFieldType.STRING).description("회원 이메일"),
//                                        fieldWithPath("password").type(JsonFieldType.STRING).description("회원 비밀번호")
//                                )
//                        ),
//                        responseFields(
//                                List.of(
//                                        fieldWithPath("data.").type(JsonFieldType.OBJECT).description("결과 데이터"),
//                                        fieldWithPath("data.nickName").type(JsonFieldType.STRING).description("회원 닉네임"),
//                                        fieldWithPath("data.email").type(JsonFieldType.STRING).description("회원 이메일"),
//                                        fieldWithPath("data.roles[]").type(JsonFieldType.ARRAY).description("회원 역할")
//                                )
//                        )));
//    }
//
////    @Test
////    @WithUserDetails(value = "running_potato@email.com")
////    void loginTest() throws Exception {
////
////        LoginDto.PostDto loginDto =
////                LoginDto.PostDto.builder()
////                        .email("running_potato@email.com")
////                        .password("1234")
////                        .build();
////
////        String content = gson.toJson(loginDto);
////
////        User response =
////                User.builder()
////                        .firstLogin(true)
////                        .nickName("Running Potato")
////                        .email("running_potato@email.com")
////                        .roles(List.of("USER"))
////                        .build();
////
////        given(userService.getLoginUser()).willReturn(response);
////
////
////
////        ResultActions actions =
////                mockMvc.perform(
////                        RestDocumentationRequestBuilders.post("/api/login")
////                                .with(csrf())
////                                .accept(MediaType.APPLICATION_JSON)
////                                .contentType(MediaType.APPLICATION_JSON)
////                                .content(content)
////                );
////
////        actions
////                .andExpect(status().isOk())
////                .andExpect(jsonPath("$.data.nickName").value(loginDto.getEmail()))
////                .andExpect(jsonPath("$.data.email").value(loginDto.getPassword()))
////                .andDo(document(
////                        "Login_User",
////                        getDocumentRequest(),
////                        getDocumentResponse(),
////                        requestFields(
////                                List.of(
////                                        fieldWithPath("email").type(JsonFieldType.STRING).description("회원 이메일"),
////                                        fieldWithPath("password").type(JsonFieldType.STRING).description("회원 비밀번호")
////                                )
////                        ),
////                        responseFields(
////                                List.of(
////                                        fieldWithPath("data.").type(JsonFieldType.OBJECT).description("결과 데이터"),
////                                        fieldWithPath("firstLogin").type(JsonFieldType.BOOLEAN).description("최초 로그인 여부"),
////                                        fieldWithPath("data.nickName").type(JsonFieldType.STRING).description("회원 닉네임"),
////                                        fieldWithPath("data.email").type(JsonFieldType.STRING).description("회원 이메일"),
////                                        fieldWithPath("data.roles[]").type(JsonFieldType.ARRAY).description("회원 역할")
////                                )
////                        )));
////
////
////    }
//
////    @Test
////    void patchUserTest() throws Exception {
////    }
//
//    @Test
//    void getUserTest() throws Exception {
//
//        long userId = 1;
//
//        UserDto.ResponseDto response =
//                UserDto.ResponseDto.builder()
//                        .nickName("Running_Potato")
//                        .email("running_potato@email.com")
//                        .roles(List.of("USER"))
//                        .build();
//
//        given(userService.findUser(anyLong())).willReturn(new User());
//        given(userMapper.userToUserResponse(Mockito.any(User.class))).willReturn(response);
//
//        ResultActions actions =
//                mockMvc.perform(
//                        RestDocumentationRequestBuilders.get("/api/users/{userId}", userId)
//                                .accept(MediaType.APPLICATION_JSON)
//                );
//
//        actions
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.data.nickName").value(response.getNickName()))
//                .andExpect(jsonPath("$.data.email").value(response.getEmail()))
//                .andExpect(jsonPath("$.data.roles.[0]").value(response.getRoles().get(0)))
//                .andDo(document(
//                        "Get_User",
//                        getDocumentRequest(),
//                        getDocumentResponse(),
//                        pathParameters(
//                                parameterWithName("userId").description("회원 번호")
//                        ),
//                        responseFields(
//                                List.of(
//                                        fieldWithPath("data.").type(JsonFieldType.OBJECT).description("결과 데이터"),
//                                        fieldWithPath("data.nickName").type(JsonFieldType.STRING).description("회원 닉네임"),
//                                        fieldWithPath("data.email").type(JsonFieldType.STRING).description("회원 이메일"),
//                                        fieldWithPath("data.roles[]").type(JsonFieldType.ARRAY).description("회원 역할")
//                                )
//                        )));
//    }
//
////    @Test
////    void getUsersTest() throws Exception {
////    }
////
////    @Test
////    void deleteUserTest() throws Exception {
////    }
//}
