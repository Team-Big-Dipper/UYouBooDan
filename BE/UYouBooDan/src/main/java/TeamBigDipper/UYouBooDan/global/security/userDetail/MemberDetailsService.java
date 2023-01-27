package TeamBigDipper.UYouBooDan.global.security.userDetail;

import TeamBigDipper.UYouBooDan.global.exception.dto.BusinessLogicException;
import TeamBigDipper.UYouBooDan.global.exception.exceptionCode.ExceptionCode;
import TeamBigDipper.UYouBooDan.global.security.util.CustomAuthorityUtils;
import TeamBigDipper.UYouBooDan.member.entity.Member;
import TeamBigDipper.UYouBooDan.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;


/**
 * UserDetailsService를 확장받았기 때문에, 메소드를 전부 Override해줘야 함.
 */
@RequiredArgsConstructor
@Component
public class MemberDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils customAuthorityUtils;

    @Override
    public UserDetails loadUserByUsername (String username) throws UsernameNotFoundException {
        Member findMember = memberRepository.findByEmail(username)
                .orElseThrow(()->new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return new MemberDetails(findMember);
    }


    private final class MemberDetails extends Member implements UserDetails {

        MemberDetails(Member member) {
            setMemberId(member.getMemberId());
            setEmail(member.getEmail());
            setPassword(member.getPassword());
            setRoles(member.getRoles());
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {

            return customAuthorityUtils.createAuthorities(this.getRoles());
        }

        @Override
        public String getUsername() { return getEmail(); }

        @Override
        public boolean isAccountNonExpired() { return true; }

        @Override
        public boolean isAccountNonLocked() { return true; }

        @Override
        public boolean isCredentialsNonExpired() { return true; }

        @Override
        public boolean isEnabled() { return true; }

    }
}
