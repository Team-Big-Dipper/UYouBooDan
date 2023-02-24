package TeamBigDipper.UYouBooDan.topic.util.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.text.ParseException;
import java.text.SimpleDateFormat;

public class ValidDateValidator implements ConstraintValidator<ValidDate, String> {

    /**
     * Validator를 초기화하기 위한 메서드
     * @param constrainAnnotation annotation instance for a given constraint declaration
     */
    @Override
    public void initialize(ValidDate constrainAnnotation) {
        ConstraintValidator.super.initialize(constrainAnnotation);
    }

    /**
     * 날짜로 들어온 문자열의 유효성 검증하는 메서드
     * @param value object to validate
     * @param context context in which the constraint is evaluated
     * @return 유효하면 true, 유효하지 않으면 false 리턴
     */
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context){
        try {
            // 날짜 형식은 yyyy-MM-dd HH:mm:ss (ex. 2023-01-01 00:00:00)
            SimpleDateFormat timeFormatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            timeFormatter.setLenient(false);            // 날짜 파싱시 더 엄격한 구문으로 유효성 검사
            timeFormatter.parse(value);                 // 입력받은 날짜 문자열이 parse하여 format 형식에 유효한지 확인
            return true;                                // 입력받은 문자열 value가 format 형식에 유효하면 true
        } catch (ParseException e) {
            return false;                              // 유효하지 않으면 ParseException으로 false 리턴
        }

    }
}