package TeamBigDipper.UYouBooDan.member.repository;

import TeamBigDipper.UYouBooDan.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    @Query(value = "SELECT m FROM Member m WHERE m.email.email =: email")
    Optional<Member> findByEmail(String email);
}
