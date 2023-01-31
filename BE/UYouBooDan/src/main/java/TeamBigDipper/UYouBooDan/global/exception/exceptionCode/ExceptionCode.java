package TeamBigDipper.UYouBooDan.global.exception.exceptionCode;

import lombok.Getter;

public enum ExceptionCode {
    /**
     * 필요한 에러를 형식에 맞게 입력해주세요
     */
    NON_ACCESS_MODIFY(401, "수정권한이 없습니다."),

    NOT_FOUND(404,"찾으신 내역이 일단 없습니다."),

    MEMBER_NOT_FOUND(400, "존재하지 않는 계정입니다."),


    EMAIL_EXIST(401, "중복된 이메일 입니다."),
    NICKNAME_EXIST(401, "중복된 닉네임 입니다."),
    NOT_EXACT_PASSWORD(401,"비밀번호가 일치하지 않습니다."),
    LOGIN_REQUIRED(401, "로그인이 필요한 서비스 입니다.");


    @Getter
    private int status;
    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }

}
