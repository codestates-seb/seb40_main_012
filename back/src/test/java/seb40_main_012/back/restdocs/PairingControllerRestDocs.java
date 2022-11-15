package seb40_main_012.back.restdocs;

import com.google.gson.Gson;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;
import seb40_main_012.back.pairing.PairingDto;
import seb40_main_012.back.pairing.PairingMapper;
import seb40_main_012.back.pairing.PairingService;
import seb40_main_012.back.pairing.entity.Pairing;
import seb40_main_012.back.pairing.entity.ParingCategory;
import seb40_main_012.back.user.dto.UserDto;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.mapper.UserMapper;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static seb40_main_012.back.util.ApiDocumentUtils.getDocumentRequest;
import static seb40_main_012.back.util.ApiDocumentUtils.getDocumentResponse;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
public class PairingControllerRestDocs {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private UserMapper userMapper;

    @MockBean
    private PairingService pairingService;

    @MockBean
    private PairingMapper pairingMapper;

    @BeforeEach
    private void init() {

        UserDto.ResponseDto userResponse =
                UserDto.ResponseDto.builder()
                        .email("running_potato@email.com")
                        .nickName("Running_Potato")
                        .roles(List.of("USER"))
                        .build();

        given(userMapper.userToUserResponse(Mockito.any())).willReturn(userResponse);

    }

