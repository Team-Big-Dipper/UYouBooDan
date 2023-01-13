package TeamBigDipper.UYouBooDan.global.exception.dto;

import TeamBigDipper.UYouBooDan.global.exception.exceptionCode.ExceptionCode;
import lombok.Getter;

public class BusinessLogicException extends RuntimeException {

    @Getter
    private ExceptionCode exceptionCode;

    public BusinessLogicException(ExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }
}
