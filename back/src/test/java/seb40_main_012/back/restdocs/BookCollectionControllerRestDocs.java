package seb40_main_012.back.restdocs;

import com.google.gson.Gson;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.MockBeans;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;
import seb40_main_012.back.bookCollection.dto.BookCollectionDto;
import seb40_main_012.back.bookCollection.entity.BookCollection;
import seb40_main_012.back.bookCollection.service.BookCollectionService;

import java.time.LocalDate;
import java.util.List;

import static org.mockito.ArgumentMatchers.anyCollection;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static seb40_main_012.back.util.ApiDocumentUtils.getDocumentRequest;
import static seb40_main_012.back.util.ApiDocumentUtils.getDocumentResponse;

//@WithUserDetails
@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
public class BookCollectionControllerRestDocs {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private BookCollectionDto.Response responseDto;

    @MockBean
    private BookCollectionService collectionService;

//    @MockBean
//    private BookCollectionDto.Response responseDto;

//    private static MockedStatic<BookCollectionDto> bookCollectionDtoMockedStatic;
//
//    @BeforeAll
//    public static void beforeALl() {
//        bookCollectionDtoMockedStatic = mockStatic(BookCollectionDto.class);
//    }
//
//    @AfterAll
//    public static void afterAll() {
//        bookCollectionDtoMockedStatic.close();
//    }

//    @Test
//    @ValueSource(classes = BookCollection.class)
//      void postBookCollectionTest() throws Exception {
//
////        MockedStatic<BookCollectionDto.Response> bookCollectionDtoMockedStatic = mockStatic(BookCollectionDto.Response.class);
//
//        BookCollectionDto.Post post =
//                BookCollectionDto.Post.builder()
//                        .title("컬렉션 제목")
//                        .content("컬렉션 내용")
//                        .tags(List.of("컬렉션", "태그"))
//                        .bookIsbns(List.of("컬렉션 책", "ISBN13"))
//                        .build();
//
//        String content = gson.toJson(post);
//
//        BookCollectionDto.Response response =
//                BookCollectionDto.Response.builder()
//                        .title("컬렉션 제목")
//                        .content("컬렉션 내용")
//                        .lastModifiedAt(LocalDate.now())
//                        .likeCount(0L)
//                        .userLike(false)
//                        .userBookmark(false)
//                        .collectionAuthor("컬렉션 작성자")
//                        .tags(List.of("컬렉션", "태그"))
//                        .isbns(List.of("컬렉션 책", "ISBN13"))
//                        .build();
//
//
//        given(collectionService.postCollection(Mockito.anyLong(), Mockito.any(BookCollection.class), Mockito.anyList()))
//                .willReturn(new BookCollection());
//
//
//
//        ResultActions actions =
//                mockMvc.perform(
//                        RestDocumentationRequestBuilders.post("/api/collections/new")
//                                .header("Authorization", Mockito.anyLong())
//                                .accept(MediaType.APPLICATION_JSON)
//                                .contentType(MediaType.APPLICATION_JSON)
//                                .content(content)
//                );
//
//        actions
//                .andExpect(status().isCreated())
//                .andExpect(jsonPath("$.data.title").value(post.getTitle()))
//                .andExpect(jsonPath("$.data.content").value(post.getContent()))
//                .andExpect(jsonPath("$.data.tags[]").value(post.getTags()))
//                .andExpect(jsonPath("$.data.bookIsbns[]").value(post.getBookIsbns()))
//                .andDo(document(
//                        "Post_Book_Collection",
//                        getDocumentRequest(),
//                        getDocumentResponse(),
//                        requestFields(
//                                List.of(
//                                        fieldWithPath("title").type(JsonFieldType.STRING).description("컬렉션 제목"),
//                                        fieldWithPath("content").type(JsonFieldType.STRING).description("컬렉션 내용"),
//                                        fieldWithPath("tags[]").type(JsonFieldType.STRING).description("컬렉션 태그"),
//                                        fieldWithPath("bookIsbns[]").type(JsonFieldType.STRING).description("컬렉션 책 ISBN13")
//                                )
//                        ),
//                        responseFields(
//                                List.of(
//                                        fieldWithPath("data.").type(JsonFieldType.OBJECT).description("결과 데이터"),
//                                        fieldWithPath("data.title").type(JsonFieldType.STRING).description("컬렉션 제목"),
//                                        fieldWithPath("data.content").type(JsonFieldType.STRING).description("컬렉션 내용"),
//                                        fieldWithPath("data.createdAt").type(JsonFieldType.STRING).description("작성 날짜"),
//                                        fieldWithPath("data.lastModifiedAt").type(JsonFieldType.STRING).description("마지막 수정날짜"),
//                                        fieldWithPath("data.likeCount").type(JsonFieldType.NUMBER).description("컬렉션 좋아요"),
//                                        fieldWithPath("data.userLike").type(JsonFieldType.BOOLEAN).description("컬렉션 좋아요 여부"),
//                                        fieldWithPath("data.userBookmark").type(JsonFieldType.BOOLEAN).description("북마크 여부"),
//                                        fieldWithPath("data.collectionAuthor").type(JsonFieldType.STRING).description("컬렉션 작성자"),
//                                        fieldWithPath("data.tags[]").type(JsonFieldType.ARRAY).description("컬렉션 태그"),
//                                        fieldWithPath("data.isbns[]").type(JsonFieldType.ARRAY).description("컬렉션 책 ISBN13")
//                                )
//                        )));
//    }

    @Test
    void patchBookCollectionTest() throws Exception {
    }

    @Test
    void getBookCollectionTest() throws Exception {
    }

    @Test
    void getBookCollectionsTest() throws Exception {
    }

    @Test
    void deleteBookCollectionTest() throws Exception {
    }
}
