package TeamBigDipper.UYouBooDan.global.security.filter;

import TeamBigDipper.UYouBooDan.global.exception.exceptionCode.AuthException;
import TeamBigDipper.UYouBooDan.global.exception.exceptionCode.ExceptionCode;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;


import javax.servlet.http.HttpServletResponse;

@Slf4j
public class FilterExceptionResolver {

    private String contentType = "application/json;charset=UTF-8";


    /**
     * 인증에러 발생 시 예외 핸들러 메소드. 만약 인증에러가 아니면, 다른 에러에 대한 메세지를 로그와 예외로 던짐
     */
    @SneakyThrows
    public void handleException (RuntimeException e, HttpServletResponse response) {

        if(e instanceof AuthException) {

            System.out.println("캐치캐치 뱅뱅");
            AuthException authException = (AuthException) e;
            sendErrorResponse(response, authException.getExceptionCode());

        } else {

            log.warn(e.getMessage());
            response.getWriter().write(e.getMessage());

        }
    }


    /**
     * 에러 상태 반환 메소드
     */
    @SneakyThrows
    private void sendErrorResponse (HttpServletResponse response, ExceptionCode exceptionCode) {

        response.setContentType(contentType);
        response.setStatus(exceptionCode.getStatus());

    }
}
