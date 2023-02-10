
INSERT INTO Member(memberId, createdAt, last_modified_at, email, memberStatus, name, oauthAccessToken, oauthId, password, photo) VALUES
(1, '2023-01-01 00:05:33.825730', '2023-01-01 00:05:33.825730', 'asdf1234@gmail.com', 'MEMBER_ACTIVE', '헤이즐넛', null, null, '{bcrypt}$2a$10$/oY7d5gIvE85XDLLn7kvmuLGFCdryYilQ4rsrEqKim6LIZXV7vBem', 'https://scontent-gmp1-1.xx.fbcdn.net/v/t1.18169-9/527016_499021583525593_732357164_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=CdbnqyyFWXkAX_obHCp&_nc_ht=scontent-gmp1-1.xx&oh=00_AfDBQSsLnCXMKoAPnGFrOeSBgvMp__vgjXLEqmtS6etfcw&oe=63F1DB6A'),
(2, '2023-02-01 00:05:33.825730', '2023-02-01 00:05:33.825730', 'nyong9221@naver.com', 'MEMBER_ACTIVE', '김동진', null, null, '{bcrypt}$2a$10$/oY7d5gIvE85XDLLn7kvmuLGFCdryYilQ4rsrEqKim6LIZXV7vBem', 'https://lh3.googleusercontent.com/a/AEdFTp4Vf1QycDfSzh03QHViVL7_Uxe16YntF4Q-caLkog=s288-p-rw-no'),
(3, '2023-02-03 00:05:33.825730', '2023-02-03 00:05:33.825730', 'rlgywnd@naver.com', 'MEMBER_ACTIVE', 'Kakao 김효중', null, null, '{bcrypt}$2a$10$/oY7d5gIvE85XDLLn7kvmuLGFCdryYilQ4rsrEqKim6LIZXV7vBem', 'https://scontent-gmp1-1.xx.fbcdn.net/v/t1.18169-9/527016_499021583525593_732357164_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=CdbnqyyFWXkAX_obHCp&_nc_ht=scontent-gmp1-1.xx&oh=00_AfDBQSsLnCXMKoAPnGFrOeSBgvMp__vgjXLEqmtS6etfcw&oe=63F1DB6A'),
(4, '2023-02-03 00:05:33.825730', '2023-02-03 00:05:33.825730', 'rlgywnd123@gmail.com', 'MEMBER_ACTIVE', 'Google 김효중', null, null, '{bcrypt}$2a$10$/oY7d5gIvE85XDLLn7kvmuLGFCdryYilQ4rsrEqKim6LIZXV7vBem', 'https://lh3.googleusercontent.com/a/AEdFTp60PjsqOwMeG52mdMrNG9kpqRrt7PXZBokb2sos=s96-c');

INSERT INTO Member_roles(Member_memberId,roles) values
(1,'USER'),
(2,'USER'),
(3,'USER'),
(4,'USER');

INSERT INTO Topic(topicId, createdAt, last_modified_at, category, closedAt, content, title, topicStatus, MEMBER_ID) VALUES
(1, '2023-01-01 00:05:33.825730', '2023-01-01 00:05:33.825730', 'Food', '2023-02-28 00:05:30.000000', '상세내용', '제목1', 'ACTIVE', 1),
(2, '2023-02-01 00:05:33.825730', '2023-02-01 00:05:33.825730', 'Food', '2023-02-28 00:05:30.000000', '상세내용', '제목2', 'ACTIVE', 1),
(3, '2023-02-01 00:05:33.825730', '2023-02-01 00:05:33.825730', 'Food', '2023-02-28 00:05:30.000000', '상세내용', '제목3', 'ACTIVE', 1),
(4, '2023-02-01 00:05:33.825730', '2023-02-01 00:05:33.825730', 'Food', '2023-05-28 00:05:30.000000', '상세내용', '제목4', 'ACTIVE', 1),
(5, '2023-02-01 00:05:33.825730', '2023-02-01 00:05:33.825730', 'Food', '2023-05-28 00:05:30.000000', '상세내용', '제목5', 'ACTIVE', 1),
(6, '2023-02-01 00:05:33.825730', '2023-02-01 00:05:33.825730', 'Food', '2023-05-28 00:05:30.000000', '상세내용', '제목6', 'ACTIVE', 1),
(7, '2023-02-01 00:05:33.825730', '2023-02-01 00:05:33.825730', 'Food', '2023-05-28 00:05:30.000000', '상세내용', '제목7', 'ACTIVE', 1),
(8, '2023-02-01 00:05:33.825730', '2023-02-01 00:05:33.825730', 'Food', '2023-05-28 00:05:30.000000', '상세내용', '제목8', 'ACTIVE', 1),
(9, '2023-02-01 00:05:33.825730', '2023-02-01 00:05:33.825730', 'Food', '2023-05-28 00:05:30.000000', '상세내용', '제목9', 'ACTIVE', 1),
(10, '2023-02-01 00:05:33.825730', '2023-02-01 00:05:33.825730', 'Food', '2023-05-28 00:05:30.000000', '상세내용', '제목10', 'ACTIVE', 1),
(11, '2023-02-01 00:05:33.825730', '2023-02-01 00:05:33.825730', 'Food', '2023-05-28 00:05:30.000000', '상세내용', '제목11', 'ACTIVE', 3),
(12, '2023-02-01 00:05:33.825730', '2023-02-01 00:05:33.825730', 'Food', '2023-05-28 00:05:30.000000', '상세내용', '제목12', 'ACTIVE', 4);

