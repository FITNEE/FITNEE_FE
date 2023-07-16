import React, { useState } from 'react';
import styled from 'styled-components/native';
import { colors } from './colors';
import { Button } from './Shared';
import { StyleSheet, Text } from 'react-native';

const ScreenLayout = styled.SafeAreaView`
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  margin-left: 5%;
  flex: 1;
`;
const TextContainer = styled.View`
  margin-top: 124px;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  justify-content: center;
`;
const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.black};
`;

const SubText = styled.Text`
  font-size: 13px;
  margin-top: 8px;
  font-weight: 400;
  color: ${colors.black};
`;
const Input = styled.TextInput`
  padding: 15px 7px;
  border-radius: 4px;
  background-color: white;
  border-radius: 10px;
  width: 100%;
`;

const BottomContainer = styled.View`
  align-items: center;
  width: 100%;
`;
const ORContainer = styled.View`
  width: 120px;
  height: 13px;
`;
const Line = styled.View`
  width: 100%;
  border: ${StyleSheet.hairlineWidth}px solid ${colors.grey_2};
  margin-top: 6px;
`;
const ORText = styled.Text`
  color: ${colors.grey_4};
  font-size: 13px;
  position: absolute;
  background-color: #f3f3f3;
  width: 40px;
  text-align: center;
  left: 40px;
`;
const SNSContainer = styled.View`
  justify-content: space-between;
  flex-direction: row;
  width: 70%;
  margin-top: 28px;
`;
const SNSButton = styled.TouchableOpacity`
  width: 64px;
  background-color: white;
  height: 64px;
`;

const OnBoarding_1 = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const navigateTo2 = () => {
    navigation.navigate('OnBoarding_2', {
      email,
    });
  };
  return (
    <ScreenLayout>
      <TextContainer>
        <Title>이메일을 입력해주세요.</Title>
        <SubText>로그인 또는 회원가입에 필요합니다.</SubText>
      </TextContainer>
      <Input
        placeholderTextColor={colors.grey_3}
        autoFocus
        onSubmitEditing={() => navigateTo2()}
        placeholder='이메일 입력'
        returnKeyType='next'
        blurOnSubmit={false}
        onChangeText={(text) => setEmail(text)}
      />
      <BottomContainer>
        <ORContainer>
          <Line />
          <ORText>또는</ORText>
        </ORContainer>

        <SNSContainer>
          <SNSButton>
            <Text>Google</Text>
          </SNSButton>
          <SNSButton>
            <Text>Kakao</Text>
          </SNSButton>
          <SNSButton>
            <Text>Naver</Text>
          </SNSButton>
        </SNSContainer>
      </BottomContainer>
      <Button
        enabled={email.indexOf('@') != -1}
        onPress={() => navigateTo2()}
      ></Button>
    </ScreenLayout>
  );
};

export default OnBoarding_1;
