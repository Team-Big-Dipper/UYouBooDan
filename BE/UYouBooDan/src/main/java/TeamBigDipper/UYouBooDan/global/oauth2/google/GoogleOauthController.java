package TeamBigDipper.UYouBooDan.global.oauth2.google;

import TeamBigDipper.UYouBooDan.global.exception.dto.BusinessLogicException;
import TeamBigDipper.UYouBooDan.global.exception.exceptionCode.ExceptionCode;
import TeamBigDipper.UYouBooDan.global.security.jwt.JwtTokenizer;
import TeamBigDipper.UYouBooDan.global.security.util.JwtExtractUtil;
import TeamBigDipper.UYouBooDan.member.entity.Member;
import TeamBigDipper.UYouBooDan.member.service.MemberService;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/google")
public class GoogleOauthController {

    private final GoogleService googleService;
    private final MemberService memberService;
    private final JwtExtractUtil jwtExtractUtil;

    /**
     * 프론트 요청 API : 인증 code 받기용
     * @return redirect url for Google Authorization
     */
    @GetMapping("/oauth")
    public ResponseEntity<?> googleConnect() {

        return new ResponseEntity<>(googleService.createGoogleURL(), HttpStatus.OK);
    }


    /**
     *
     * 구글 callback API : 토큰 발급 및 서비스 멤버 생성
     * @param code 구글 인증 code (프론트에서 구글로부터 받아서 이 API에 담아서 전달해주면 됨)
     * @return Success Login message
     */
    @GetMapping("/callback")
    public String redirectGoogleLogin(@RequestParam("code") String code, HttpServletResponse response) {
        googleService.loginGoogle(code, response);

        return response.getHeader("Authorization") == null ? "Fail Login: User" :  "Success Login: User";
    }


    /**
     * 구글 로그 아웃
     * @param request
     * @return
     */
    @GetMapping("/logout")
    public ResponseEntity<?> googleLogout(HttpServletRequest request) {

        Long memberId = jwtExtractUtil.extractMemberIdFromJwt(request);
        String accessToken = jwtExtractUtil.extractAccessTokenFromJwt(request);
        Long expiration = jwtExtractUtil.getExpiration(accessToken);

        try {
            // 구글 토큰 만료 시키기 위한 로직 추가 필요
            memberService.verifyMemberFromRedis(memberId, accessToken, expiration);  // 자체 서비스 로그아웃 로직

        } catch (Exception e) { throw new BusinessLogicException(ExceptionCode.NOT_FOUND); }


        return new ResponseEntity<>("Success Logout: User", HttpStatus.OK);
    }
}
