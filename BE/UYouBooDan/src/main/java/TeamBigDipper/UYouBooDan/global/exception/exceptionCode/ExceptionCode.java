package TeamBigDipper.UYouBooDan.global.exception.exceptionCode;

import lombok.Getter;

public enum ExceptionCode {
    /**
     * 필요한 에러를 형식에 맞게 입력해주세요
     */
    NON_ACCESS_MODIFY(401, "수정권한이 없습니다."),
    NOT_FOUND(404,"찾으신 내역이 일단 없습니다.");

    @Getter
    private int status;
    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }

}
