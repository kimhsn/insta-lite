package com.api.jee.handlers;

import com.api.jee.exception.ErrorCodes;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
public class ErrorDto {
    private Integer httpCode;
    private ErrorCodes errorCodes;
    private String msgErr;
    private List<String> errors = new ArrayList<>();
}