    @Test
    void postPairingTest() throws Exception {

        long bookId = 1;

        PairingDto.Post post =
                PairingDto.Post.builder()
                        .title("페어링 제목")
                        .body("페어링 내용")
                        .pairingCategory(ParingCategory.FILM)
                        .imagePath("이미지 주소")
                        .outLinkPath("외부 링크")
                        .build();

        String content = gson.toJson(post);

        PairingDto.Response response =
                PairingDto.Response.builder()
                        .bookId(1)
                        .pairingId(1)
                        .userInformation(userMapper.userToUserResponse(new User()))
                        .pairingCategory(ParingCategory.FILM)
                        .title("페어링 제목")
                        .body("페어링 내용")
                        .likeCount(0)
                        .imagePath("이미지 주소")
                        .outLinkPath("외부 링크")
                        .comments(new ArrayList<>())
                        .createdAt(LocalDateTime.now())
                        .modifiedAt(LocalDateTime.now())
                        .build();

        given(pairingMapper.pairingPostToPairing(Mockito.any(PairingDto.Post.class))).willReturn(new Pairing());
        given(pairingService.createPairing(Mockito.any(Pairing.class), anyLong())).willReturn(new Pairing());
        given(pairingMapper.pairingToPairingResponse(Mockito.any(Pairing.class))).willReturn(response);

        ResultActions actions =
                mockMvc.perform(
                        RestDocumentationRequestBuilders.post("/api/books/{bookId}/pairings/add", bookId)
                                .header("Authorization", 200)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        actions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.title").value(post.getTitle()))
                .andExpect(jsonPath("$.data.body").value(post.getBody()))
                .andExpect(jsonPath("$.data.pairingCategory").value(response.getPairingCategory().toString()))
                .andExpect(jsonPath("$.data.imagePath").value(post.getImagePath()))
                .andExpect(jsonPath("$.data.outLinkPath").value(post.getOutLinkPath()))
                .andDo(document(
                        "Post_Pairing",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        pathParameters(
                                parameterWithName("bookId").description("책 번호")
                        ),
                        requestFields(
                                List.of(
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("페어링 제목"),
                                        fieldWithPath("body").type(JsonFieldType.STRING).description("페어링 내용"),
                                        fieldWithPath("pairingCategory").type(JsonFieldType.STRING).description("카테고리"),
                                        fieldWithPath("imagePath").type(JsonFieldType.STRING).description("이미지 주소"),
                                        fieldWithPath("outLinkPath").type(JsonFieldType.STRING).description("외부 링크")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data.").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("data.bookId").type(JsonFieldType.NUMBER).description("책 번호"),
                                        fieldWithPath("data.pairingId").type(JsonFieldType.NUMBER).description("페어링 번호"),
                                        fieldWithPath("data.userInformation.email").type(JsonFieldType.STRING).description("작성자 이메일"),
                                        fieldWithPath("data.userInformation.nickName").type(JsonFieldType.STRING).description("작성자 닉네임"),
                                        fieldWithPath("data.userInformation.roles[]").type(JsonFieldType.ARRAY).description("작성자 역할"),
                                        fieldWithPath("data.pairingCategory").type(JsonFieldType.STRING).description("카테고리"),
                                        fieldWithPath("data.title").type(JsonFieldType.STRING).description("페어링 제목"),
                                        fieldWithPath("data.body").type(JsonFieldType.STRING).description("페어링 내용"),
                                        fieldWithPath("data.likeCount").type(JsonFieldType.NUMBER).description("페어링 좋아요"),
                                        fieldWithPath("data.imagePath").type(JsonFieldType.STRING).description("이미지 주소"),
                                        fieldWithPath("data.outLinkPath").type(JsonFieldType.STRING).description("외부 링크"),
                                        fieldWithPath("data.comments").type(JsonFieldType.ARRAY).description("댓글"),
                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("작성 날짜"),
                                        fieldWithPath("data.modifiedAt").type(JsonFieldType.STRING).description("마지막 수정 날짜")
                                )
                        )));
    }

    @Test
    void patchPairingTest() throws Exception {

        long pairingId = 1;

        PairingDto.Patch patch =
                PairingDto.Patch.builder()
                        .pairingId(pairingId)
                        .title("수정된 페어링 제목")
                        .body("수정된 페어링 내용")
                        .imagePath("수정된 이미지 주소")
                        .outLinkPath("수정된 외부 링크")
                        .build();

        String content = gson.toJson(patch);

        PairingDto.Response response =
                PairingDto.Response.builder()
                        .bookId(1)
                        .pairingId(1)
                        .userInformation(userMapper.userToUserResponse(new User()))
                        .pairingCategory(ParingCategory.FILM)
                        .title("수정된 페어링 제목")
                        .body("수정된 페어링 내용")
                        .likeCount(0)
                        .imagePath("수정된 이미지 주소")
                        .outLinkPath("수정된 외부 링크")
                        .comments(new ArrayList<>())
                        .createdAt(LocalDateTime.now())
                        .modifiedAt(LocalDateTime.now())
                        .build();

        given(pairingMapper.pairingPatchToPairing(Mockito.any(PairingDto.Patch.class))).willReturn(new Pairing());
        given(pairingService.updatePairing(Mockito.any(Pairing.class), anyLong())).willReturn(new Pairing());
        given(pairingMapper.pairingToPairingResponse(Mockito.any(Pairing.class))).willReturn(response);

        ResultActions actions =
                mockMvc.perform(
                        RestDocumentationRequestBuilders.patch("/api/books/pairings/{pairingId}/edit", pairingId)
                                .header("Authorization", 200)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.title").value(patch.getTitle()))
                .andExpect(jsonPath("$.data.body").value(patch.getBody()))
                .andExpect(jsonPath("$.data.imagePath").value(patch.getImagePath()))
                .andExpect(jsonPath("$.data.outLinkPath").value(patch.getOutLinkPath()))
                .andDo(document(
                        "Patch_Pairing",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        pathParameters(
                                parameterWithName("pairingId").description("수정된 페어링 번호")
                        ),
                        requestFields(
                                List.of(
                                        fieldWithPath("pairingId").type(JsonFieldType.NUMBER).description("수정된 페어링 번호"),
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("수정된 페어링 제목"),
                                        fieldWithPath("body").type(JsonFieldType.STRING).description("수정된 페어링 내용"),
                                        fieldWithPath("imagePath").type(JsonFieldType.STRING).description("수정된 이미지 주소"),
                                        fieldWithPath("outLinkPath").type(JsonFieldType.STRING).description("수정된 외부 링크")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data.").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("data.bookId").type(JsonFieldType.NUMBER).description("책 번호"),
                                        fieldWithPath("data.pairingId").type(JsonFieldType.NUMBER).description("페어링 번호"),
                                        fieldWithPath("data.userInformation.email").type(JsonFieldType.STRING).description("작성자 이메일"),
                                        fieldWithPath("data.userInformation.nickName").type(JsonFieldType.STRING).description("작성자 닉네임"),
                                        fieldWithPath("data.userInformation.roles[]").type(JsonFieldType.ARRAY).description("작성자 역할"),
                                        fieldWithPath("data.pairingCategory").type(JsonFieldType.STRING).description("카테고리"),
                                        fieldWithPath("data.title").type(JsonFieldType.STRING).description("수정된 페어링 제목"),
                                        fieldWithPath("data.body").type(JsonFieldType.STRING).description("수정된 페어링 내용"),
                                        fieldWithPath("data.likeCount").type(JsonFieldType.NUMBER).description("페어링 좋아요"),
                                        fieldWithPath("data.imagePath").type(JsonFieldType.STRING).description("수정된 이미지 주소"),
                                        fieldWithPath("data.outLinkPath").type(JsonFieldType.STRING).description("수정된 외부 링크"),
                                        fieldWithPath("data.comments").type(JsonFieldType.ARRAY).description("댓글"),
                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("작성 날짜"),
                                        fieldWithPath("data.modifiedAt").type(JsonFieldType.STRING).description("마지막 수정 날짜")
                                )
                        )));
    }

    @Test
    void getPairingTest() throws Exception {

        long pairingId = 1;

        PairingDto.Response response =
                PairingDto.Response.builder()
                        .bookId(1)
                        .pairingId(1)
                        .userInformation(userMapper.userToUserResponse(new User()))
                        .pairingCategory(ParingCategory.FILM)
                        .title("페어링 제목")
                        .body("페어링 내용")
                        .likeCount(0)
                        .imagePath("이미지 주소")
                        .outLinkPath("외부 링크")
                        .comments(new ArrayList<>())
                        .createdAt(LocalDateTime.now())
                        .modifiedAt(LocalDateTime.now())
                        .build();

        given(pairingService.findPairing(anyLong())).willReturn(new Pairing());
        given(pairingMapper.pairingToPairingResponse(Mockito.any(Pairing.class))).willReturn(response);

        ResultActions actions =
                mockMvc.perform(
                        RestDocumentationRequestBuilders.get("/api/books/pairings/{pairingId}", pairingId)
                                .accept(MediaType.APPLICATION_JSON)
                );

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.bookId").value(response.getBookId()))
                .andExpect(jsonPath("$.data.pairingId").value(response.getPairingId()))
                .andExpect(jsonPath("$.data.userInformation.email").value(response.getUserInformation().getEmail()))
                .andExpect(jsonPath("$.data.userInformation.nickName").value(response.getUserInformation().getNickName()))
                .andExpect(jsonPath("$.data.userInformation.roles.[0]").value(response.getUserInformation().getRoles().get(0)))
                .andExpect(jsonPath("$.data.pairingCategory").value(response.getPairingCategory().toString()))
                .andExpect(jsonPath("$.data.title").value(response.getTitle()))
                .andExpect(jsonPath("$.data.body").value(response.getBody()))
                .andExpect(jsonPath("$.data.likeCount").value(response.getLikeCount()))
                .andExpect(jsonPath("$.data.imagePath").value(response.getImagePath()))
                .andExpect(jsonPath("$.data.outLinkPath").value(response.getOutLinkPath()))
                .andExpect(jsonPath("$.data.comments").value(response.getComments()))
                .andDo(document(
                        "Get_Pairing",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        pathParameters(
                                parameterWithName("pairingId").description("페어링 번호")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data.").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("data.bookId").type(JsonFieldType.NUMBER).description("책 번호"),
                                        fieldWithPath("data.pairingId").type(JsonFieldType.NUMBER).description("페어링 번호"),
                                        fieldWithPath("data.userInformation.email").type(JsonFieldType.STRING).description("작성자 이메일"),
                                        fieldWithPath("data.userInformation.nickName").type(JsonFieldType.STRING).description("작성자 닉네임"),
                                        fieldWithPath("data.userInformation.roles[]").type(JsonFieldType.ARRAY).description("작성자 역할"),
                                        fieldWithPath("data.pairingCategory").type(JsonFieldType.STRING).description("카테고리"),
                                        fieldWithPath("data.title").type(JsonFieldType.STRING).description("페어링 제목"),
                                        fieldWithPath("data.body").type(JsonFieldType.STRING).description("페어링 내용"),
                                        fieldWithPath("data.likeCount").type(JsonFieldType.NUMBER).description("페어링 좋아요"),
                                        fieldWithPath("data.imagePath").type(JsonFieldType.STRING).description("이미지 주소"),
                                        fieldWithPath("data.outLinkPath").type(JsonFieldType.STRING).description("외부 링크"),
                                        fieldWithPath("data.comments").type(JsonFieldType.ARRAY).description("댓글"),
                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("작성 날짜"),
                                        fieldWithPath("data.modifiedAt").type(JsonFieldType.STRING).description("마지막 수정 날짜")
                                )
                        )));
    }

    @Test
    void getPairingsTest() throws Exception {

        List<PairingDto.Response> responses = List.of(

                PairingDto.Response.builder()
                        .bookId(1)
                        .pairingId(1)
                        .userInformation(
                                UserDto.ResponseDto.builder()
                                        .email("running_potato_1@email.com")
                                        .nickName("Running_Potato_1")
                                        .roles(List.of("USER"))
                                        .build()
                        )
                        .pairingCategory(ParingCategory.FILM)
                        .title("페어링 제목_1")
                        .body("페어링 내용_1")
                        .likeCount(0)
                        .imagePath("이미지 주소_1")
                        .outLinkPath("외부 링크_1")
                        .comments(new ArrayList<>())
                        .createdAt(LocalDateTime.now())
                        .modifiedAt(LocalDateTime.now())
                        .build(),

                PairingDto.Response.builder()
                        .bookId(1)
                        .pairingId(2)
                        .userInformation(
                                UserDto.ResponseDto.builder()
                                        .email("running_potato_2@email.com")
                                        .nickName("Running_Potato_2")
                                        .roles(List.of("USER"))
                                        .build()
                        )
                        .pairingCategory(ParingCategory.MUSIC)
                        .title("페어링 제목_2")
                        .body("페어링 내용_2")
                        .likeCount(0)
                        .imagePath("이미지 주소_2")
                        .outLinkPath("외부 링크_2")
                        .comments(new ArrayList<>())
                        .createdAt(LocalDateTime.now())
                        .modifiedAt(LocalDateTime.now())
                        .build()
        );

        List<Pairing> listPairings = new ArrayList<>();

        given(pairingService.findPairings()).willReturn(listPairings);
        given(pairingMapper.pairingsToPairingResponses(Mockito.anyList())).willReturn(responses);

        ResultActions actions =
                mockMvc.perform(
                        RestDocumentationRequestBuilders.get("/api/books/pairings")
                                .accept(MediaType.APPLICATION_JSON)
                );

        actions.andExpect(status().isOk())
                .andDo(document("Get_Pairings",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        responseFields(
                                List.of(
                                        fieldWithPath("data.").type(JsonFieldType.ARRAY).description("결과 데이터"),
                                        fieldWithPath("data[].bookId").type(JsonFieldType.NUMBER).description("책 번호"),
                                        fieldWithPath("data[].pairingId").type(JsonFieldType.NUMBER).description("페어링 번호"),
                                        fieldWithPath("data[].userInformation.email").type(JsonFieldType.STRING).description("작성자 이메일"),
                                        fieldWithPath("data[].userInformation.nickName").type(JsonFieldType.STRING).description("작성자 닉네임"),
                                        fieldWithPath("data[].userInformation.roles[]").type(JsonFieldType.ARRAY).description("작성자 역할"),
                                        fieldWithPath("data[].pairingCategory").type(JsonFieldType.STRING).description("카테고리"),
                                        fieldWithPath("data[].title").type(JsonFieldType.STRING).description("페어링 제목"),
                                        fieldWithPath("data[].body").type(JsonFieldType.STRING).description("페어링 내용"),
                                        fieldWithPath("data[].likeCount").type(JsonFieldType.NUMBER).description("페어링 좋아요"),
                                        fieldWithPath("data[].imagePath").type(JsonFieldType.STRING).description("이미지 주소"),
                                        fieldWithPath("data[].outLinkPath").type(JsonFieldType.STRING).description("외부 링크"),
                                        fieldWithPath("data[].comments").type(JsonFieldType.ARRAY).description("댓글"),
                                        fieldWithPath("data[].createdAt").type(JsonFieldType.STRING).description("작성 날짜"),
                                        fieldWithPath("data[].modifiedAt").type(JsonFieldType.STRING).description("마지막 수정 날짜")
                                )
                        )));

    }

    @Test
    void deletePairingTest() throws Exception {

        long pairingId = 1;

        doNothing().when(pairingService).deletePairing(Mockito.anyLong());

        mockMvc.perform(
                        RestDocumentationRequestBuilders.delete("/api/books/pairings/{pairingId}/delete", pairingId)
                                .header("Authorization", 200))
                .andExpect(status().isNoContent())
                .andDo(
                        document(
                                "Delete_Pairing",
                                getDocumentRequest(),
                                getDocumentResponse(),
                                pathParameters(
                                        parameterWithName("pairingId").description("페어링 번호")
                                )
                        )
                );
    }
}
