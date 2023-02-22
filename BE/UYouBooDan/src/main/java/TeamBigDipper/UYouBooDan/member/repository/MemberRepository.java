package TeamBigDipper.UYouBooDan.member.repository;

import TeamBigDipper.UYouBooDan.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmail(String email);

    @Query(value = "SELECT m FROM Member m WHERE m.nickname.name =:nickname")
    Optional<Member> findByNickname(String nickname);
}
