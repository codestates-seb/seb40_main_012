package seb40_main_012.back.util;

import org.springframework.restdocs.operation.preprocess.OperationRequestPreprocessor;
import org.springframework.restdocs.operation.preprocess.OperationResponsePreprocessor;

import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;

public interface ApiDocumentUtils {
    static OperationRequestPreprocessor getDocumentRequest() {
        return preprocessRequest(prettyPrint());
    }

    static OperationResponsePreprocessor getDocumentResponse() {
        return preprocessResponse(prettyPrint());
    }
}
