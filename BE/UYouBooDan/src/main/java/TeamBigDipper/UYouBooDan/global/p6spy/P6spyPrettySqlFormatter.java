package TeamBigDipper.UYouBooDan.global.p6spy;

import com.p6spy.engine.logging.Category;
import com.p6spy.engine.spy.appender.MessageFormattingStrategy;
import org.hibernate.engine.jdbc.internal.FormatStyle;

import java.util.Locale;
import java.util.Stack;


/**
 * p6spy를 커스터마이징하기 위한 포맷터 클래스
 * MessageFormattingStrategy 인터페이스를 상속받아, formatMessage 메소드를 오버라이드 하며,
 * 로그 출력 포맷을 커스터마이징 하는 클래스
 */
public class P6spyPrettySqlFormatter implements MessageFormattingStrategy {
    @Override
    public String formatMessage(final int connectionId, final String now, final long elapsed, final String category,
                                final String prepared, final String sql, final String url) {
        Stack<String> callStack = new Stack<>();
        StackTraceElement[] stackTrace = new Throwable().getStackTrace();
        for (int i = 0; i < stackTrace.length; i++) {
            String trace = stackTrace.toString();
            if (trace.startsWith("io.p6spy") && !trace.contains("P6spyPrettySqlFormatter")) {
                callStack.push(trace);
            }
        }
        StringBuilder callStackBuilder = new StringBuilder();
        int order = 1;
        while (callStack.size() != 0) {
            callStackBuilder.append("\n\t\t" + (order++) + ". " + callStack.pop());
        }
        String message = new StringBuilder()
                .append("\n\n\tConnection ID: ")
                .append(connectionId)
                .append("\n\tExecution Time: ")
                .append(elapsed)
                .append(" ms\n")
                .append("\n\tCall Stack (number 1 is entry point): ")
                .append(callStackBuilder).append("\n")
                .append("\n----------------------------------------------------------------------------------------------------")
                .toString();

        return sqlFormat(sql, category, message);
    }

    // formatMessage메소드를 출력할 때 사용하는 메소드. 출력할 SQL 전략을 선택
    private String sqlFormat(String sql, String category, String message) {
        if (sql.trim() == null || sql.trim().isEmpty()) {
            return "";
        }
        // 로깅 전략 선택 (RESULT 등)
        if (Category.RESULT.getName().equals(category)) {
            String s = sql.trim().toLowerCase(Locale.ROOT);  // 언어 설정 (ENGLISH 등)
            if (s.startsWith("create") || s.startsWith("alter") || s.startsWith("comment")) {
                // sql 전략 선태 (NONE, DDL, BASIC 등)
                sql = FormatStyle.DDL.getFormatter().format(sql);
            } else {
                sql = FormatStyle.DDL.getFormatter().format(sql);
            }
        }
        return new StringBuilder().append("\n").append(sql.toUpperCase()).append(message).toString();
    }
}
