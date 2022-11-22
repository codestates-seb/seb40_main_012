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
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;
import seb40_main_012.back.common.comment.CommentDto;
import seb40_main_012.back.common.comment.CommentMapper;
import seb40_main_012.back.common.comment.CommentService;
import seb40_main_012.back.common.comment.entity.Comment;
import seb40_main_012.back.common.comment.entity.CommentType;
import seb40_main_012.back.user.dto.UserDto;
import seb40_main_012.back.user.entity.User;
import seb40_main_012.back.user.mapper.UserMapper;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
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
public class CommentControllerRestDocs {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private UserMapper userMapper;

    @MockBean
    private CommentService commentService;

    @MockBean
    private CommentMapper commentMapper;

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
    void postBookCommentTest() throws Exception {

        long bookId = 1;

        CommentDto.Post post =
                CommentDto.Post.builder()
                        .body("책에 대한 코멘트 내용")
                        .build();

        String content = gson.toJson(post);

        CommentDto.Response response =
                CommentDto.Response.builder()
                        .commentId(1)
                        .userInformation(userMapper.userToUserResponse(new User()))
                        .commentType(CommentType.BOOK)
                        .body("책에 대한 코멘트 내용")
                        .likeCount(0)
                        .createdAt(LocalDateTime.now())
                        .modifiedAt(LocalDateTime.now())
                        .build();

        given(commentMapper.commentPostToComment(Mockito.any(CommentDto.Post.class))).willReturn(new Comment());
        given(commentService.createBookComment(Mockito.any(Comment.class), anyString())).willReturn(new Comment());
        given(commentMapper.commentToCommentResponse(Mockito.any(Comment.class))).willReturn(response);



        ResultActions actions =
                mockMvc.perform(
                        RestDocumentationRequestBuilders.post("/api/books/{bookId}/comments/add", bookId)
                                .header("Authorization", 200)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        actions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.body").value(post.getBody()))
                .andDo(document(
                        "Post_Book_Comment",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        pathParameters(
                                parameterWithName("bookId").description("책 번호")
                        ),
                        requestFields(
                                List.of(
                                        fieldWithPath("body").type(JsonFieldType.STRING).description("코멘트 내용")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data.").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("data.commentId").type(JsonFieldType.NUMBER).description("코멘트 번호"),
                                        fieldWithPath("data.userInformation.email").type(JsonFieldType.STRING).description("작성자 이메일"),
                                        fieldWithPath("data.userInformation.nickName").type(JsonFieldType.STRING).description("작성자 닉네임"),
                                        fieldWithPath("data.userInformation.roles[]").type(JsonFieldType.ARRAY).description("작성자 역할"),
                                        fieldWithPath("data.commentType").type(JsonFieldType.STRING).description("코멘트 타입"),
                                        fieldWithPath("data.body").type(JsonFieldType.STRING).description("책에 대한 코멘트 내용"),
                                        fieldWithPath("data.likeCount").type(JsonFieldType.NUMBER).description("코멘트 좋아요"),
                                        fieldWithPath("data.view").type(JsonFieldType.NUMBER).description("코멘트 조회수"),
                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("작성 날짜"),
                                        fieldWithPath("data.modifiedAt").type(JsonFieldType.STRING).description("마지막 수정 날짜")
                                )
                        )));

    }

    @Test
    void postPairingCommentTest() throws Exception {

        long pairingId = 1;

        CommentDto.Post post =
                CommentDto.Post.builder()
                        .body("페어링에 대한 코멘트 내용")
                        .build();

        String content = gson.toJson(post);

        CommentDto.Response response =
                CommentDto.Response.builder()
                        .commentId(1)
                        .userInformation(userMapper.userToUserResponse(new User()))
                        .commentType(CommentType.PAIRING)
                        .body("페어링에 대한 코멘트 내용")
                        .likeCount(0)
                        .createdAt(LocalDateTime.now())
                        .modifiedAt(LocalDateTime.now())
                        .build();

        given(commentMapper.commentPostToComment(Mockito.any(CommentDto.Post.class))).willReturn(new Comment());
        given(commentService.createPairingComment(Mockito.any(Comment.class), anyLong())).willReturn(new Comment());
        given(commentMapper.commentToCommentResponse(Mockito.any(Comment.class))).willReturn(response);

        ResultActions actions =
                mockMvc.perform(
                        RestDocumentationRequestBuilders.post("/api/pairings/{pairingId}/comments/add", pairingId)
                                .header("Authorization", 200)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        actions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.body").value(post.getBody()))
                .andDo(document(
                        "Post_Pairing_Comment",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        pathParameters(
                                parameterWithName("pairingId").description("페어링 번호")
                        ),
                        requestFields(
                                List.of(
                                        fieldWithPath("body").type(JsonFieldType.STRING).description("코멘트 내용")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data.").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("data.commentId").type(JsonFieldType.NUMBER).description("코멘트 번호"),
                                        fieldWithPath("data.userInformation.email").type(JsonFieldType.STRING).description("작성자 이메일"),
                                        fieldWithPath("data.userInformation.nickName").type(JsonFieldType.STRING).description("작성자 닉네임"),
                                        fieldWithPath("data.userInformation.roles[]").type(JsonFieldType.ARRAY).description("작성자 역할"),
                                        fieldWithPath("data.commentType").type(JsonFieldType.STRING).description("코멘트 타입"),
                                        fieldWithPath("data.body").type(JsonFieldType.STRING).description("페어링에 대한 코멘트 내용"),
                                        fieldWithPath("data.likeCount").type(JsonFieldType.NUMBER).description("코멘트 좋아요"),
                                        fieldWithPath("data.view").type(JsonFieldType.NUMBER).description("코멘트 조회수"),
                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("작성 날짜"),
                                        fieldWithPath("data.modifiedAt").type(JsonFieldType.STRING).description("마지막 수정 날짜")
                                )
                        )));

    }

    @Test
    void postBookCollectionCommentTest() throws Exception {
    }

    @Test
    void patchCommentTest() throws Exception {

        long commentId = 1;

        CommentDto.Patch patch =
                CommentDto.Patch.builder()
                        .commentId(1)
                        .body("수정된 코멘트 내용")
                        .build();

        String content = gson.toJson(patch);

        CommentDto.Response response =
                CommentDto.Response.builder()
                        .commentId(1)
                        .userInformation(userMapper.userToUserResponse(new User()))
                        .commentType(CommentType.BOOK)
                        .body("수정된 코멘트 내용")
                        .likeCount(0)
                        .createdAt(LocalDateTime.now())
                        .modifiedAt(LocalDateTime.now())
                        .build();

        given(commentMapper.commentPatchToComment(Mockito.any(CommentDto.Patch.class))).willReturn(new Comment());
        given(commentService.updateComment((Mockito.any(Comment.class)), anyLong())).willReturn(new Comment());
        given(commentMapper.commentToCommentResponse(Mockito.any(Comment.class))).willReturn(response);

        ResultActions actions =
                mockMvc.perform(
                        RestDocumentationRequestBuilders.patch("/api/comments/{commentId}/edit", commentId)
                                .header("Authorization", 200)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.body").value(patch.getBody()))
                .andDo(document(
                        "Patch_Comment",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        pathParameters(
                                parameterWithName("commentId").description("코멘트 번호")
                        ),
                        requestFields(
                                List.of(
                                        fieldWithPath("commentId").type(JsonFieldType.NUMBER).description("코멘트 번호"),
                                        fieldWithPath("body").type(JsonFieldType.STRING).description("수정된 코멘트 내용")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data.").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("data.commentId").type(JsonFieldType.NUMBER).description("수정된 코멘트 번호"),
                                        fieldWithPath("data.userInformation.email").type(JsonFieldType.STRING).description("작성자 이메일"),
                                        fieldWithPath("data.userInformation.nickName").type(JsonFieldType.STRING).description("작성자 닉네임"),
                                        fieldWithPath("data.userInformation.roles[]").type(JsonFieldType.ARRAY).description("작성자 역할"),
                                        fieldWithPath("data.commentType").type(JsonFieldType.STRING).description("코멘트 타입"),
                                        fieldWithPath("data.body").type(JsonFieldType.STRING).description("수정된 코멘트 내용"),
                                        fieldWithPath("data.likeCount").type(JsonFieldType.NUMBER).description("코멘트 좋아요"),
                                        fieldWithPath("data.view").type(JsonFieldType.NUMBER).description("코멘트 조회수"),
                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("작성 날짜"),
                                        fieldWithPath("data.modifiedAt").type(JsonFieldType.STRING).description("마지막 수정 날짜")
                                )
                        )));
    }

    @Test
    void getCommentTest() throws Exception {

        long commentId = 1;

        CommentDto.Response response =
                CommentDto.Response.builder()
                        .commentId(1)
                        .userInformation(userMapper.userToUserResponse(new User()))
                        .commentType(CommentType.PAIRING)
                        .body("코멘트 내용")
                        .likeCount(0)
                        .createdAt(LocalDateTime.now())
                        .modifiedAt(LocalDateTime.now())
                        .build();

        given(commentService.updateView(anyLong())).willReturn(new Comment());
        given(commentMapper.commentToCommentResponse(Mockito.any(Comment.class))).willReturn(response);

        ResultActions actions =
                mockMvc.perform(
                        RestDocumentationRequestBuilders.get("/api/comments/{commentId}", commentId)
                                .accept(MediaType.APPLICATION_JSON)
                );

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.commentId").value(response.getCommentId()))
                .andExpect(jsonPath("$.data.userInformation.email").value(response.getUserInformation().getEmail()))
                .andExpect(jsonPath("$.data.userInformation.nickName").value(response.getUserInformation().getNickName()))
                .andExpect(jsonPath("$.data.userInformation.roles.[0]").value(response.getUserInformation().getRoles().get(0)))
                .andExpect(jsonPath("$.data.commentType").value(response.getCommentType().toString()))
                .andExpect(jsonPath("$.data.body").value(response.getBody()))
                .andExpect(jsonPath("$.data.likeCount").value(response.getLikeCount()))
                .andDo(document(
                        "Get_Comment",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        pathParameters(
                                parameterWithName("commentId").description("코멘트 번호")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data.").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("data.commentId").type(JsonFieldType.NUMBER).description("코멘트 번호"),
                                        fieldWithPath("data.userInformation.email").type(JsonFieldType.STRING).description("작성자 이메일"),
                                        fieldWithPath("data.userInformation.nickName").type(JsonFieldType.STRING).description("작성자 닉네임"),
                                        fieldWithPath("data.userInformation.roles[]").type(JsonFieldType.ARRAY).description("작성자 역할"),
                                        fieldWithPath("data.commentType").type(JsonFieldType.STRING).description("코멘트 타입"),
                                        fieldWithPath("data.body").type(JsonFieldType.STRING).description("코멘트 내용"),
                                        fieldWithPath("data.likeCount").type(JsonFieldType.NUMBER).description("코멘트 좋아요"),
                                        fieldWithPath("data.view").type(JsonFieldType.NUMBER).description("코멘트 조회수"),
                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("작성 날짜"),
                                        fieldWithPath("data.modifiedAt").type(JsonFieldType.STRING).description("마지막 수정 날짜")
                                )
                        )));
    }

    @Test
    void getCommentsTest() throws Exception {

        SliceImpl<CommentDto.Response> responses =
                new SliceImpl<>(
                        List.of(
                                CommentDto.Response.builder()
                                        .commentId(1)
                                        .userInformation(
                                                UserDto.ResponseDto.builder()
                                                        .email("running_potato_1@email.com")
                                                        .nickName("Running_Potato_1")
                                                        .roles(List.of("USER"))
                                                        .build()
                                        )
                                        .commentType(CommentType.BOOK)
                                        .body("첫번째 코멘트 내용")
                                        .likeCount(0)
                                        .createdAt(LocalDateTime.now())
                                        .modifiedAt(LocalDateTime.now())
                                        .build(),

                                CommentDto.Response.builder()
                                        .commentId(1)
                                        .userInformation(
                                                UserDto.ResponseDto.builder()
                                                        .email("running_potato_2@email.com")
                                                        .nickName("Running_Potato_2")
                                                        .roles(List.of("USER"))
                                                        .build()
                                        )
                                        .commentType(CommentType.BOOK)
                                        .body("두번째 코멘트 내용")
                                        .likeCount(0)
                                        .createdAt(LocalDateTime.now())
                                        .modifiedAt(LocalDateTime.now())
                                        .build()
                        )
                );

        List<Comment> listComments = new ArrayList<>();

        given(commentService.findComments()).willReturn(listComments);
        given(commentMapper.commentsToCommentResponses(Mockito.anyList())).willReturn(responses);

        ResultActions actions =
                mockMvc.perform(
                        RestDocumentationRequestBuilders.get("/api/comments")
                                .accept(MediaType.APPLICATION_JSON)
                );

        actions.andExpect(status().isOk())
                .andDo(document("Get_Comments",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        responseFields(
                                List.of(
                                        fieldWithPath("data.").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("data.content[].commentId").type(JsonFieldType.NUMBER).description("코멘트 번호"),
                                        fieldWithPath("data.content[].userInformation.email").type(JsonFieldType.STRING).description("작성자 이메일"),
                                        fieldWithPath("data.content[].userInformation.nickName").type(JsonFieldType.STRING).description("작성자 닉네임"),
                                        fieldWithPath("data.content[].userInformation.roles[]").type(JsonFieldType.ARRAY).description("작성자 역할"),
                                        fieldWithPath("data.content[].commentType").type(JsonFieldType.STRING).description("코멘트 타입"),
                                        fieldWithPath("data.content[].body").type(JsonFieldType.STRING).description("코멘트 내용"),
                                        fieldWithPath("data.content[].likeCount").type(JsonFieldType.NUMBER).description("코멘트 좋아요"),
                                        fieldWithPath("data.content[].view").type(JsonFieldType.NUMBER).description("코멘트 조회수"),
                                        fieldWithPath("data.content[].createdAt").type(JsonFieldType.STRING).description("작성 날짜"),
                                        fieldWithPath("data.content[].modifiedAt").type(JsonFieldType.STRING).description("마지막 수정 날짜"),
                                        fieldWithPath("data.pageable").type(JsonFieldType.STRING).description("Pageble 설정"),
                                        fieldWithPath("data.size").type(JsonFieldType.NUMBER).description("페이지 크기"),
                                        fieldWithPath("data.number").type(JsonFieldType.NUMBER).description("페이지 번호"),
                                        fieldWithPath("data.sort.empty").type(JsonFieldType.BOOLEAN).description("Pageble Empty"),
                                        fieldWithPath("data.sort.unsorted").type(JsonFieldType.BOOLEAN).description("Pageble Unsorted"),
                                        fieldWithPath("data.sort.sorted").type(JsonFieldType.BOOLEAN).description("Pageble Sorted"),
                                        fieldWithPath("data.first").type(JsonFieldType.BOOLEAN).description("Pageble First"),
                                        fieldWithPath("data.last").type(JsonFieldType.BOOLEAN).description("Pageble Last"),
                                        fieldWithPath("data.numberOfElements").type(JsonFieldType.NUMBER).description("페이지 요소 개수"),
                                        fieldWithPath("data.empty").type(JsonFieldType.BOOLEAN).description("페이지 Empty 여부")
                                )
                        )));
    }

    @Test
    void deleteCommentTest() throws Exception {

        long commentId = 1;

        doNothing().when(commentService).deleteComment(Mockito.anyLong());

        mockMvc.perform(
                        RestDocumentationRequestBuilders.delete("/api/comments/{commentId}/delete", commentId)
                                .header("Authorization", 200))
                .andExpect(status().isNoContent())
                .andDo(
                        document(
                                "Delete_Comment",
                                getDocumentRequest(),
                                getDocumentResponse(),
                                pathParameters(
                                        parameterWithName("commentId").description("코멘트 번호")
                                )
                        ));
    }
}
