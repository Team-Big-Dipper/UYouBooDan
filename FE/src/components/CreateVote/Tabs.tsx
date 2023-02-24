import { TabPanel, useTabs } from "react-headless-tabs";
import { TabSelector } from "./TabSelector";
import * as S from './style';

export function Tabs() {
  const [selectedTab, setSelectedTab] = useTabs([
    "글투표",
    "이미지투표",
  ]);

  return (
    <>
      <S.TabNav className="flex border-b border-gray-300">
        <TabSelector
          isActive={selectedTab === "글투표"}
          onClick={() => setSelectedTab("글투표")}
        >
          글투표
        </TabSelector>
        <TabSelector
          isActive={selectedTab === "이미지투표"}
          onClick={() => setSelectedTab("이미지투표")}
        >
          이미지투표
        </TabSelector>
      </S.TabNav>
      <S.TabHr />
      <div className="p-4">
        <TabPanel hidden={selectedTab !== "글투표"}>
          <S.TabWarning>
            질문에 대한 답을 글로 작성해주세요. &nbsp;<span>*</span>&nbsp;최대 6개까지 가능합니다.
          </S.TabWarning>
        </TabPanel>
        <TabPanel hidden={selectedTab !== "이미지투표"}>이미지투표란입니다.</TabPanel>
      </div>
    </>
  );
}