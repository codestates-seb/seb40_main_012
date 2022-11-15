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
    void postBookTest() throws Exception {
    }

    @Test
    void patchBookTest() throws Exception {
    }

    @Test
    void getBookTest() throws Exception {

        long bookId = 1;

        BookDto.Response response =
                BookDto.Response.builder()
                        .bookId(1)
                        .genre(Genre.NOVEL)
                        .bookWiki(null)
                        .averageRating(3.5)
                        .comments(null)
                        .pairings(null)
                        .bookCollections(null)
                        .similarBooks(null)
                        .build();

        given(bookService.findBook(anyLong())).willReturn(new Book());
        given(bookMapper.bookToBookResponse(Mockito.any(Book.class))).willReturn(response);

        ResultActions actions =
                mockMvc.perform(
                        RestDocumentationRequestBuilders.get("/api/books/{bookId}", bookId)
                                .accept(MediaType.APPLICATION_JSON)
                );

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.bookId").value(response.getBookId()))
                .andExpect(jsonPath("$.data.genre").value(response.getGenre().toString()))
                .andExpect(jsonPath("$.data.bookWiki").value(response.getBookWiki()))
                .andExpect(jsonPath("$.data.averageRating").value(response.getAverageRating()))
                .andExpect(jsonPath("$.data.comments").value(response.getComments()))
                .andExpect(jsonPath("$.data.bookCollections").value(response.getBookCollections()))
                .andDo(document(
                        "Get_Book",
                        getDocumentRequest(),
                        getDocumentResponse(),
                        pathParameters(
                                parameterWithName("bookId").description("책 번호")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("data.").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("data.bookId").type(JsonFieldType.NUMBER).description("책 번호"),
                                        fieldWithPath("data.genre").type(JsonFieldType.STRING).description("장르"),
                                        fieldWithPath("data.bookWiki").type(JsonFieldType.NULL).description("파고들기"),
                                        fieldWithPath("data.averageRating").type(JsonFieldType.NUMBER).description("평균 별점"),
                                        fieldWithPath("data.comments").type(JsonFieldType.NULL).description("댓글"),
                                        fieldWithPath("data.pairings").type(JsonFieldType.NULL).description("페어링"),
                                        fieldWithPath("data.bookCollections").type(JsonFieldType.NULL).description("책이 포함된 컬렉션"),
                                        fieldWithPath("data.similarBooks").type(JsonFieldType.NULL).description("비슷한 책")
                                )
                        )));
    }

    @Test
    void getBooksTest() throws Exception {
    }

    @Test
    void deleteBookTest() throws Exception {
    }
}
