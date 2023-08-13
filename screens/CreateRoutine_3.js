import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useNavigationState } from "@react-navigation/native";
import CreateRoutineHeader from "../components/CreateRoutineHeader";
import { useRecoilState } from "recoil";
import { CreateRoutineAtom } from "../recoil/CreateRoutineAtom";
import { colors } from "../colors";

export default function CreateRoutine_3({ navigation }) {
  const [select, SetSelect] = useState(false);
  const [allPart, SetAllPart] = useState(false);
  const [routine, setRoutine] = useRecoilState(CreateRoutineAtom);
  const [parts, setParts] = useState([
    { id: 1, name: "가슴", selected: false, ename: "chest" },
    { id: 2, name: "등", selected: false, ename: "back" },
    { id: 3, name: "어깨", selected: false, ename: "shoulder" },
    { id: 4, name: "팔", selected: false, ename: "arm" },
    { id: 5, name: "코어", selected: false, ename: "core" },
    { id: 6, name: "하체", selected: false, ename: "lower body" },
  ]);
  const index = useNavigationState((state) => state.index);
  useEffect(() => {
    navigation.setOptions({
      header: () => <CreateRoutineHeader title="루틴 등록" index={index} />,
    });
  }, []);
  useEffect(() => {
    console.log("atom3 : ", routine);
  }, [routine]);
  const onPartPress = (id) => {
    setParts((prevParts) =>
      prevParts.map((part) =>
        part.id === id ? { ...part, selected: !part.selected } : part
      )
    );
  };
  const nextButton = () => {
    const selectedTargets = parts
      .filter((part) => part.selected)
      .map((part) => part.ename);
    setRoutine((prev) => ({
      ...prev,
      targets: selectedTargets,
    }));
    navigation.push("CreateRoutine_4");
  };
  useEffect(() => {
    SetSelect(
      parts[0].selected ||
        parts[1].selected ||
        parts[2].selected ||
        parts[3].selected ||
        parts[4].selected ||
        parts[5].selected
    );
    SetAllPart(
      parts[0].selected &&
        parts[1].selected &&
        parts[2].selected &&
        parts[3].selected &&
        parts[4].selected &&
        parts[5].selected
    );
  }, [parts]);
  const AllPartPress = () => {
    SetAllPart(!allPart);
    setParts((prevParts) =>
      prevParts.map((part) =>
        !allPart ? { ...part, selected: true } : { ...part, selected: false }
      )
    );
  };

  return (
    <Container>
      <TitleContainer>
        <Title>{`운동할 부위를
모두 선택하세요`}</Title>
      </TitleContainer>
      <PartContainer>
        {parts.map((part) => (
          <PartItem
            key={part.id}
            onPress={() => onPartPress(part.id)}
            style={{
              backgroundColor: allPart
                ? colors.l_sub_2
                : part.selected
                ? colors.l_main
                : colors.white,
              borderWidth: 1, // borderColor를 덮어쓰는 방법으로 borderWidth를 설정해줍니다.
              borderColor: allPart
                ? colors.l_main
                : part.selected
                ? colors.l_main
                : colors.white,
            }}
          >
            <PartImage />
            <PartName
              style={{
                color: allPart
                  ? colors.l_main
                  : part.selected
                  ? colors.white
                  : colors.black,
              }}
            >
              {part.name}
            </PartName>
          </PartItem>
        ))}
      </PartContainer>
      <AllButton isActive={allPart} onPress={AllPartPress}>
        <AllText isActive={allPart}>모든 부위를 운동할래요</AllText>
      </AllButton>
      <NextButton isActive={select} disabled={!select} onPress={nextButton}>
        <ButtonText isActive={select}>다음</ButtonText>
      </NextButton>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
`;

const TitleContainer = styled.View`
  width: 90%;
  margin-bottom: 10px;
  margin-top: 30px;
`;
const Title = styled.Text`
  font-size: 25px;
  font-weight: 600;
`;
const PartContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 85%;
`;
const PartItem = styled.TouchableOpacity`
  width: 101px;
  height: 124px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;
const PartImage = styled.Image`
  width: 85px;
  height: 85px;
  background-color: #bfbfbf;
  border-radius: 300px;
`;
const PartName = styled.Text`
  font-size: 15px;
  margin-top: 10px;
`;
const AllButton = styled.TouchableOpacity`
  width: 147px;
  height: 40px;
  background-color: ${(props) =>
    props.isActive ? colors.l_sub_2 : colors.grey_3};
  margin-bottom: 120px;
  border-radius: 100px;
  align-items: center;
  justify-content: center;
  border: 1px;
  border-color: ${(props) => (props.isActive ? colors.l_main : colors.l_sub_2)};
`;
const AllText = styled.Text`
  font-size: 13px;
  font-weight: bold;
  color: ${(props) => (props.isActive ? colors.l_main : colors.black)};
`;
const NextButton = styled.TouchableOpacity`
  width: 327px;
  height: 52px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.isActive ? colors.l_main : colors.grey_3};
  border-radius: 10px;
`;
const ButtonText = styled.Text`
  color: ${(props) => (props.isActive ? colors.white : colors.black)};
`;
