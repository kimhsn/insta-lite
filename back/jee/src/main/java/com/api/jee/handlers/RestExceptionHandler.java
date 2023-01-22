package com.api.jee.handlers;

import com.api.jee.exception.EntityNotFoundException;
import com.api.jee.exception.ErrorCodes;
import com.api.jee.exception.InvalideEntityException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Collections;

@RestControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorDto> HandlerException(EntityNotFoundException exception){
        final HttpStatus notFound = HttpStatus.NOT_FOUND;
        final ErrorDto errorDto = ErrorDto.builder()
                .errorCodes(exception.getErrorCode())
                .httpCode(notFound.value())
                .msgErr(exception.getMessage())
                .build();
        return new ResponseEntity<>(errorDto, notFound);
    }
    @ExceptionHandler(InvalideEntityException.class)
    public ResponseEntity<ErrorDto> HandlerException(InvalideEntityException exception){
        final HttpStatus badRequest = HttpStatus.NOT_FOUND;
        final ErrorDto errorDto = ErrorDto.builder()
                .errorCodes(exception.getErrorCode())
                .httpCode(badRequest.value())
                .msgErr(exception.getMessage())
                .errors(exception.getErrors())
                .build();
        return new ResponseEntity<>(errorDto, badRequest);
    }
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorDto> HandlerException(BadCredentialsException exception){
        final HttpStatus badRequest = HttpStatus.BAD_REQUEST;
        final ErrorDto errorDto = ErrorDto.builder()
                .httpCode(badRequest.value())
                .errorCodes(ErrorCodes.BAD_CREDENTIALS)
                .msgErr(exception.getMessage())
                .errors(Collections.singletonList("Login et/ou mot de passe incorrect !"))
                .build();
        return new ResponseEntity<>(errorDto, badRequest);
    }
}
