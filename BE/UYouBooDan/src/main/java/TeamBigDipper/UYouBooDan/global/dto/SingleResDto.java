package TeamBigDipper.UYouBooDan.global.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SingleResDto<T> {
    T data;  // 기본 Optional Response용 구현 클래스
}
