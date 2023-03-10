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

@RequiredArgsConstructor
@RestController
@RequestMapping("/google")
public class GoogleOauthController {
    @Getter
    @Value("${oauth.google.clientId}")
    private String googleClientId;
    @Getter
    @Value("${oauth.google.clientSecret}")
    private String googleClientSecret;
    @Getter
    @Value("${oauth.google.redirectUrl}")
    private String googleRedirectUrl;
    @Value("${oauth.google.scope}")
    private String scopes;

    private final MemberService memberService;
    private final JwtTokenizer jwtTokenizer;
    private final JwtExtractUtil jwtExtractUtil;

    /**
     * ????????? ?????? API : ?????? code ?????????
     * @return redirect url for Google Authorization
     */
    @GetMapping("/oauth")
    public ResponseEntity<?> googleConnect() {
        StringBuffer url = new StringBuffer();
        url.append("https://accounts.google.com/o/oauth2/v2/auth?");
        url.append("client_id=" + getGoogleClientId());
        url.append("&redirect_uri=" + getGoogleRedirectUrl());
        url.append("&response_type=code");
        url.append("&scope="+ getScopeUrl());

        return new ResponseEntity<>(url.toString(), HttpStatus.OK);
    }


    /**
     *
     * ?????? callback API : ?????? ?????? ??? ????????? ?????? ??????
     * @param code ?????? ?????? code (??????????????? ??????????????? ????????? ??? API??? ????????? ??????????????? ???)
     * @return Success Login message
     */
    @GetMapping("/callback")
    public String redirectGoogleLogin(@RequestParam("code") String code, HttpServletResponse response) {

        // Http ????????? ?????? RestTemplate ??????
        RestTemplate restTemplate = new RestTemplate();
        GoogleLoginReqVo request = GoogleLoginReqVo.builder()
                .clientId(getGoogleClientId())
                .clientSecret(getGoogleClientSecret())
                .code(code)
                .redirectUri(getGoogleRedirectUrl())
                .grantType("authorization_code")
                .build();

        // try ~ catch ?????? ?????? ???????????? ?????? ?????? ?????????????????? ????????? ?????????
        ResponseEntity<GoogleLoginDto> userDetailsResponse = null;
        // try ~ catch ?????? ?????? ???????????? ?????? ????????? ??????????????? DTO ?????????
        ResponseEntity<String> oauthTokenResponse;
        // try ~ catch ?????? ?????? ???????????? ?????? ????????? Response??? ???????????? ?????? VO
        GoogleLoginResVo loginResponse = null;
        // try ~ catch ?????? ?????? ???????????? ?????? ?????? ??????????????? DTO ?????????
        GoogleLoginDto googleProfile;

        // ????????? ?????? ?????? ??? ???????????? ??????
        try {
            // Http Header ??????
            HttpHeaders headers  = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<GoogleLoginReqVo> googleTokenRequest = new HttpEntity<>(request, headers);

            // fetching for token
//            oauthTokenResponse = restTemplate.postForEntity("https://oauth2.googleapis.com" + "/token", googleTokenRequest, String.class); // legacy ??????
            oauthTokenResponse = restTemplate.exchange(
                    "https://oauth2.googleapis.com" + "/token",
                    HttpMethod.POST,
                    googleTokenRequest,
                    String.class
            );

            // Google token converting process
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.setPropertyNamingStrategy(PropertyNamingStrategy.SNAKE_CASE);
            objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL); // NULL??? ?????? ?????? ?????? ??????
            loginResponse = objectMapper.readValue(oauthTokenResponse.getBody(), new TypeReference<>() {});

            String jwtToken = loginResponse.getIdToken();
            String requestUrl = UriComponentsBuilder.fromHttpUrl("https://oauth2.googleapis.com/tokeninfo").queryParam("id_token", jwtToken).toUriString();

            // fetching for profile data
            String resultJson = restTemplate.getForObject(requestUrl, String.class);

            // Google profile converting process
            if(resultJson != null) {
                GoogleLoginDto loginDto = objectMapper.readValue(resultJson, new TypeReference<>() {});
                userDetailsResponse = ResponseEntity.ok().body(loginDto);
            } else {
                throw new Exception("Google OAuth failed");
            }

        } catch (Exception e) { e.printStackTrace(); }

        // ????????? ?????? ?????? ??????
        googleProfile = userDetailsResponse.getBody();
        Member googleMember = memberService.createGoogleMember(googleProfile, loginResponse.getAccessToken());

        // ???????????? ??????
        // Authentication ??? Security Context Holder ??? ??????
        Authentication authentication = new UsernamePasswordAuthenticationToken(googleMember.getEmail(), googleMember.getPassword()); // password ??????
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // ?????? JWT ?????? ??? HttpServletResponse ??? Header ??? ?????? (??????????????? ?????????)
        String accessToken = jwtTokenizer.delegateAccessToken(googleMember);
        String refreshToken = jwtTokenizer.delegateRefreshToken(googleMember);
        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("RefreshToken", refreshToken);

        return "Success Login: User";
    }


    /**
     * ?????? ?????? ??????
     * @param request
     * @return
     */
    @GetMapping("/logout")
    public ResponseEntity<?> googleLogout(HttpServletRequest request) {

        Long memberId = jwtExtractUtil.extractMemberIdFromJwt(request);
        String accessToken = jwtExtractUtil.extractAccessTokenFromJwt(request);
        Long expiration = jwtExtractUtil.getExpiration(accessToken);

        try {
            // ?????? ?????? ?????? ????????? ?????? ?????? ?????? ??????
            memberService.verifyMemberFromRedis(memberId, accessToken, expiration);  // ?????? ????????? ???????????? ??????

        } catch (Exception e) { throw new BusinessLogicException(ExceptionCode.NOT_FOUND); }


        return new ResponseEntity<>("Success Logout: User", HttpStatus.OK);
    }


    /**
     * scope ????????? get ?????????
     * @return scopes
     */
    private String getScopeUrl() {
        return scopes.replaceAll(",", "%20");
    }
}
