package TeamBigDipper.UYouBooDan.global.security.handler;

import TeamBigDipper.UYouBooDan.global.exception.advice.ErrorResponder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.access.AccessDeniedException; // import java.nio.file.AccessDeniedException; 라이브러리 사용시 오버라이드 되지 않음

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle (HttpServletRequest request, HttpServletResponse response,
                        AccessDeniedException accessDeniedException) throws IOException, SecurityException {

        ErrorResponder.sendErrorResponse(response, HttpStatus.FORBIDDEN);

        log.warn("Forbidden error happened: {}", accessDeniedException.getMessage());
    }
}