INSERT INTO TopicVoteItem(topicVoteItemId, createdAt, last_modified_at, topicVoteItemName, topic_id) VALUES
(1,'2023-01-01 00:05:33.825730','2023-01-01 00:05:33.825730', '투표 게시글 투표 항목1 테스트',1),
(2,'2023-01-01 00:05:33.825730','2023-01-01 00:05:33.825730', '투표 게시글 투표 항목2 테스트',1),
(3,'2023-02-01 00:05:33.825730','2023-02-01 00:05:33.825730', '투표 게시글 투표 항목1 테스트',2),
(4,'2023-02-01 00:05:33.825730','2023-02-01 00:05:33.825730', '투표 게시글 투표 항목2 테스트',2),
(5,'2023-02-01 00:05:33.825730','2023-02-01 00:05:33.825730', '투표 게시글 투표 항목1 테스트',3),
(6,'2023-02-01 00:05:33.825730','2023-02-01 00:05:33.825730', '투표 게시글 투표 항목2 테스트',3),
(7,'2023-02-01 00:05:33.825730','2023-02-01 00:05:33.825730', '투표 게시글 투표 항목1 테스트',4),
(8,'2023-02-01 00:05:33.825730','2023-02-01 00:05:33.825730', '투표 게시글 투표 항목2 테스트',4),
(9,'2023-02-01 00:05:33.825730','2023-02-01 00:05:33.825730', '투표 게시글 투표 항목1 테스트',5),
(10,'2023-02-01 00:05:33.825730','2023-02-01 00:05:33.825730', '투표 게시글 투표 항목2 테스트',5),
(11,'2023-02-01 00:05:33.825730','2023-02-01 00:05:33.825730', '투표 게시글 투표 항목1 테스트',6),
(12,'2023-02-01 00:05:33.825730','2023-02-01 00:05:33.825730', '투표 게시글 투표 항목2 테스트',6),
(13,'2023-02-01 00:05:33.825730','2023-02-01 00:05:33.825730', '투표 게시글 투표 항목1 테스트',7),
(14,'2023-02-01 00:05:33.825730','2023-02-01 00:05:33.825730', '투표 게시글 투표 항목2 테스트',7),
(15,'2023-02-01 00:05:33.825730','2023-02-01 00:05:33.825730', '투표 게시글 투표 항목1 테스트',8),
(16,'2023-02-01 00:05:33.825730','2023-02-01 00:05:33.825730', '투표 게시글 투표 항목2 테스트',8),
(17,'2023-02-01 00:05:33.825730','2023-02-01 00:05:33.825730', '투표 게시글 투표 항목1 테스트',9),
(18,'2023-02-01 00:05:33.825730','2023-02-01 00:05:33.825730', '투표 게시글 투표 항목2 테스트',9),
(19,'2023-02-01 00:05:33.825730','2023-02-01 00:05:33.825730', '투표 게시글 투표 항목1 테스트',10),
(20,'2023-02-01 00:05:33.825730','2023-02-01 00:05:33.825730', '투표 게시글 투표 항목2 테스트',10),
(21,'2023-02-01 00:05:33.825730','2023-02-01 00:05:33.825730', '투표 게시글 투표 항목2 테스트',11),
(22,'2023-02-01 00:05:33.825730','2023-02-01 00:05:33.825730', '투표 게시글 투표 항목2 테스트',11),
(23,'2023-02-01 00:05:33.825730','2023-02-01 00:05:33.825730', '투표 게시글 투표 항목2 테스트',12),
(24,'2023-02-01 00:05:33.825730','2023-02-01 00:05:33.825730', '투표 게시글 투표 항목2 테스트',12);

INSERT INTO TopicVote(topicVoteId, createdAt, last_modified_at, member_id, topic_vote_item_id) VALUE
(1,'2023-01-01 00:05:33.825730','2023-01-01 00:05:33.825730',1,1),
(2,'2023-01-01 00:05:33.825730','2023-01-01 00:05:33.825730',2,1),
(3,'2023-01-01 00:05:33.825730','2023-01-01 00:05:33.825730',3,2);

INSERT INTO Comment(comment_id, createdAt, last_modified_at, commentContent, commentStatus, member_id, topic_id, totalLike) VALUES
(1, '2023-01-03 00:05:33.825730','2023-01-03 00:05:33.825730', '테스트 댓글1', 0, 1, 1, 1),
(2, '2023-02-03 00:05:33.825730','2023-02-03 00:05:33.825730', '테스트 댓글2', 0, 1, 2, 1),
(3, '2023-02-03 00:05:33.825730','2023-02-03 00:05:33.825730', '테스트 댓글3', 0, 1, 3, 1),
(4, '2023-02-03 00:05:33.825730','2023-02-03 00:05:33.825730', '테스트 댓글4', 0, 1, 4, 1),
(5, '2023-02-03 00:05:33.825730','2023-02-03 00:05:33.825730', '테스트 댓글5', 0, 1, 5, 1),
(6, '2023-02-03 00:05:33.825730','2023-02-03 00:05:33.825730', '테스트 댓글6', 0, 1, 6, 1),
(7, '2023-02-03 00:05:33.825730','2023-02-03 00:05:33.825730', '테스트 댓글7', 0, 1, 7, 1),
(8, '2023-02-03 00:05:33.825730','2023-02-03 00:05:33.825730', '테스트 댓글8', 0, 1, 8, 1),
(9, '2023-02-03 00:05:33.825730','2023-02-03 00:05:33.825730', '테스트 댓글9', 0, 1, 9, 1),
(10, '2023-02-03 00:05:33.825730','2023-02-03 00:05:33.825730', '테스트 댓글10', 0, 1, 10, 1),
(11, '2023-02-03 00:05:33.825730','2023-02-03 00:05:33.825730', '테스트 댓글11', 0, 3, 11, 1),
(12, '2023-02-03 00:05:33.825730','2023-02-03 00:05:33.825730', '테스트 댓글12', 0, 4, 12, 1);