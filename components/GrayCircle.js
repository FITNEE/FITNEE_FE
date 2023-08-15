import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import PercentageCircle from "react-native-progress-circle";
import { styled } from "styled-components/native";
import { colors } from "../colors";
import { useRecoilValue } from "recoil";
import { IsDarkAtom } from "../recoil/MyPageAtom";

const CircleBox = styled.View`
  justify-content: center;
  align-items: center;
`;

const CircleLine = styled.View`
  flex-direction: row;
  height: 20px;
  align-items: flex-end;
`;

export default function GrayCircle({ num, unit, title, bubbleOn, bubbleText }) {
  const isDark = useRecoilValue(IsDarkAtom);

  const RoutineCircle = styled.View`
    width: 80px;
    height: 80px;
    background: ${isDark ? colors.grey_8 : colors.grey_1};
    border-radius: 100%;
    justify-content: center;
    align-items: center;
  `;

  const UnderCircle = styled.Text`
    color: ${isDark ? colors.white : colors.black};
    text-align: center;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: 15px;
    margin-bottom: 31px;
    margin-top: 8px;
  `;

  const CircleText = styled.Text`
    color: ${isDark ? colors.white : colors.black};
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
  `;

  const CircleUnit = styled.Text`
    color: ${isDark ? colors.white : colors.black};
    font-size: 10px;
    font-style: normal;
    font-weight: 600;
  `;

  const Bubble2 = styled.View`
    //position: relative;
    position: absolute;
    background: ${isDark ? colors.white : colors.black};
    width: 60px;
    height: 32px;
    padding: 0px;
    border-radius: 12px;
    z-index: 1;
    align-items: center;
    bottom: 124px;
  `;

  const BubbleArrow2 = styled.View`
    position: relative;
    border-style: solid;
    border-width: 12px 8px 0px;
    border-color: ${isDark ? colors.white : colors.black} transparent;
    display: block;
    width: 0;
    z-index: 1;
    top: 16px;
  `;

  const BubbleText2 = styled.Text`
    color: ${isDark ? colors.black : colors.white};
    font-size: 11px;
    font-weight: 700;
    top: 10px;
  `;

  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (bubbleOn === false) setShouldRender(false);
    // 일정 시간(예: 5초) 후에 렌더링 여부를 false로 변경
    const timer = setTimeout(() => {
      setShouldRender(false);
    }, 5000);

    // 컴포넌트가 언마운트되면 타이머 클리어
    return () => clearTimeout(timer);
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행

  return (
    <CircleBox>
      {shouldRender ? (
        <Bubble2>
          <BubbleText2>{bubbleText}kg</BubbleText2>
          <BubbleArrow2 />
        </Bubble2>
      ) : null}
      <RoutineCircle>
        <CircleLine>
          <CircleText>{num}</CircleText>
          <CircleUnit>{unit}</CircleUnit>
        </CircleLine>
      </RoutineCircle>
      <UnderCircle>{title}</UnderCircle>
    </CircleBox>
  );
}
