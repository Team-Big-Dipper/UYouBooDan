package TeamBigDipper.UYouBooDan.global.security.handler;

import TeamBigDipper.UYouBooDan.member.entity.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess (HttpServletRequest request, HttpServletResponse response,
                                         Authentication authentication) throws IOException {

        log.info("Success Login");

        response.getWriter().print("Success Login: User");
        response.getWriter().flush();


        /**
         * 만약 로그인에 따른 클라이언트 응답을 다르게 하고 싶을 경우, 위으 두 줄의 코드를 출력하는 방식에 조건을 걸어 코드를 작성하면 됨.
         * 아래는 예시: Admin의 계정이 아래 더미데이터에 한정된다는 전제하에 Admin과 User에 따른 구분
         *
         * Member member = (Member) authentication.getPrincipal(); // principal은 Object 타입이므로, Member타입으로 캐스팅
         *         // 더미 데이터
         *         List<String> adminMailAddress = new ArrayList<>();
         *         adminMailAddress.add("admin@gmail.com");
         *         adminMailAddress.add("admin1@gmail.com");
         *         adminMailAddress.add("admin2@gmail.com");
         *         adminMailAddress.add("admin3@gmail.com");
         *
         *         if(adminMailAddress.contains(member.getEmail())) {
         *             response.getWriter().print("Success ADMIN");
         *         } else {
         *             response.getWriter().print("Success USER");
         *         }
         *
         *         response.getWriter().flush();
         */


    }
}
