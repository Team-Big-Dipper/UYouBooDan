package TeamBigDipper.UYouBooDan.topic.util.validator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 날짜 형식 유효성 검증을 위한 ValidDate 커스텀 어노테이션 인터페이스
 */
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = {ValidDateValidator.class})
public @interface ValidDate {
    String message() default "날짜 형식은 년:월:일 시:분:초 입니다";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default{};
}
