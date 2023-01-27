package TeamBigDipper.UYouBooDan.global.exception.exceptionCode;

import lombok.Getter;
import org.springframework.security.core.AuthenticationException;

/**
 * Authentication & Authorize 관련 Exception 정보를 담은 예외 클래스
 */
public class AuthException extends AuthenticationException {

    @Getter
    ExceptionCode exceptionCode;

    public AuthException(ExceptionCode exceptionCode, String sourceMessage) {
        super(sourceMessage);
        this.exceptionCode = exceptionCode;
    }

}
