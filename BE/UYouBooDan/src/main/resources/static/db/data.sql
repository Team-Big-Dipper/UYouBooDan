
INSERT INTO Member(memberId, createdAt, last_modified_at, email, memberStatus, name, password, photo) VALUES
(1, '2023-01-01 00:05:33.825730', '2023-01-01 00:05:33.825730', 'asdf1234@gmail.com', 'MEMBER_ACTIVE', '헤이즐넛', '{bcrypt}$2a$10$ps7EXP6V8pxDB0fgsBvbduRzcnHO5sD32FtFQ7tzBfcztBWSRTFIO', 'https://scontent-gmp1-1.xx.fbcdn.net/v/t1.18169-9/527016_499021583525593_732357164_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=CdbnqyyFWXkAX_obHCp&_nc_ht=scontent-gmp1-1.xx&oh=00_AfDBQSsLnCXMKoAPnGFrOeSBgvMp__vgjXLEqmtS6etfcw&oe=63F1DB6A'),
(2, '2023-02-01 00:05:33.825730', '2023-02-01 00:05:33.825730', 'nyong9221@naver.com', 'MEMBER_ACTIVE', '김동진', '{bcrypt}$2a$10$ps7EXP6V8pxDB0fgsBvbduRzcnHO5sD32FtFQ7tzBfcztBWSRTFIO', 'https://scontent-gmp1-1.xx.fbcdn.net/v/t1.18169-9/527016_499021583525593_732357164_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=CdbnqyyFWXkAX_obHCp&_nc_ht=scontent-gmp1-1.xx&oh=00_AfDBQSsLnCXMKoAPnGFrOeSBgvMp__vgjXLEqmtS6etfcw&oe=63F1DB6A'),
(3, '2023-02-03 00:05:33.825730', '2023-02-03 00:05:33.825730', 'rlgywnd@naver.com', 'MEMBER_ACTIVE', '김효중', '{bcrypt}$2a$10$ps7EXP6V8pxDB0fgsBvbduRzcnHO5sD32FtFQ7tzBfcztBWSRTFIO', 'https://scontent-gmp1-1.xx.fbcdn.net/v/t1.18169-9/527016_499021583525593_732357164_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=CdbnqyyFWXkAX_obHCp&_nc_ht=scontent-gmp1-1.xx&oh=00_AfDBQSsLnCXMKoAPnGFrOeSBgvMp__vgjXLEqmtS6etfcw&oe=63F1DB6A');

INSERT INTO member_roles(Member_memberId,roles) values
(1,'USER'),
(2,'USER'),
(3,'USER');