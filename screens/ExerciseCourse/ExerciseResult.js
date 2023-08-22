import React, { useRef, useState, useEffect } from 'react'
import { SafeAreaView, View, Text, Button, TouchableOpacity, Alert, Share, Platform } from 'react-native'
import styled from 'styled-components/native'
import { format } from 'date-fns'
import { ScrollView } from 'react-native-gesture-handler'
import { colors } from '../../colors'
import ViewShot from 'react-native-view-shot'
import { useRecoilValue } from 'recoil'
import { IsDarkAtom } from '../../recoil/MyPageAtom'
import ShareIcon from '../../assets/SVGs/Share.svg'
import ExerciseIcon from '../../assets/SVGs/Exercise.svg'
import UpdateExercise from '../../components/exerciseCourse/UpdateExercise'
import axios from 'axios'
import { useRoute, StackActions } from '@react-navigation/native'
//import Share from "react-native-share";

const TextBox = styled.View`
  align-items: baseline;
  gap: 8px;
  left: 24px;
  height: 96px;
  width: 375px;
`

const HomeView = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  bottom: 24px;
`

const HomeButton = styled.TouchableOpacity`
  width: 327px;
  height: 52px;
  border-radius: 12px;
  justify-content: center;
  background: ${colors.l_main};
  margin-top: 191px;
`

const JustText = styled.Text`
  color: ${colors.l_main};
  font-size: 13px;
  font-family: Pretendard-Regular;
  line-height: 19.5px;
  margin: 16px 0px 94px 0px;
`

const BlankBox = styled.View`
  margin-top: 132px;
`

const TitleText = styled.Text`
  color: ${colors.black};
  font-size: 17px;
  font-family: Pretendard-Medium;
  line-height: 25.5px;
`

const ContentText = styled.Text`
  color: ${colors.grey_6};
  font-size: 13px;
  font-family: Pretendard-Regular;
  line-height: 19.5px;
`

const ResultBox = styled.View`
  height: 94px;
  width: 298px;
  margin-bottom: 32px;
`

const ShareIconView = styled.TouchableOpacity`
  position: absolute;
  top: 60px;
  right: 24px;
`

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ DarkMode }) => (DarkMode ? colors.grey_9 : colors.grey_1)};
`

const ExerciseText = styled.Text`
  font-family: Pretendard-SemiBold;
  font-size: 24px;
  line-height: 33.6px;
  color: ${({ DarkMode }) => (DarkMode ? colors.white : colors.black)};
`

const ExerciseExplainText = styled.Text`
  color: ${({ DarkMode }) => (DarkMode ? colors.white : colors.black)};
  font-size: 13px;
  font-family: Pretendard-Regular;
  line-height: 19.5px;
`

const ButtonText = styled.Text`
  color: ${({ DarkMode }) => (DarkMode ? colors.black : colors.white)};
  text-align: center;
  font-size: 17px;
  font-family: Pretendard-SemiBold;
`

const JustCircle = styled.View`
  border-radius: 120px;
  width: 201px;
  height: 201px;
  background-color: ${({ DarkMode }) => (DarkMode ? colors.black : colors.white)};
  margin-top: 64px;
`

const ExerciseIconCircle = styled.View`
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 100px;
  background-color: ${({ DarkMode }) => (DarkMode ? colors.d_sub_3 : colors.l_sub_2)};
`

const CarImage = styled.Image`
  width: 184px;
  height: 184px;
  aspect-ratio: 1;
  margin-left: 6px;
  margin-top: 5px;
`

