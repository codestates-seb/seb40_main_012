package seb40_main_012.back.advice;

import lombok.Getter;

public enum ExceptionCode {

    BOOK_NOT_FOUND(404,"Book Not Found"),

    BOOK_WIKI_NOT_FOUND(404,"Book Wiki Not Found"),

    IMAGE_NOT_FOUND(404,"Image Not Found"),

    PAIRING_NOT_FOUND(404,"Pairing Not Found"),

    COMMENT_NOT_FOUND(404,"Comment Not Found"),
    COMMENT_EXISTS(409, "Comment Exists"),
    COMMENT_CANNOT_CHANGE(403,"Comment Can Not Be Changed"),

    ANSWER_DELETED(405, "Answer Already Deleted"),

    USER_NOT_FOUND(404,"User Not Found"),
    EMAIL_EXISTS(409, "Email Exists"),
    NICKNAME_EXISTS(409, "Nickname Exists"),
    PASSWORD_CANNOT_CHANGE(403, "Cannot Use The Same Password"),


    USER_NOT_ALLOWED(403, "User Not Allowed"),
    USER_CANNOT_CHANGE(403,"User Can Not Be Changed"),

    RATED(409, "Already Rated"),
    LIKED(409, "Already Liked"),

    UNAUTHORIZED(401, "Unauthorized"), // 인증이 필요한 상태
    FORBIDDEN(403, "Forbidden"); // 인증은 되었으나 권한이 없는 상태

    @Getter
    private int status;
    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
