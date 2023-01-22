package com.api.jee.exception;

import lombok.Getter;

import java.util.List;

public class InvalideEntityException extends RuntimeException{
    @Getter
    private ErrorCodes errorCode;
    @Getter
    private List<String> errors;
    public InvalideEntityException(String msgErr){
        super(msgErr);
    }
    public InvalideEntityException(String msgErr, Throwable cause){
        super(msgErr, cause);
    }
    public InvalideEntityException(String msgErr, Throwable cause, ErrorCodes errorCode){
        super(msgErr, cause);
        this.errorCode = errorCode;
    }
    public InvalideEntityException(String msgErr, ErrorCodes errorCode){
        super(msgErr);
        this.errorCode = errorCode;
    }
    public InvalideEntityException(String msgErr, ErrorCodes errorCode, List<String> errors){
        super(msgErr);
        this.errorCode = errorCode;
        this.errors = errors;
    }
}
