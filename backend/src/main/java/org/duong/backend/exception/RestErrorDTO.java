package org.duong.backend.exception;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

public class RestErrorDTO {
    private HttpStatus status;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss dd/MM/yyyy")
    private LocalDateTime timestamp;
    private String message;

    public RestErrorDTO() {
        this.timestamp = LocalDateTime.now();
    }

    public RestErrorDTO(HttpStatus status) {
        this();
        this.status = status;
    }

    public RestErrorDTO(HttpStatus status, Throwable throwable) {
        this();
        this.status = status;
        this.message = "Unexpected Error";
    }

    public RestErrorDTO(HttpStatus status, String message, Throwable throwable) {
        this();
        this.status = status;
        this.message = message;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
