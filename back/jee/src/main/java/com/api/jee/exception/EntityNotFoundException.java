package com.api.jee.exception;

import lombok.Getter;

public class EntityNotFoundException extends RuntimeException{
    @Getter
    private ErrorCodes errorCode;
    public EntityNotFoundException(String msgErr){
        super(msgErr);
    }
    public EntityNotFoundException(String msgErr, Throwable cause){
        super(msgErr, cause);
    }
    public EntityNotFoundException(String msgErr, Throwable cause, ErrorCodes errorCode){
        super(msgErr, cause);
        this.errorCode = errorCode;
    }
    public EntityNotFoundException(String msgErr, ErrorCodes errorCode){
        super(msgErr);
        this.errorCode = errorCode;
    }
}
