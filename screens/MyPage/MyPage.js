import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native";
import { styled } from "styled-components/native";
import Records from "../../components/Records";
import Analysis from "../../components/Analysis";
import { colors } from "../../colors";
import { AppContext } from "../../components/ContextProvider";


export default function MyPage() {
    const { isDark } = useContext(AppContext);

    const [showRecords,SetShowRecords] = useState(true);

    const TOTAL_DATA = [
        {
          id: 1,
          date: '2023-07-04',
          item: [
            {
              exercises: [
                { id: 1, name: "데드리프트", set: 3, weight: 0, dist: 0 },
                { id: 2, name: "덤벨프레스", set: 3, weight: 4, dist: 0 },
                { id: 3, name: "바벨 로우", set: 3, weight: 0, dist: 0 },
                { id: 4, name: "사이드 레터럴 라이즈", set: 10, weight: 0, dist: 0 },
                { id: 5, name: "레그프레스", set: 3, weight: 50, dist: 0 },
                { id: 6, name: "크런치", set: 3, weight: 0, dist: 0 },
              ],
            },
          ],
          calorie: 400
        }
      ];


    const Container = styled.ScrollView`
        background-color: ${ isDark ? colors.d_background : colors.l_background};
    `;
    const Choice = styled.View`
        margin-top: 10px;
        margin-left: 24px;
        flex-direction: row;
        align-items: center;
        gap: 16px;
    `;
    const ChoiceText = styled.Text`
        font-size: 17px;
        font-style: normal;
        font-weight: 600;
        line-height: 25.5px;
        color: ${colors.grey_3};
    `;
    const ChoiceButton = styled.TouchableOpacity`
        height: 26px;
        display: block;
    `;
    const SelectedTextStyle = {
        color: colors.black
    };
    const SelectedBoxStyle = {
        borderBottomWidth: 2,
        border: colors.l_main
    };

    return (
        <SafeAreaView>
            <Container>
                <Choice>
                    <ChoiceButton onPress={() => {SetShowRecords(true);}} style={showRecords&& SelectedBoxStyle}>
                        <ChoiceText
                            style={showRecords&& SelectedTextStyle}
                        >운동 기록</ChoiceText></ChoiceButton>
                    <ChoiceButton onPress={() => {SetShowRecords(false);}} style={!showRecords&& SelectedBoxStyle}>
                        <ChoiceText style={!showRecords&& SelectedTextStyle}>운동 분석 및 현황</ChoiceText></ChoiceButton>
                </Choice>
                {showRecords && <Records/>}
                {!showRecords && <Analysis/>}
            </Container>
        </SafeAreaView>
  );
}