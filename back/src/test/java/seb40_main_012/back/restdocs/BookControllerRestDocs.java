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
import seb40_main_012.back.book.BookDto;
import seb40_main_012.back.book.BookMapper;
import seb40_main_012.back.book.BookService;
import seb40_main_012.back.book.entity.Book;
import seb40_main_012.back.book.entity.Genre;
import seb40_main_012.back.pairing.entity.Pairing;

import java.util.List;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
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
public class BookControllerRestDocs {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private BookService bookService;

    @MockBean
    private BookMapper bookMapper;

    @Test
    void patchBookTest() throws Exception {
    }

    @Test
    void getBookTest() throws Exception {

        String isbn13 = "1";

        BookDto.Response response =
                BookDto.Response.builder()
                        .isbn13("1234567890123")
                        .cover("커버 이미지")
                        .title("책 제목")
                        .author("저자")
                        .bestPairing(java.util.Optional.empty())
                        .subTitle("부제")
                        .itemPage("페이지")
                        .genre(Genre.POEM)
                        .pubDate("출간일")
                        .publisher("출판사")
                        .adult("성인용 여부")
                        .description("책 설명")
                        .bookWiki(null)
                        .averageRating(3.5)
                        .ratingCount(1)
                        .view(0)
                        .comments(null)
                        .commentCount(0)
                        .pairings(null)
                        .pairingCount(0)
                        .bookCollectionCount(0)
                        .bookCollections(null)
                        .similarBooks(null)
                        .build();

        given(bookService.updateView(anyString())).willReturn(new Book());
        given(bookMapper.bookToBookResponse(Mockito.any(Book.class))).willReturn(response);

        ResultActions actions =
                mockMvc.perform(
                        RestDocumentationRequestBuilders.get("/api/books/{isbn13}", isbn13)
                                .accept(MediaType.APPLICATION_JSON)
                );

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.isbn13").value(response.getIsbn13()))
                .andExpect(jsonPath("$.data.genre").value(response.getGenre().toString()))
                .andExpect(jsonPath("$.data.bookWiki").value(response.getBookWiki()))
                .andExpect(jsonPath("$.data.averageRating").value(response.getAverageRating()))
                .andExpect(jsonPath("$.data.view").value(response.getView()))
                .andExpect(jsonPath("$.data.comments").value(response.getComments()))
                .andExpect(jsonPath("$.data.bookCollections").value(response.getBookCollections()))
                .andDo(document(
                        "Get_Book",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        pathParameters(
                                parameterWithName("isbn13").description("책 isbn13")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data.").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("data.isbn13").type(JsonFieldType.STRING).description("책 ISBN13"),
                                        fieldWithPath("data.cover").type(JsonFieldType.STRING).description("커버 이미지"),
                                        fieldWithPath("data.title").type(JsonFieldType.STRING).description("책 제목"),
                                        fieldWithPath("data.author").type(JsonFieldType.STRING).description("저자"),
                                        fieldWithPath("data.bestPairing").type(JsonFieldType.NULL).description("베스트 페어링"),
                                        fieldWithPath("data.subTitle").type(JsonFieldType.STRING).description("부제"),
                                        fieldWithPath("data.itemPage").type(JsonFieldType.STRING).description("페이지"),
                                        fieldWithPath("data.genre").type(JsonFieldType.STRING).description("장르"),
                                        fieldWithPath("data.pubDate").type(JsonFieldType.STRING).description("출간일"),
                                        fieldWithPath("data.publisher").type(JsonFieldType.STRING).description("출판사"),
                                        fieldWithPath("data.adult").type(JsonFieldType.STRING).description("성인용 여부"),
                                        fieldWithPath("data.description").type(JsonFieldType.STRING).description("책 설명"),
                                        fieldWithPath("data.bookWiki").type(JsonFieldType.NULL).description("파고들기"),
                                        fieldWithPath("data.averageRating").type(JsonFieldType.NUMBER).description("평균 별점"),
                                        fieldWithPath("data.ratingCount").type(JsonFieldType.NUMBER).description("별점 개수"),
                                        fieldWithPath("data.view").type(JsonFieldType.NUMBER).description("조회수"),
                                        fieldWithPath("data.comments").type(JsonFieldType.NULL).description("댓글"),
                                        fieldWithPath("data.commentCount").type(JsonFieldType.NUMBER).description("댓글 개수"),
                                        fieldWithPath("data.pairings").type(JsonFieldType.NULL).description("페어링"),
                                        fieldWithPath("data.pairingCount").type(JsonFieldType.NUMBER).description("페어링 개수"),
                                        fieldWithPath("data.bookCollections").type(JsonFieldType.NULL).description("책이 포함된 컬렉션"),
                                        fieldWithPath("data.bookCollectionCount").type(JsonFieldType.NUMBER).description("책이 포함된 컬렉션 개수"),
                                        fieldWithPath("data.similarBooks").type(JsonFieldType.NULL).description("비슷한 책")
                                )
                        )));
    }

    @Test
    void deleteBookTest() throws Exception {
    }
}
