import React from "react";
import * as style from './style';
import { Fingerprint } from "../../assets/fingerprint";

export const MakeVoteIcon = () => {
  return(
    <style.CreateVoteBtn 
      href="/createvote"
      >
      <Fingerprint />&nbsp;&nbsp;나만의 투표 만들기
    </style.CreateVoteBtn>
  )
}