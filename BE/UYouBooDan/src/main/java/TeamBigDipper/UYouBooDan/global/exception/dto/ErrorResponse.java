package TeamBigDipper.UYouBooDan.global.exception.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor @Builder
public class ErrorResponse {
    private int status;  // 에러코드번호

    private String exception; // 예외명 (예외 분류)

    private String message; // 에러메세지

    public static ErrorResponse of(HttpStatus httpStatus) {
        return new ErrorResponse(httpStatus.value(), httpStatus.getReasonPhrase());
    }
    private ErrorResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
