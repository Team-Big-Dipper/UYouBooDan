package TeamBigDipper.UYouBooDan.global.security.handler;

import TeamBigDipper.UYouBooDan.global.exception.advice.ErrorResponder;
import TeamBigDipper.UYouBooDan.global.exception.dto.BusinessLogicException;
import TeamBigDipper.UYouBooDan.global.exception.exceptionCode.ExceptionCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;  // import javax.naming.AuthenticationException; 로 받아오면 에러남
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component @Slf4j
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence (HttpServletRequest request, HttpServletResponse response,
                          AuthenticationException authenticationException) throws IOException, ServletException {

        Exception exception = (Exception) request.getAttribute("exception");

        ErrorResponder.sendErrorResponse(response, HttpStatus.UNAUTHORIZED); // 인증 권한 없을시 걸림

        logExceptionMessage(authenticationException, exception); // 에러 로그를 확인하기 위한 메소드

        throw new BusinessLogicException(ExceptionCode.NON_ACCESS_MODIFY);  // 권한인 필요한 리소스에 접근할 때, 권한이 존재 하지 않는 경우 진입
    }


    /**
     * 예외 메세지를 반환하기위한 메소드
     * @param authenticationException : 인증 에러 발생시, 인증 에러 내 메세지를 반환
     * @param exception : 인증 에러가 아닐 시, 해당 예외 메세지 반환
     */
    private void logExceptionMessage (AuthenticationException authenticationException, Exception exception) {
        String message = exception != null ? exception.getMessage() : authenticationException.getMessage();
        log.warn("Unauthorized error happened: {}", message);
    }

}
