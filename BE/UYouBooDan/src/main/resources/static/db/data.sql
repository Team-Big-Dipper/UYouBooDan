
INSERT INTO Member(memberId, createdAt, last_modified_at, email, memberStatus, name, password, photo) VALUES
(1, '2023-01-01 00:05:33.825730', '2023-01-01 00:05:33.825730', 'asdf1234@gmail.com', 'MEMBER_ACTIVE', '헤이즐넛', '{bcrypt}$2a$10$ps7EXP6V8pxDB0fgsBvbduRzcnHO5sD32FtFQ7tzBfcztBWSRTFIO', 'https://scontent-gmp1-1.xx.fbcdn.net/v/t1.18169-9/527016_499021583525593_732357164_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=CdbnqyyFWXkAX_obHCp&_nc_ht=scontent-gmp1-1.xx&oh=00_AfDBQSsLnCXMKoAPnGFrOeSBgvMp__vgjXLEqmtS6etfcw&oe=63F1DB6A'),
(2, '2023-02-01 00:05:33.825730', '2023-02-01 00:05:33.825730', 'nyong9221@naver.com', 'MEMBER_ACTIVE', '김동진', '{bcrypt}$2a$10$ps7EXP6V8pxDB0fgsBvbduRzcnHO5sD32FtFQ7tzBfcztBWSRTFIO', 'https://lh3.googleusercontent.com/a/AEdFTp4Vf1QycDfSzh03QHViVL7_Uxe16YntF4Q-caLkog=s288-p-rw-no'),
(3, '2023-02-03 00:05:33.825730', '2023-02-03 00:05:33.825730', 'rlgywnd@naver.com', 'MEMBER_ACTIVE', 'Kakao 김효중', '{bcrypt}$2a$10$ps7EXP6V8pxDB0fgsBvbduRzcnHO5sD32FtFQ7tzBfcztBWSRTFIO', 'https://scontent-gmp1-1.xx.fbcdn.net/v/t1.18169-9/527016_499021583525593_732357164_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=CdbnqyyFWXkAX_obHCp&_nc_ht=scontent-gmp1-1.xx&oh=00_AfDBQSsLnCXMKoAPnGFrOeSBgvMp__vgjXLEqmtS6etfcw&oe=63F1DB6A'),
(4, '2023-02-03 00:05:33.825730', '2023-02-03 00:05:33.825730', 'rlgywnd123@gmail.com', 'MEMBER_ACTIVE', 'Google 김효중', '{bcrypt}$2a$10$ps7EXP6V8pxDB0fgsBvbduRzcnHO5sD32FtFQ7tzBfcztBWSRTFIO', 'https://lh3.googleusercontent.com/a/AEdFTp60PjsqOwMeG52mdMrNG9kpqRrt7PXZBokb2sos=s96-c');

INSERT INTO member_roles(Member_memberId,roles) values
(1,'USER'),
(2,'USER'),
(3,'USER'),
(4,'USER');

INSERT INTO Topic(topicId, createdAt, last_modified_at, category, closedAt, content, title, topicStatus, MEMBER_ID) VALUES
(1, '2023-01-01 00:05:33.825730', '2023-01-01 00:05:33.825730', 'Food', '2023-02-28 00:05:30.000000', '상세내용', '제목', 'ACTIVE', 1),
(2, '2023-02-01 00:05:33.825730', '2023-02-01 00:05:33.825730', 'Food', '2023-02-28 00:05:30.000000', '상세내용', '제목', 'ACTIVE', 3),
(3, '2023-02-01 00:05:33.825730', '2023-02-01 00:05:33.825730', 'Food', '2023-02-28 00:05:30.000000', '상세내용', '제목', 'ACTIVE', 4);

INSERT INTO TopicVoteItem(topicVoteItemId, createdAt, last_modified_at, topicVoteItemName, topic_id) VALUES
(1,'2023-01-01 00:05:33.825730','2023-01-01 00:05:33.825730', '투표 게시글 투표 항목1 테스트',1),
(2,'2023-01-01 00:05:33.825730','2023-01-01 00:05:33.825730', '투표 게시글 투표 항목2 테스트',1),
(3,'2023-02-01 00:05:33.825730','2023-02-01 00:05:33.825730', '투표 게시글 투표 항목1 테스트',2),
(4,'2023-02-01 00:05:33.825730','2023-02-01 00:05:33.825730', '투표 게시글 투표 항목2 테스트',2),
(5,'2023-02-01 00:05:33.825730','2023-02-01 00:05:33.825730', '투표 게시글 투표 항목1 테스트',3),
(6,'2023-02-01 00:05:33.825730','2023-02-01 00:05:33.825730', '투표 게시글 투표 항목2 테스트',3);

INSERT INTO TopicVote(topicVoteId, createdAt, last_modified_at, memberId, topicVoteItemId) VALUE
(1,'2023-01-01 00:05:33.825730','2023-01-01 00:05:33.825730',1,1),
(2,'2023-01-01 00:05:33.825730','2023-01-01 00:05:33.825730',2,1),
(3,'2023-01-01 00:05:33.825730','2023-01-01 00:05:33.825730',3,2);

INSERT INTO Comment(comment_id, createdAt, last_modified_at, commentContent, commentStatus, member_id, topic_id, totalLike) VALUES
(1, '2023-01-03 00:05:33.825730','2023-01-03 00:05:33.825730', '테스트 댓글1', 0, 1, 1, 1);
