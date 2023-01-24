package TeamBigDipper.UYouBooDan.comment.entity;

import lombok.Getter;

public enum CommentStatus {
    ACTIVE(0, "활성화"),
    REMOVED(1, "삭제된 댓글");

    @Getter
    private int code;
    @Getter
    private String message;

    CommentStatus(int code, String message){
        this.code = code;
        this.message = message;
    }
}
