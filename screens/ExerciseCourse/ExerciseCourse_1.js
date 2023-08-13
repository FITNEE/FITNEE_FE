import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { TextInput, Dimensions, Animated, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");
import styled from "styled-components/native";
import ExerciseCard from "../../components/ExerciseCard";
import ExerciseButton from "../../components/ExerciseButton";
import { colors } from "../../colors";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { FlatList } from "react-native-gesture-handler";
import Indicator from "../../components/Indicator";
import { Alert } from "react-native";
import { useRoute, StackActions } from "@react-navigation/native";
import axios from "axios";
import { monthsInQuarter } from "date-fns";

const ExerciseCircle = styled.View`
  width: 307px;
  height: 307px;
  border-radius: 291px;
  background: ${colors.grey_1};
  margin-bottom: 14px;
  justify-content: center;
  align-items: center;
`;

const TextBox = styled.View`
  width: 327px;
  height: 24px;
  margin: 23px 0px 5px 0px;
`;

const JustText = styled.Text`
  color: ${colors.d_main};
  text-align: center;
  font-size: 15px;
  font-weight: 400;
  line-height: 22.5px;
`;

const BoxList = styled.View`
  height: 120px;
`;

const Container = styled.View`
  width: 327px;
  height: 56px;
  border-radius: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

const CurrentText = styled.Text`
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
`;

const CurrentUnit = styled.Text`
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
`;

const TextLine = styled.View`
  flex-direction: row;
  height: 20px;
  align-items: flex-end;
`;

const Box1 = styled.View`
  width: 94px;
`;

const Box2 = styled.View`
  width: 42px;
`;

const SkipExercrise = styled.TouchableOpacity`
  width: 85px;
  height: 20px;
  position: relative;
  margin-top: 16px;
`;

const SkipExercriseText = styled.Text`
  color: ${colors.grey_8};
  text-align: center;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: 19.5px;
  text-decoration-line: underline;
`;

const StopExercise = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  background-color: black;
  position: absolute;
  top: 20px;
  right: 24px;
`;

export default function ExerciseCourse_1({ navigation }) {
  const goToStartExercise = () => {
    navigation.navigate("StartExercise");
  };

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentId, setCurrentId] = useState(0);
  //const [oneDuration, setOneDuration] = useState(setData[0]?.duration);
  const [key, setKey] = useState(0);
  const flatListRef = useRef();
  const [boxNumber, setBoxNumber] = useState(1);
  const [indicatorNum, setIndicatorNum] = useState(1);
  //시간 재는 용
  const [timeInSeconds, setTimeInSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [totalTime, setTotalTime] = useState(0);

  //data route
  const route = useRoute();
  const dataList = route.params.dataList;
  const listIndex = route.params.listIndex;
  const routineIdx = route.params.routineIdx;
  const realTotalTime = route.params.totalTime;

  let adviceData = dataList[listIndex].exerciseInfo.caution;

  const [exerciseData, setExerciseData] = useState([]);
  const [advice, setAdvice] = useState(adviceData[0]);

  const goToNextExercise = async () => {
    //패치 작업 수행
    // await patchSkipData(
    //   routineIdx,
    //   dataList[listIndex].exerciseInfo.healthCategoryIdx
    // );

    //스킵
    let modifiedDataList = [...dataList];
    modifiedDataList[listIndex] = {
      ...modifiedDataList[listIndex],
      skip: 1,
    };

    if (listIndex + 1 >= dataList.length) {
      //await postTotalTime(routineIdx, totalTime + realTotalTime);

      // 조건이 충족되면 원하는 화면(FinalScreen)으로 이동합니다.
      navigation.dispatch(
        StackActions.replace("CompleteExercise", {
          dataList: modifiedDataList,
          totalTime: realTotalTime,
        })
      );
    } else {
      navigation.dispatch(
        StackActions.replace("ExerciseCourse", {
          dataList: modifiedDataList,
          listIndex: listIndex + 1,
          routineIdx: routineIdx,
          totalTime: realTotalTime,
        })
      );
    }
  };

  const goToCompleteExercise = async () => {
    if (listIndex + 1 >= dataList.length) {
      //await postTotalTime(routineIdx, totalTime);
      // 조건이 충족되면 원하는 화면(FinalScreen)으로 이동합니다.
      navigation.dispatch(
        StackActions.replace("CompleteExercise", {
          dataList: dataList,
          totalTime: totalTime + realTotalTime,
          routineIdx: routineIdx,
        })
      );
    } else {
      navigation.dispatch(
        StackActions.replace("ExerciseCourse_2", {
          dataList: dataList,
          listIndex: listIndex,
          routineIdx: routineIdx,
          totalTime: totalTime + realTotalTime,
        })
      );
    }
  };

  // const patchSkipData = async (routineIdx, healthCategoryIdx) => {
  //   try {
  //     let url = "https://gpthealth.shop/";
  //     let detailAPI = `/app/process?routineIdx=${routineIdx}&healthCategoryIdx=${healthCategoryIdx}`;

  //     const response = await axios.patch(url + detailAPI, {
  //       routineIdx: routineIdx,
  //       healthCategoryIdx: healthCategoryIdx,
  //     });
  //     const result = response.data;
  //     console.log(result);
  //     return result;
  //   } catch (error) {
  //     console.error("Error", error);
  //   }
  // };

  const postTotalData = async (routineIdx, totalTime) => {
    try {
      let url = "https://gpthealth.shop/";
      let detailAPI = `/app/process/end`;

      const response = await axios.post(url + detailAPI, {
        routineIdx: routineIdx,
        totalExerciseTime: totalTime,
      });

      const result = response.data;
      console.log(result);
      return result;
    } catch (error) {
      console.error("Error", error);
    }
  };

  const OpenConfirm = () => {
    Alert.alert(
      "현재 진행중인 운동루틴을 중단하시겠습니까?",
      "현재까지 운동하신 내용은 저장되지 않습니다.",
      [
        { text: "취소", onPress: () => console.log("Cancel Stop") },
        {
          text: "운동 중단하기",
          onPress: goToStartExercise,
          style: "destructive",
        },
      ]
    );
  };

  useEffect(() => {
    const newExerciseData = [
      ...dataList[listIndex].sets,
      {
        set: dataList[listIndex].sets.length,
        rep: 0,
        weight: 0,
      },
    ];
    setExerciseData(newExerciseData);
    console.log(exerciseData);
  }, []);
  // useEffect(() => {
  //   // 타이머가 종료될 때마다 key 값을 변경하여 CountdownCircleTimer 컴포넌트 리셋
  //   setKey((prevKey) => prevKey + 1);
  // }, [oneDuration]);

  // duration을 받아서 카운트다운을 해주는 함수. duration이 바뀌면 리셋된다.
  // const handleComplete = () => {
  //   //i 업데이트
  //   const nextId = i + 1 > setData.length ? setIsPlaying(false) : i + 1;
  //   setI(nextId);

  //   // 해당 id에 해당하는 데이터를 가져와 새로운 duration을 업데이트
  //   const nextData = setData.find((item) => item.id === nextId);
  //   const newDuration = nextData?.duration || 0;
  //   //const newDuration = timeData[nextId]?.duration || 0;

  //   //delay 동안 쉬도록
  //   setIsPlaying(false);
  //   setKey((prevKey) => prevKey + 1); //타이머 리셋
  //   setTimeout(() => {
  //     setIsPlaying(true);
  //     setOneDuration(newDuration);
  //   }, 300);
  // };

  useEffect(() => {
    const interval = setInterval(() => {
      // 다음에 나올 Id를 currentId로 업데이트
      const nextId = currentId + 1 > adviceData.length - 1 ? 0 : currentId + 1;
      setCurrentId(nextId);
      // 해당 id에 해당하는 데이터를 가져와 advice를 업데이트
      // const data = adviceData.find((item) => item.id === nextId);
      setAdvice(adviceData[nextId]);
    }, 3500); // 3.5초마다 데이터를 가져오도록 설정

    return () => clearInterval(interval);
  }, [currentId]);

  const renderItem = ({ item }) => {
    let backgroundColor = "";
    let textColor = "";

    if (item.set === dataList[listIndex].totalSets) {
      backgroundColor = "rgba(0, 0, 0, 0)";
      textColor = "rgba(0, 0, 0, 0)";
    } else {
      backgroundColor =
        item.set + 1 === boxNumber
          ? colors.grey_1
          : "rgba(243, 243, 243, 0.50)";
      textColor =
        item.set + 1 === boxNumber ? colors.black : "rgba(0, 0, 0, 0.50)";
    }

    return (
      <Container style={{ backgroundColor: backgroundColor }}>
        <CurrentText style={{ color: textColor }}>{item.set + 1}</CurrentText>
        <TextLine>
          <CurrentUnit style={{ color: textColor }}>세트</CurrentUnit>
        </TextLine>

        <Box1 />

        {item.weight !== "null" ? (
          <CurrentText style={{ color: textColor }}>{item.weight}</CurrentText>
        ) : null}
        {item.weight !== "null" ? (
          <TextLine>
            <CurrentUnit style={{ color: textColor }}>kg</CurrentUnit>
          </TextLine>
        ) : null}

        <Box2 />

        <CurrentText style={{ color: textColor }}>{item.rep}</CurrentText>
        <TextLine>
          <CurrentUnit style={{ color: textColor }}>회</CurrentUnit>
        </TextLine>
      </Container>
    );
  };

  const scrollBox = () => {
    const next =
      boxNumber + 1 >= dataList.totalSets ? boxNumber : boxNumber + 1;
    const next2 =
      indicatorNum >= dataList.totalSets ? indicatorNum : indicatorNum + 1;
    if (boxNumber === dataList.totalSets - 1) setIsPlaying(false);
    setBoxNumber(next);
    setIndicatorNum(next2);
    setIsTimerRunning(false);

    setTotalTime((prevTotal) => prevTotal + timeInSeconds);
    console.log(timeInSeconds, totalTime);
    setTimeInSeconds(0);

    //delay 동안 쉬도록
    setIsPlaying(false);
    setKey((prevKey) => prevKey + 1); //타이머 리셋
    setIsTimerRunning(true); //타이머 켜기
    setTimeout(() => {
      setIsPlaying(true);
    }, 300);

    this.flatListRef.scrollToIndex({ animated: true, index: boxNumber });
  };

  useEffect(() => {
    let timerId;

    if (isTimerRunning) {
      timerId = setInterval(() => {
        setTimeInSeconds((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [isTimerRunning]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.grey_2 }}>
      <ExerciseCard
        exerciseName={dataList[listIndex].exerciseInfo.exerciseName}
      >
        <StopExercise onPress={() => OpenConfirm()} />
        <ExerciseCircle>
          <CountdownCircleTimer
            key={key}
            isPlaying={isPlaying}
            //duration={oneDuration}
            duration={6}
            colors={colors.l_main}
            size={315}
            strokeWidth={8}
            trailColor={colors.grey_3}
            //onComplete={handleComplete}
            onComplete={() => ({ shouldRepeat: true })}
            updateInterval={0.001}
            isGrowing={true}
            rotation={"counterclockwise"}
          >
            {/* {({ remainingTime }) => <Text>{remainingTime}</Text>} */}
          </CountdownCircleTimer>
        </ExerciseCircle>

        <Indicator
          totalPages={dataList[listIndex].totalSets}
          currentPage={indicatorNum - 1}
        />

        <BoxList>
          <FlatList
            //현재 하고 있는 세트와 다음 세트를 보여주는 리스트
            style={{}}
            initialScrollIndex={0}
            data={exerciseData}
            renderItem={renderItem}
            keyExtractor={(item) => item.set}
            showsVerticalScrollIndicator={false}
            ref={(ref) => {
              this.flatListRef = ref;
            }}
            onEndReached={goToCompleteExercise}
            scrollEnabled={false}
          />
        </BoxList>

        <TextBox>
          <JustText>{advice}</JustText>
        </TextBox>

        <ExerciseButton //세트 완료 버튼
          text="세트 완료"
          disabled={false}
          //onPress={timeToRest}
          onPress={scrollBox}
        />

        <SkipExercrise onPress={goToNextExercise}>
          <SkipExercriseText>이 운동 건너뛰기</SkipExercriseText>
        </SkipExercrise>
      </ExerciseCard>
    </SafeAreaView>
  );
}
