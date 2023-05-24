package TeamBigDipper.UYouBooDan.global.oauth2.naver;

import TeamBigDipper.UYouBooDan.global.exception.dto.BusinessLogicException;
import TeamBigDipper.UYouBooDan.global.exception.exceptionCode.ExceptionCode;
import TeamBigDipper.UYouBooDan.global.security.jwt.JwtTokenizer;
import TeamBigDipper.UYouBooDan.global.security.util.JwtExtractUtil;
import TeamBigDipper.UYouBooDan.member.entity.Member;
import TeamBigDipper.UYouBooDan.member.service.MemberService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/naver")
public class NaverOauthController {

    private final NaverService naverService;
    private final MemberService memberService;
    private final JwtExtractUtil jwtExtractUtil;

    /**
     * 프론트에 Redirect URI를 제공하기 위한 메소드
     * 프론트에서 네이버 인증 센터로 요청을 주기위한 URI를 제공하며, 이를통해 인증코드를 받아 자체 서비스 callback API 호출시 전달
     *
     * @return redirect URI
     * @throws UnsupportedEncodingException
     */
    @GetMapping("/oauth")
    public ResponseEntity<?> naverConnect() throws UnsupportedEncodingException {
        String url = naverService.createNaverURL();

        return new ResponseEntity<>(url, HttpStatus.OK); // 프론트 브라우저로 보내는 주소
    }


    /**
     * 실제 로그인 로직을 수행할 메소드
     *
     * 비즈니스 로직 성공 : @return "Success Login: User"
     * 비즈니스 로직 실패 : @return "Fail Login: User"
     */
    @GetMapping("/callback")
    public String naverLogin(@RequestParam("code") String code, @RequestParam("state") String state, HttpServletResponse response) throws JsonProcessingException {
        naverService.loginNaver(code, state, response);

        /* Header가 아닌 Redis 서버에 잘 저장이 되었는지 확인하기 */
        return response.getHeader("Authorization") == null ? "Fail Login: User" :  "Success Login: User";
    }


    /**
     * 로그아웃 API
     *
     * @param request
     * @return
     */
    @GetMapping("/logout")
    public ResponseEntity<?> naverLogout(HttpServletRequest request) {

        // DI를 이용해 파라미터 및 객체를 구하는 구간
        Long memberId = jwtExtractUtil.extractMemberIdFromJwt(request);
        Member loginMember = memberService.findMember(memberId);
        String accessToken = jwtExtractUtil.extractAccessTokenFromJwt(request);
        Long expiration = jwtExtractUtil.getExpiration(accessToken);

        // REST API 요청을 전송하기 위한 준비 구간
        RestTemplate restTemplate = new RestTemplate(); // Http 요청을 보내기 위한 템플릿 클래스
        HttpHeaders userHttpHeaders = new HttpHeaders(); // Http 요청을 위한 Headers
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>(); // Http 요청을 위한 parameters를 설정해주기 위한 클래스
        HttpEntity<MultiValueMap<String, String>> naverLogoutRequest = new HttpEntity<>(params, userHttpHeaders); // http 요청을 위한 엔티티 클래스 (Header와 Parans를 담아줌)

        userHttpHeaders.add("Authorization", "Bearer " + loginMember.getOauthAccessToken());
        userHttpHeaders.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        params.add("target_id_type", "user_id");
        params.add("target_id", loginMember.getOauthId());  // 여기서 nullpointer발생

        // Naver인증센터에 REST API 요청
        try {
            ResponseEntity<String> LogoutResponse = restTemplate.exchange(
                    "http://nid.naver.com/nidlogin.logout", // 네이버 developer에 따로 네이버 로그아웃이 없으므로 본 경로를 사용. 단, 이 경로를 사용할 경우 HTML 로그가 나옵니다.
                    HttpMethod.POST,
                    naverLogoutRequest,
                    String.class
            );
            System.out.println(LogoutResponse);

            memberService.verifyMemberFromRedis(memberId, accessToken, expiration);  // 자체 서비스 로그아웃 로직

        } catch (Exception e) {
            throw new BusinessLogicException(ExceptionCode.NOT_FOUND);
        }

        return new ResponseEntity<>("Success Logout: User", HttpStatus.OK);
    }

}
