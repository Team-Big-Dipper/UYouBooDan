package TeamBigDipper.UYouBooDan.global.security.util;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CustomAuthorityUtils {

    private final List<GrantedAuthority> ADMIN_ROLES = AuthorityUtils.createAuthorityList("ROLE_ADMIN", "ROLE_USER");
    private final List<GrantedAuthority> USER_ROLES = AuthorityUtils.createAuthorityList("ROLE_USER");
    private final List<String> ADMIN_ROLES_STRING = List.of("ADMIN", "USER");
    private final List<String> USER_ROLES_STRING = List.of("USER");


    /**
     * 메모리 싱의 ROLE을 기반으로 권한 정보 생성.
     * 입력된 email기반으로 역할 부여하는 메소드
     * @param email : 요청으로 들어온 email
     * @return 기본은 USER_ROLES. 설정에 따라 ADMIN_ROLES 부여가능
     */
    public List<GrantedAuthority> createAuthorities (String email) {

        return USER_ROLES;
    }


    /**
     * DB에 저장된 ROLE을 기반으로 권한 정보 생성
     * @param roles
     * @return
     */
    public List<GrantedAuthority> createAuthorities (List<String> roles) {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toList());
    }


    /**
     * DB테이블에 ROLE 저장용 메소드
     * **이 로직에서 부하는 권한에 따라 ADMIN이 되는지 USER가 되는지가 결정됨**
     * @param email
     * @return
     */
    public List<String> createRoles (String email) {
        // 우선은 전부 USER ROLE 부여
        return USER_ROLES_STRING;
    }
}
