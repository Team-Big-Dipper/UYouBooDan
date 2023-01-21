type ObjType = {
  [index: string]: string;
  all: string;
  inProgress: string;
  terminate: string;
};

export const conditions: ObjType = {
  all: '전체',
  inProgress: '진행중인투표',
  terminate: '종료된투표',
};
