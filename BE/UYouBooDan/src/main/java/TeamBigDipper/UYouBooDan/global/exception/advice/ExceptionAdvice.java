package TeamBigDipper.UYouBooDan.global.exception.advice;

import TeamBigDipper.UYouBooDan.global.exception.dto.BusinessLogicException;
import TeamBigDipper.UYouBooDan.global.exception.dto.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

@RestControllerAdvice @Slf4j
public class ExceptionAdvice {
    /**
     * 일반 에러 처리
     */
    @ExceptionHandler
    public ResponseEntity<ErrorResponse> ExceptionHandler(Exception e) {
        ErrorResponse errorResponse = new ErrorResponse(400, e.getClass().getSimpleName(), "잘못된 요청입니다.");
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    /**
     * 비즈니스 로직(Service) 에러 처리
     * 새로운 비즈니스로직에러는 ExceptionCode Enum에 추가하셔서 사용하시면 됩니다.
     */
    @ExceptionHandler
    public ResponseEntity BusinessLoginExceptionHandler(BusinessLogicException e) {
        ErrorResponse errorResponse = new ErrorResponse(e.getExceptionCode().getStatus(),  // 보내줄 에러 정보들 (현재 3가지만 선정)
                e.getClass().getSimpleName(),
                e.getExceptionCode().getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.valueOf(e.getExceptionCode().getStatus())); // 보내준 에러코드
    }


}
