package com.api.jee.exception;

import lombok.Getter;

import java.util.List;

public class InvalidOperationException extends Throwable {
    @Getter
    private ErrorCodes errorCode;
    @Getter
    private List<String> errors;
    public InvalidOperationException(String msgErr){
        super(msgErr);
    }
    public InvalidOperationException(String msgErr, Throwable cause){
        super(msgErr, cause);
    }
    public InvalidOperationException(String msgErr, Throwable cause, ErrorCodes errorCode){
        super(msgErr, cause);
        this.errorCode = errorCode;
    }
    public InvalidOperationException(String msgErr, ErrorCodes errorCode){
        super(msgErr);
        this.errorCode = errorCode;
    }
    public InvalidOperationException(String msgErr, ErrorCodes errorCode, List<String> errors){
        super(msgErr);
        this.errorCode = errorCode;
        this.errors = errors;
    }
}
