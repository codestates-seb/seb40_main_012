package seb40_main_012.back.restdocs;

import com.google.gson.Gson;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs
public class BookCollectionControllerRestDocs {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @Test
    void postBookCollectionTest() throws Exception {
    }

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
