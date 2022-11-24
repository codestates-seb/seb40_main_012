package seb40_main_012.back.restdocs;

import com.google.gson.Gson;
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
import seb40_main_012.back.bookWiki.BookWiki;
import seb40_main_012.back.bookWiki.BookWikiDto;
import seb40_main_012.back.bookWiki.BookWikiMapper;
import seb40_main_012.back.bookWiki.BookWikiService;

import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
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
public class BookWikiControllerRestDocs {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private BookWikiService bookWikiService;

    @MockBean
    private BookWikiMapper bookWikiMapper;

    @Test
    void postBookWikiTest() throws Exception {

        String isbn13 = "1";

        BookWikiDto.Post post =
                BookWikiDto.Post.builder()
                        .spacetimeBackground("시공간 배경")
                        .imagePath("이미지 주소")
                        .characterTree("등장인물 관계도")
                        .objectInside("등장 음식/음악/장소 등")
                        .trivia("여담")
                        .appendix("각주")
                        .objectOutside("외부 자료")
                        .build();

        String content = gson.toJson(post);

        BookWikiDto.Response response =
                BookWikiDto.Response.builder()
                        .bookWikiId(1)
                        .view(0)
                        .spacetimeBackground("시공간 배경")
                        .imagePath("이미지 주소")
                        .characterTree("등장인물 관계도")
                        .objectInside("등장 음식/음악/장소 등")
                        .trivia("여담")
                        .appendix("각주")
                        .objectOutside("외부 자료")
                        .createdAt(LocalDateTime.now())
                        .modifiedAt(LocalDateTime.now())
                        .build();

        given(bookWikiMapper.bookWikiPostToBookWiki(Mockito.any(BookWikiDto.Post.class))).willReturn(new BookWiki());
        given(bookWikiService.createBookWiki(Mockito.anyString(), Mockito.any(BookWiki.class))).willReturn(new BookWiki());
        given(bookWikiMapper.bookWikiToBookWikiResponse(Mockito.any(BookWiki.class))).willReturn(response);

        ResultActions actions =
                mockMvc.perform(
                        RestDocumentationRequestBuilders.post("/api/books/{isbn13}/wikis/add", isbn13)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        actions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.spacetimeBackground").value(post.getSpacetimeBackground()))
                .andExpect(jsonPath("$.data.imagePath").value(post.getImagePath()))
                .andExpect(jsonPath("$.data.characterTree").value(post.getCharacterTree()))
                .andExpect(jsonPath("$.data.objectInside").value(post.getObjectInside()))
                .andExpect(jsonPath("$.data.trivia").value(post.getTrivia()))
                .andExpect(jsonPath("$.data.appendix").value(post.getAppendix()))
                .andExpect(jsonPath("$.data.objectOutside").value(post.getObjectOutside()))
                .andDo(document(
                        "Post_Book_Wiki",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        pathParameters(
                                parameterWithName("isbn13").description("책 ISBN13")
                        ),
                        requestFields(
                                List.of(
                                        fieldWithPath("spacetimeBackground").type(JsonFieldType.STRING).description("시공간 배경"),
                                        fieldWithPath("imagePath").type(JsonFieldType.STRING).description("이미지 주소"),
                                        fieldWithPath("characterTree").type(JsonFieldType.STRING).description("등장인물 관계도"),
                                        fieldWithPath("objectInside").type(JsonFieldType.STRING).description("등장 음식/음악/장소 등"),
                                        fieldWithPath("trivia").type(JsonFieldType.STRING).description("여담"),
                                        fieldWithPath("appendix").type(JsonFieldType.STRING).description("각주"),
                                        fieldWithPath("objectOutside").type(JsonFieldType.STRING).description("외부 자료")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data.").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("data.view").type(JsonFieldType.NUMBER).description("조회수"),
                                        fieldWithPath("data.bookWikiId").type(JsonFieldType.NUMBER).description("파고들기 번호"),
                                        fieldWithPath("data.spacetimeBackground").type(JsonFieldType.STRING).description("시공간 배경"),
                                        fieldWithPath("data.imagePath").type(JsonFieldType.STRING).description("이미지 주소"),
                                        fieldWithPath("data.characterTree").type(JsonFieldType.STRING).description("인물 관계도"),
                                        fieldWithPath("data.objectInside").type(JsonFieldType.STRING).description("등장 음식/음악/장소 등"),
                                        fieldWithPath("data.trivia").type(JsonFieldType.STRING).description("여담"),
                                        fieldWithPath("data.appendix").type(JsonFieldType.STRING).description("각주"),
                                        fieldWithPath("data.objectOutside").type(JsonFieldType.STRING).description("외부 자료"),
                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("작성 날짜"),
                                        fieldWithPath("data.modifiedAt").type(JsonFieldType.STRING).description("마지막 수정 날짜")
                                )
                        )));
    }

    @Test
    void patchBookWikiTest() throws Exception {

        long bookWikiId = 1;

        BookWikiDto.Patch patch =
                BookWikiDto.Patch.builder()
                        .spacetimeBackground("시공간 배경")
                        .imagePath("이미지 주소")
                        .characterTree("등장인물 관계도")
                        .objectInside("등장 음식/음악/장소 등")
                        .trivia("여담")
                        .appendix("각주")
                        .objectOutside("외부 자료")
                        .build();

        String content = gson.toJson(patch);

        BookWikiDto.Response response =
                BookWikiDto.Response.builder()
                        .bookWikiId(1)
                        .view(0)
                        .spacetimeBackground("시공간 배경")
                        .imagePath("이미지 주소")
                        .characterTree("등장인물 관계도")
                        .objectInside("등장 음식/음악/장소 등")
                        .trivia("여담")
                        .appendix("각주")
                        .objectOutside("외부 자료")
                        .createdAt(LocalDateTime.now())
                        .modifiedAt(LocalDateTime.now())
                        .build();

        given(bookWikiMapper.bookWikiPatchToBookWiki(Mockito.any(BookWikiDto.Patch.class))).willReturn(new BookWiki());
        given(bookWikiService.updateBookWiki(Mockito.any(BookWiki.class), anyLong())).willReturn(new BookWiki());
        given(bookWikiMapper.bookWikiToBookWikiResponse(Mockito.any(BookWiki.class))).willReturn(response);

        ResultActions actions =
                mockMvc.perform(
                        RestDocumentationRequestBuilders.patch("/api/books/wikis/{bookWikiId}/edit", bookWikiId)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.spacetimeBackground").value(patch.getSpacetimeBackground()))
                .andExpect(jsonPath("$.data.imagePath").value(patch.getImagePath()))
                .andExpect(jsonPath("$.data.characterTree").value(patch.getCharacterTree()))
                .andExpect(jsonPath("$.data.objectInside").value(patch.getObjectInside()))
                .andExpect(jsonPath("$.data.trivia").value(patch.getTrivia()))
                .andExpect(jsonPath("$.data.appendix").value(patch.getAppendix()))
                .andExpect(jsonPath("$.data.objectOutside").value(patch.getObjectOutside()))
                .andDo(document(
                        "Patch_Book_Wiki",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        pathParameters(
                                parameterWithName("bookWikiId").description("파고들기 번호")
                        ),
                        requestFields(
                                List.of(
                                        fieldWithPath("spacetimeBackground").type(JsonFieldType.STRING).description("시공간 배경"),
                                        fieldWithPath("imagePath").type(JsonFieldType.STRING).description("이미지 주소"),
                                        fieldWithPath("characterTree").type(JsonFieldType.STRING).description("인물 관계도"),
                                        fieldWithPath("objectInside").type(JsonFieldType.STRING).description("등장 음식/음악/장소 등"),
                                        fieldWithPath("trivia").type(JsonFieldType.STRING).description("여담"),
                                        fieldWithPath("appendix").type(JsonFieldType.STRING).description("각주"),
                                        fieldWithPath("objectOutside").type(JsonFieldType.STRING).description("외부 자료")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data.").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("data.view").type(JsonFieldType.NUMBER).description("조회수"),
                                        fieldWithPath("data.bookWikiId").type(JsonFieldType.NUMBER).description("파고들기 번호"),
                                        fieldWithPath("data.spacetimeBackground").type(JsonFieldType.STRING).description("시공간 배경"),
                                        fieldWithPath("data.imagePath").type(JsonFieldType.STRING).description("이미지 주소"),
                                        fieldWithPath("data.characterTree").type(JsonFieldType.STRING).description("인물 관계도"),
                                        fieldWithPath("data.objectInside").type(JsonFieldType.STRING).description("등장 음식/음악/장소 등"),
                                        fieldWithPath("data.trivia").type(JsonFieldType.STRING).description("여담"),
                                        fieldWithPath("data.appendix").type(JsonFieldType.STRING).description("각주"),
                                        fieldWithPath("data.objectOutside").type(JsonFieldType.STRING).description("외부 자료"),
                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("작성 날짜"),
                                        fieldWithPath("data.modifiedAt").type(JsonFieldType.STRING).description("마지막 수정 날짜")
                                )
                        )));
    }

    @Test
    void getBookWikiTest() throws Exception {

        long bookWikiId = 1;

        BookWikiDto.Response response =
                BookWikiDto.Response.builder()
                        .bookWikiId(1)
                        .view(0)
                        .spacetimeBackground("시공간 배경")
                        .imagePath("이미지 주소")
                        .characterTree("등장인물 관계도")
                        .objectInside("등장 음식/음악/장소 등")
                        .trivia("여담")
                        .appendix("각주")
                        .objectOutside("외부 자료")
                        .createdAt(LocalDateTime.now())
                        .modifiedAt(LocalDateTime.now())
                        .build();

        given(bookWikiService.findBookWiki(anyLong())).willReturn(new BookWiki());
        given(bookWikiMapper.bookWikiToBookWikiResponse(Mockito.any(BookWiki.class))).willReturn(response);

        ResultActions actions =
                mockMvc.perform(
                        RestDocumentationRequestBuilders.get("/api/books/wikis/{bookWikiId}", bookWikiId)
                                .accept(MediaType.APPLICATION_JSON)
                );

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.bookWikiId").value(response.getBookWikiId()))
                .andExpect(jsonPath("$.data.spacetimeBackground").value(response.getSpacetimeBackground()))
                .andExpect(jsonPath("$.data.imagePath").value(response.getImagePath()))
                .andExpect(jsonPath("$.data.characterTree").value(response.getCharacterTree()))
                .andExpect(jsonPath("$.data.objectInside").value(response.getObjectInside()))
                .andExpect(jsonPath("$.data.trivia").value(response.getTrivia()))
                .andExpect(jsonPath("$.data.appendix").value(response.getAppendix()))
                .andExpect(jsonPath("$.data.objectOutside").value(response.getObjectOutside()))
                .andDo(document(
                        "Get_Book_Wiki",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        pathParameters(
                                parameterWithName("bookWikiId").description("파고들기 번호")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data.").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("data.view").type(JsonFieldType.NUMBER).description("조회수"),
                                        fieldWithPath("data.bookWikiId").type(JsonFieldType.NUMBER).description("파고들기 번호"),
                                        fieldWithPath("data.spacetimeBackground").type(JsonFieldType.STRING).description("시공간 배경"),
                                        fieldWithPath("data.imagePath").type(JsonFieldType.STRING).description("이미지 주소"),
                                        fieldWithPath("data.characterTree").type(JsonFieldType.STRING).description("인물 관계도"),
                                        fieldWithPath("data.objectInside").type(JsonFieldType.STRING).description("등장 음식/음악/장소 등"),
                                        fieldWithPath("data.trivia").type(JsonFieldType.STRING).description("여담"),
                                        fieldWithPath("data.appendix").type(JsonFieldType.STRING).description("각주"),
                                        fieldWithPath("data.objectOutside").type(JsonFieldType.STRING).description("외부 자료"),
                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("작성 날짜"),
                                        fieldWithPath("data.modifiedAt").type(JsonFieldType.STRING).description("마지막 수정 날짜")
                                )
                        )));


    }

    @Test
    void getBookWikisTest() throws Exception {
    }

    @Test
    void deleteBookWikiTest() throws Exception {
    }
}
