import React from 'react';
import { QuestionIcon } from '../../assets/QuestionIcon';

type propTypes = {
  category: string;
  title: string;
  createdAt: number;
  author: string;
  image: string;
  closedAt: number;
  views: number;
  likes: number;
};

const VoteTitle = ({
  category,
  title,
  createdAt,
  author,
  image,
  closedAt,
  views,
  likes,
}: propTypes) => {
  return (
    <div>
      <QuestionIcon />
    </div>
  );
};

export default VoteTitle;
