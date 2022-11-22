//package seb40_main_012.back.restdocs;
//
//import com.google.gson.Gson;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.transaction.annotation.Transactional;
//import seb40_main_012.back.bookCollection.dto.BookCollectionDto;
//import seb40_main_012.back.bookCollection.entity.BookCollection;
//import seb40_main_012.back.bookCollection.service.BookCollectionService;
//import seb40_main_012.back.pairing.PairingDto;
//import seb40_main_012.back.pairing.entity.Pairing;
//import seb40_main_012.back.pairing.entity.ParingCategory;
//import seb40_main_012.back.user.dto.UserDto;
//import seb40_main_012.back.user.entity.User;
//import seb40_main_012.back.user.mapper.UserMapper;
//
//import java.time.LocalDate;
//import java.time.LocalDateTime;
//import java.util.List;
//
//import static org.mockito.ArgumentMatchers.anyList;
//import static org.mockito.ArgumentMatchers.anyString;
//import static org.mockito.BDDMockito.given;
//
//@Transactional
//@SpringBootTest
//@AutoConfigureMockMvc
//@AutoConfigureRestDocs
//public class BookCollectionControllerRestDocs {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Autowired
//    private Gson gson;
//
//    @Autowired
//    private UserMapper userMapper;
//
//    @Autowired
//    private BookCollectionService collectionService;
//
//    @BeforeEach
//    private void init() {
//
//        UserDto.ResponseDto userResponse =
//                UserDto.ResponseDto.builder()
//                        .email("running_potato@email.com")
//                        .nickName("Running_Potato")
//                        .roles(List.of("USER"))
//                        .build();
//
//        given(userMapper.userToUserResponse(Mockito.any())).willReturn(userResponse);
//    }
//
//    @Test
//    void postBookCollectionTest() throws Exception {
//
//        BookCollectionDto.Post post =
//                BookCollectionDto.Post.builder()
//                        .title("페어링 제목")
//                        .content("페어링 내용")
//                        .tags(List.of("페어링", "태그"))
//                        .bookIsbns(List.of("페어링 책", "ISBN"))
//                        .build();
//
//        String content = gson.toJson(post);
//
//        BookCollectionDto.Response response =
//                BookCollectionDto.Response.builder()
//                        .title("페어링 제목")
//                        .content("페어링 내용")
//                        .lastModifiedAt(LocalDate.now())
//                        .likeCount(0L)
//                        .userLike(false)
//                        .userBookmark(false)
//                        .collectionAuthor(userMapper.userToUserResponse(new User()).getNickName())
//                        .tags(List.of("페어링", "태그"))
//                        .isbns(List.of("페어링 책", "ISBN"))
//                        .build();
//
//        given(collectionService.postCollection(Mockito.anyLong(), Mockito.any(BookCollection.class), Mockito.anyList()))
//                .willReturn(new BookCollection());
//        given(BookCollectionDto.Response.of(Mockito.any(BookCollection.class))).willReturn(response);
//
//    }
//
//    @Test
//    void patchBookCollectionTest() throws Exception {
//    }
//
//    @Test
//    void getBookCollectionTest() throws Exception {
//    }
//
//    @Test
//    void getBookCollectionsTest() throws Exception {
//    }
//
//    @Test
//    void deleteBookCollectionTest() throws Exception {
//    }
//}
