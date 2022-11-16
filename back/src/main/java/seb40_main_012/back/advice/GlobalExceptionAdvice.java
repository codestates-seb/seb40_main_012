package seb40_main_012.back.advice;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.validation.ConstraintViolationException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionAdvice {

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {

        System.out.printf("# Not Valid Exception" + '\n' +
                "Value: " + HttpStatus.BAD_REQUEST.value() + '\n' +
                "Status: " + HttpStatus.BAD_REQUEST.getReasonPhrase() + "\n\n");

        log.error("",e);

        return ErrorResponse.of(e.getBindingResult(), HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase());

    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleConstraintViolationException(ConstraintViolationException e) {

        System.out.printf("# Constraint Violation Exception" + '\n' +
                "Value: " + HttpStatus.BAD_REQUEST.value() + '\n' +
                "Status: " + HttpStatus.BAD_REQUEST.getReasonPhrase() + "\n\n");

        log.error("", e);

        return ErrorResponse.of(e.getConstraintViolations(), HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase());
    }

    @ExceptionHandler
    public ResponseEntity handleBusinessLogicException(BusinessLogicException e) {

        System.out.printf("\n# Business Logic Exception" + '\n' +
                "Message: " + e.getMessage() + '\n' +
                "Status: " + e.getExceptionCode().getStatus() + "\n\n");

        log.error("", e);

        final ErrorResponse response = ErrorResponse.of(e.getExceptionCode());

        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getExceptionCode().getStatus()));
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    public ErrorResponse handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e) {

        System.out.printf("# Http Request Method Not Supported Exception" + '\n' +
                "Value: " + HttpStatus.METHOD_NOT_ALLOWED.value() + '\n' +
                "Status: " + HttpStatus.METHOD_NOT_ALLOWED.getReasonPhrase() + "\n\n");

        log.error("", e);

        return ErrorResponse.of(HttpStatus.METHOD_NOT_ALLOWED);
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleHttpMessageNotReadableException(HttpMessageNotReadableException e) {

        System.out.printf("# Http Message Not Readable Exception" + '\n' +
                "Value: " + HttpStatus.BAD_REQUEST.value() + '\n' +
                "Status: " + HttpStatus.BAD_REQUEST.getReasonPhrase() + "\n\n");

        log.error("", e);

        return ErrorResponse.of(HttpStatus.BAD_REQUEST,
                "Required Request Body Is Missing");
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleImplementException(NullPointerException e) {

        System.out.printf("# Null Pointer Exception" + '\n' +
                "Value: " + HttpStatus.INTERNAL_SERVER_ERROR.value() + '\n' +
                "Message: " + e.getCause() + '\n'+
                "Status: " + HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase() + "\n\n");

        log.error("", e);

        return ErrorResponse.of(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleMissingServletRequestParameterException(
            MissingServletRequestParameterException e) {

        System.out.printf("# Missing Servlet Request Parameter Exception" + '\n' +
                "Value: " + HttpStatus.BAD_REQUEST.value() + '\n' +
                "Message: " + e.getCause() + '\n'+
                "Status: " + HttpStatus.BAD_REQUEST.getReasonPhrase() + "\n\n");

        log.error("", e);

        return ErrorResponse.of(HttpStatus.BAD_REQUEST, e.getMessage());
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleException(Exception e) {

        System.out.printf("\n# Exception" + '\n' +
                "Value: " + HttpStatus.INTERNAL_SERVER_ERROR.value() + '\n' +
                "Message: " + e.getCause() + '\n'+
                "Status: " + HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase() + "\n\n");

        log.error("", e);

        return ErrorResponse.of(HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
