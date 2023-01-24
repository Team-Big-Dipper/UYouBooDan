package TeamBigDipper.UYouBooDan.global.exception.exceptionCode;

import lombok.Getter;

public enum ExceptionCode {
    /**
     * 필요한 에러를 형식에 맞게 입력해주세요
     */
    NON_ACCESS_MODIFY(401, "수정권한이 없습니다."),
    MEMBER_NOT_FOUND(400, "존재하지 않는 계정입니다.");

    @Getter
    private int status;
    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }

}
