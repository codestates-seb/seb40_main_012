package seb40_main_012.back.advice;

import lombok.Getter;

public enum ExceptionCode {


    Comment_NOT_FOUND(404,"Comment Not Found"),
    Comment_EXISTS(409, "Comment Exists"),
    Comment_CANNOT_CHANGE(403,"Comment Can Not Be Changed"),

    ANSWER_DELETED(405, "Answer Already Deleted"),

    USER_NOT_FOUND(404,"User Not Found"),
    EMAIL_EXISTS(409, "Email Exists"),
    NICKNAME_EXISTS(409, "Nickname Exists"),

    USER_NOT_ALLOWED(403, "User Not Allowed"),
    USER_CANNOT_CHANGE(403,"User Can Not Be Changed"),

    RATED(409, "Already Rated"),

    UNAUTHORIZED(401, "Unauthorized");

    @Getter
    private int status;
    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
