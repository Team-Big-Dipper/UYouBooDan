package TeamBigDipper.UYouBooDan.topic.entity;

import TeamBigDipper.UYouBooDan.global.auditing.BaseTimeEntity;
import TeamBigDipper.UYouBooDan.global.exception.dto.BusinessLogicException;
import TeamBigDipper.UYouBooDan.global.exception.exceptionCode.ExceptionCode;
import TeamBigDipper.UYouBooDan.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Topic extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long topicId;                   // 투표 게시글 ID

    private String title;                    // 제목

    @ManyToOne                              // Member와는 다대일 관계
    @JoinColumn(name = "MEMBER_ID")         // 외래키는 Member의 Id
    private Member member;                  // 작성자 ID

    private String content;                 // 투표 게시글 내용

    @Enumerated(EnumType.STRING)         // Enum을 String으로 저장
    private TopicStatus topicStatus;     // 투표 게시글 상태

    @Enumerated(EnumType.STRING)            // Enum을 String으로 저장
    private Category category;              // 카테고리

    private LocalDateTime closedAt;         // 마감 날짜 (yyyy-MM-dd HH:mm:ss ex. 2023-01-01 13:00:00)

    @OneToMany(mappedBy = "topic", cascade = CascadeType.PERSIST)       // 일대다 맵핑, PERSIST로 TopicVoteItem도 같이 저장
    private List<TopicVoteItem> topicVoteItems;      // 투표 항목

    @OneToMany(mappedBy = "topic", cascade = CascadeType.PERSIST)   // 일대다 맵핑
    private List<TopicLike> topicLikes;                             // 투표 좋아요 리스트

    @Transient
    private Boolean isAuthor;       // 조회하는 사람이 작성자인지 여부

    @Transient
    private Boolean isVoted;        // 조회하는 사람이 투표했는지 여부

    @Transient
    private Boolean isLiked;        // 조회하는 사람이 좋아요했는지 여부

    @Transient
    private List<String> theFirstItemNames;    // 1위 투표 항목

    @Builder
    public Topic(String title, String content, String category,
                 Member member, String closedAt) {
        this.title = title;
        this.content = content;
        this.closedAt = LocalDateTime.parse(closedAt, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        this.category = Category.nameOf(category);
        this.member = member;
        topicVoteItems = new ArrayList<>();
        topicLikes = new ArrayList<>();
    }

    /**
     * 투표 항목 추가
     * @param topicVoteItem 투표항목 클래스
     */
    public void addTopicVoteItem(TopicVoteItem topicVoteItem) {
        topicVoteItems.add(topicVoteItem);
    }

    /**
     * 투표 게시글을 활성화 상태로 전환
     */
    public void changeTopicStatusActive() {
        topicStatus = TopicStatus.ACTIVE;
    }

    /**
     * 투표 게시글을 삭제 상태로 변환
     */
    public void changeTopicStatusRemoved() {
        topicStatus = TopicStatus.REMOVED;
    }

    /**
     * 투표 게시글 조회자가 투표 게시글 작성인지 여부 확인
     * @param memberId 조회하는 사용자의 id Long
     * @return 투표 게시글 작성자이면 true, 아니면 false
     */
    public Boolean findIsAuthor(Long memberId) {
        // 투표 게시글 작성자 id와 조회하는 사용자의 id가 같은지 여부 확인
        isAuthor = member.getMemberId().equals(memberId);
        return isAuthor;
    }

    /**
     * 투표 게시글 조회자가 투표 게시글에 투표했는지 여부 확인
     * @param memberId 조회하는 사용자의 id Long
     */
    public void findTopicIsVoted(Long memberId) {
        isVoted = false;        // 아직 투표 게시글에 투표를 하지 않은 초기 상태

        // 투표 항목 TopicVoteItem 리스트를 순회하면서
        for (TopicVoteItem topicVoteItem : topicVoteItems) {
            topicVoteItem.isTopicVoteItemVoted(memberId);   // 투표 항목에 투표했는지 확인

            if (topicVoteItem.getTopicVoteItemVoted()) {    // 투표 항목에 조회자가 투표했으면
                isVoted = true;                             // 현재 투표 게시글에 투표한 상태
            }
        }
    }

    /**
     * 투표 게시글의 좋아요 개수 세기
     * @return 좋아요 개수 long
     */
    public long countNumberOfTopicLike() {
        // 좋아요 TopicLike 객체 리스트를 순회하면서 좋아요 상태가 true인 것만 계산
        return topicLikes.stream()
                .filter(topicLike -> topicLike.getTopicLikeStatus())
                .count();
    }

    /**
     * 조회하는 사용자가 투표게시글에 좋아요했는지 확인
     * @param requestedMemberId 조회하는 사용자 id Long
     * @return 투표 게시글에 좋아요 했는지 여부 Boolean
     */
    public Boolean findIsLiked(Long requestedMemberId) {
        isLiked = false;                                // 게시글에 좋아요가 되지 않은 상태 - 초기 상태
        for (TopicLike topicLike : topicLikes) {        // 게시글 좋아요 리스트를 순회하면서
            // 요청한 사람이 좋아요를 했던 기록이 있고
           if (topicLike.getMember().getMemberId().equals(requestedMemberId)){
               if (topicLike.getTopicLikeStatus()){     // 좋아요 되어 있는 상태면
                    isLiked = true;                     // 현재 게시글 좋아요 상태로 변환
               }
            }
        }
        return isLiked;     // 좋아요했는지 여부 상태 반환
    }

    /**
     * 투표 게시글의 투표가 마감됐는지 여부 확인
     * @param now 현재 시간 LocalDateTime
     * @return 마감됐으면 true, 마감되지않았으면 false Boolean
     */
    public Boolean isTopicClosed(LocalDateTime now) {
        if (topicStatus == TopicStatus.CLOSED) {        // 투표 게시글 상태가 마감 상태이면
            return true;
        } else if (closedAt.isBefore(now)){      // 현재 시간으로부터 마감일이 이전이면
            topicStatus = TopicStatus.CLOSED;           // 투표 게시글 상태를 마감 상태로 바꿈
            return true;                                // 투표 게시글이 마감된 상태 반환
        }
        return false;                                   // 투표 게시글이 마감되지 않은 상태 반환
    }

    /**
     * 투표 게시글에서 1위 투표 항목 이름 리스트 찾기
     * @return 1위 투표 항목 이름 리스트
     */
    public List<String> findTheFirstVoteItemName() {
        theFirstItemNames = new ArrayList<>();                          // 1위 투표 항목 이름 리스트 초기화

        int max = topicVoteItems.get(0).findNumberOfVoteInItem();               // 최대 투표수를 첫번째 투표 항목의 투표 수로 초기화
        for (int i = 1; i < topicVoteItems.size(); i++) {                       // 각 투표 항목들을 순회하면서
            int nowNumber = topicVoteItems.get(i).findNumberOfVoteInItem();     // 투표 수 계산하여 최대 투표 수 찾기
            if (max < nowNumber){
                max = nowNumber;
            }
        }

        if (max != 0) {     // 최대 투표수가 0이 아니면(투표를 진행했으면) - 최대 투표 수가 0이면 투표 진행 안함.
            for (TopicVoteItem topicVoteItem : topicVoteItems) {                    // 각 투표 항목들 진행하면서
                if (topicVoteItem.findNumberOfVoteInItem() == max) {                // 최대 투표 수와 같은 투표 항목이면
                    theFirstItemNames.add(topicVoteItem.getTopicVoteItemName());    // 1위 투표 항목 이름 리스트에 추가
                }
            }
        }

        // 1위 투표 항목 이름 리스트 반환
        return theFirstItemNames;
    }

    /**
     * 투표 게시글이 삭제됐는지 여부 반환하는 메서드
     * @return 삭제됐으면 true, 아니면 false Boolean 반환
     */
    public Boolean isTopicRemoved(){
        return topicStatus == TopicStatus.REMOVED;
    }

    /**
     * 투표 게시글의 투표가 진행중인지 여부 반환하는 메서드
     * @return 진행중이면 true, 아니면 false Boolean 반환
     */
    public Boolean isTopicInProgress() {
        topicVoteItems.forEach(topicVoteItem -> {               // 투표 항목 리스트 순회하면서
            if (topicVoteItem.getTopicVotes().size() > 0) {     // 투표 기록이 있으면
                topicStatus = TopicStatus.PROGRESS;             // 투표 게시글의 상태를 진행중으로 전환
            }
        });

        return topicStatus == TopicStatus.PROGRESS;             // 투표 게시글 상태가 진행중인지 여부 반환
    }

    /**
     * 투표 게시글의 카테고리 수정하는 메서드
     * @param category 카테고리 Enum
     */
    public void modifyTopicCategory(Category category) {
        this.category = category;
    }

    /**
     * 투표 게시글의 카테고리 수정하는 메서드
     * @param category 카테고리 문자열 String
     */
    public void modifyTopicCategory(String category) {
        this.category = Category.nameOf(category);

    }

    /**
     * 투표 게시글의 제목 수정하는 메서드
     * @param title 제목 String
     */
    public void modifyTopicTitle(String title) {
        this.title = title;
    }

    /**
     * 투표 게시글의 내용 수정하는 메서드
     * @param content 내용 String
     */
    public void modifyTopicContent(String content) {
        this.content = content;
    }

    /**
     * 투표 게시글의 마감일 수정하는 메서드
     * 마감일은 일단 수정 불가로 정함 - 나중에 기능 추가시 대비하여 코드 주석 처리
     * @param closedAt
     */
//    public void modifyTopicClosedAt(LocalDateTime closedAt) {
//        this.closedAt = closedAt;
//    }

    /**
     * 카테고리 enum 클래스
     */
    @Getter
    public enum Category {
        Food("음식")
        ;

        @Getter
        private String categoryName;

        Category(String categoryName) {
            this.categoryName = categoryName;
        }

        /**
         * 한글로된 카테고리 이름을 Category Enum 으로 변경
         * @param categoryName 한글로된 카테고리 이름
         * @return Category Enum
         */
        public static Category nameOf(String categoryName) {
            for (Category category : Category.values()) {
                if (category.getCategoryName().equals(categoryName)){
                    return category;
                }
            }
            throw new BusinessLogicException(ExceptionCode.CATEGORY_NOT_EXIST);
        }
    }

    /**
     * 게시글 상태 관리
     */
    public enum TopicStatus {
        ACTIVE("활성화"),
        REMOVED("삭제된 게시글"),
        CLOSED("마감된 투표 게시글"),
        PROGRESS("투표가 진행 중인 게시글")
        ;

        @Getter
        private String message;

        TopicStatus(String message) {
            this.message = message;
        }
    }
}
