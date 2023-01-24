package TeamBigDipper.UYouBooDan.member.value;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;

@Getter  // Photo 클래스의 값을 조회하여 null 여부를 판정하기 위해 사용
@Embeddable // Value로 지정
@AllArgsConstructor
@NoArgsConstructor
public class Photo { private String photo; }