export default function ExerciseResult({ navigation }) {
  const isDark = useRecoilValue(IsDarkAtom)

  let Week = new Array('일', '월', '화', '수', '목', '금', '토')

  const now = new Date()
  const day = Week[now.getDay()]
  let formatDate = format(now, 'yyyy. MM. dd')

  const goToHome = () => {
    const replaceAction = StackActions.replace('HomeNav')
    navigation.dispatch(replaceAction)
  }

  const ref = useRef()
  const [captureUri, setCaptureUri] = useState(null)
  const [sharing, setSharing] = useState(false) // 공유 진행 중 여부를 상태로 관리
  const [update, setUpdate] = useState(null)

  // useEffect(() => {
  //   // on mount
  //   const fileName = "Your-File-Name.jpg";
  //   const path =
  //     Platform.OS === "android"
  //       ? `${RNFS.DocumentDirectoryPath}/${fileName}`
  //       : `${RNFS.LibraryDirectoryPath}/${fileName}`;
  //   const options = {
  //     format: "jpg",
  //     quality: 0.9,
  //     path,
  //   };
  //   ref.current
  //     .capture(options)
  //     .then((uri) => {
  //       console.log("do something with ", uri);
  //       setCaptureUri(uri); // 캡쳐가 완료되면 uri를 상태로 설정
  //     })
  //     .catch((error) => console.error("Error with capture: ", error));
  // }, []);

  useEffect(() => {
    // on mount
    ref.current.capture().then((uri) => {
      console.log('do something with ', uri)
      setCaptureUri(uri) // 캡쳐가 완료되면 uri를 상태로 설정
    })
  }, [])

  const onShare = async () => {
    try {
      if (!captureUri || sharing) {
        // 캡쳐가 완료되지 않았거나 공유 중인 경우 예외 처리
        return
      }
      setSharing(true) // 공유 시작 시 상태를 true로 설정
      const result = await Share.share({
        message: '운동 역량 분석 결과',
        url: Platform.OS === 'ios' ? `file://${captureUri}` : captureUri,
      })
      setSharing(false) // 공유 완료 시 상태를 false로 설정

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      setSharing(false) // 공유 중 오류가 발생해도 상태를 false로 설정
      Alert.alert(error.message)
    }
  }

  const fetchData = async () => {
    try {
      const response = await axios.get('https://gpthealth.shop/app/routine/end/update')
      console.log('response.data : ', response.data)
      setUpdate(response.data.result)
    } catch (error) {
      console.error('Error :', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [update])

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDark ? colors.grey_9 : colors.grey_1,
      }}
    >
      <ScrollView>
        <ViewShot ref={ref} options={{ fileName: 'Your-File-Name', format: 'jpg', quality: 0.9 }}>
          <Container DarkMode={isDark}>
            <BlankBox />
            <TextBox>
              <ExerciseText DarkMode={isDark}>소형차 한 대 만큼의 {'\n'}무게를 들어올렸어요</ExerciseText>
              <ExerciseExplainText DarkMode={isDark}>
                {formatDate} ({day})에 분석된 운동 역량 분석 결과입니다.
              </ExerciseExplainText>
            </TextBox>

            <JustCircle DarkMode={isDark}>
              <CarImage source={require('../../assets/Imgs/car.png')} />
            </JustCircle>
            <JustText>3300kg</JustText>

            <TextBox>
              <ExerciseText DarkMode={isDark}>성장속도가 빠른 {'\n'}야망 헬린이</ExerciseText>
            </TextBox>
            {update ? (
              <>
                <TextBox>
                  <ExerciseText DarkMode={isDark}>다음 운동부터 {'\n'}업데이트 되는 부분이에요</ExerciseText>
                </TextBox>
                {update.map((item) => (
                  <UpdateExercise item={item} />
                ))}
              </>
            ) : null}

            {/* <ResultBox>
              <ExerciseIconCircle DarkMode={isDark}>
                <ExerciseIcon width={20} height={20} color={colors.l_main} />
              </ExerciseIconCircle>
            </ResultBox> */}
          </Container>
        </ViewShot>
        <HomeView>
          <HomeButton onPress={goToHome}>
            <ButtonText DarkMode={isDark}>확인했어요</ButtonText>
          </HomeButton>
        </HomeView>
      </ScrollView>

      <ShareIconView onPress={() => onShare()}>
        <ShareIcon width={24} height={24} color={isDark ? colors.white : colors.black} />
      </ShareIconView>
    </SafeAreaView>
  )
}
