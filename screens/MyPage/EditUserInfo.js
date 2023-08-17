import React, { useEffect, useState } from "react";
import {
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import { styled } from "styled-components/native";
import { colors } from "../../colors";
import axios from "axios";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import Left from "../../assets/SVGs/Left.svg";
import { Alert } from "react-native";
import { useRecoilValue } from "recoil";
import { IsDarkAtom } from "../../recoil/MyPageAtom";

const Container = styled.View`
  background-color: ${({ DarkMode }) =>
    DarkMode ? colors.grey_9 : colors.white};
  height: 100%;
  padding: 0px 24px;
  align-items: center;
`;
const Profile = styled.View`
  align-items: center;
  margin-top: 35px;
  margin-bottom: 32px;
`;
const ProfileImage = styled.TouchableOpacity`
  width: 88px;
  height: 88px;
  background-color: ${colors.grey_2};
  border-radius: 88px;
`;
const InputRed = styled.View`
  width: 240px;
  height: 48px;
  border-radius: 8px;
  margin-bottom: 3px;
  border: 1px;
  border-color: ${({ DarkMode, check, error }) =>
    check
      ? error
        ? colors.red
        : colors.green
      : DarkMode
      ? colors.black
      : colors.grey_2};
`;
const InputBlock = styled.TextInput`
  width: 238px;
  background-color: ${({ DarkMode }) =>
    DarkMode ? colors.black : colors.grey_1};
  color: ${({ DarkMode }) => (DarkMode ? colors.white : colors.black)};
  padding: 0px 16px;
  height: 46px;
  border-radius: 8px;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
`;

const InputContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;

export default function EditUserInfo({ navigation }) {
  const isDark = useRecoilValue(IsDarkAtom);
  const StatusText = styled.Text`
    margin-left: 40px;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: 16.5px;
    width: 100%;
    margin-bottom: 20px;
    margin-right: 8px;
    font-weight: 300;
    color: ${({ check, error }) =>
      check
        ? error
          ? colors.red
          : colors.green
        : isDark
        ? colors.grey_8
        : colors.grey_2};
  `;
  const CheckButton = styled.TouchableOpacity`
    width: 79px;
    height: 48px;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    border: 1px solid ${isDark ? colors.d_main : colors.l_main};
    margin-left: 8px;
  `;
  const CheckButtonText = styled.Text`
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: 22.5px;
    color: ${isDark ? colors.d_main : colors.l_main};
  `;

  const [check, setCheck] = useState(false);
  const [error, setError] = useState(true);
  const [userInfo, setUserInfo] = useState([
    {
      birthYear: "",
      userId: "",
      userNickname: "",
      gender: "",
    },
  ]);

  const getUserInfoData = async () => {
    try {
      let url = "https://gpthealth.shop/";
      let detailAPI = `app/mypage/userinfo`;
      const response = await axios.get(url + detailAPI);
      const result = response.data;
      return result;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    getUserInfoData().then((result) => {
      setUserInfo(result.result);
    });
  }, []);

  const getUserName = userInfo[0].userNickname;
  const getGender = userInfo[0].gender;

  const [newNickname, setNewNickname] = useState(getUserName);

  const checkOnlyOneNickName = async (newNickname) => {
    try {
      let url = "https://gpthealth.shop/";
      let detailAPI = `app/mypage/nickname?userNickName=${newNickname}`;
      const response = await axios.get(url + detailAPI, {
        userNickName: newNickname,
      });
      const checkResult = response.data;
      return checkResult;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  const updateUserInfo = async (newNickname) => {
    try {
      let url = "https://gpthealth.shop/";
      let detailAPI = `app/mypage/updateuser`;
      const response = await axios.put(url + detailAPI, {
        userNickname: newNickname,
      });
      const updateResult = response.data;
      return updateResult;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const change = () => {
    checkOnlyOneNickName(newNickname).then((checkResult) => {
      if (newNickname == "") {
        alert("변경할 닉네임을 입력해주세요");
      } else {
        setCheck(true);
        checkResult.result
          ? setError(true)
          : setError(false) & Keyboard.dismiss();
        checkResult.result ? setEnabled(false) : setEnabled(true);
      }
    });
  };

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            Alert.alert("변경 사항을 폐기하시겠습니까?", "", [
              {
                text: "계속 편집하기",
                style: "cancel",
              },
              {
                text: "변경사항 폐기",
                style: "destructive",
                onPress: () => navigation.goBack(),
              },
            ]);
          }}
        >
          <Left
            style={{ marginLeft: 24 }}
            width={24}
            height={24}
            color={isDark ? colors.white : colors.black}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          disabled={!enabled}
          onPress={() => {
            !error && updateUserInfo(newNickname);
            navigation.navigate("UserInfo", {
              showToast: true,
              toastMessage: "닉네임이 변경되었습니다.",
            });
          }}
          style={{ marginRight: 24 }}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: 600,
              color: enabled
                ? isDark
                  ? colors.d_main
                  : colors.l_main
                : isDark
                ? colors.grey_7
                : colors.grey_2,
            }}
          >
            저장
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [error, newNickname, enabled]);

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <Container DarkMode={isDark}>
          <Profile>
            <ProfileImage
              style={{ backgroundColor: getGender == 1 ? "blue" : "pink" }}
            ></ProfileImage>
          </Profile>
          <InputContainer>
            <InputRed DarkMode={isDark} error={error} check={check}>
              <InputBlock
                editable
                autoFocus
                onChangeText={(text) => setNewNickname(text)}
                placeholder={getUserName}
                placeholderTextColor={isDark ? colors.grey_8 : colors.grey_6}
                DarkMode={isDark}
              />
            </InputRed>
            <CheckButton enabled onPress={change}>
              <CheckButtonText>중복 확인</CheckButtonText>
            </CheckButton>
          </InputContainer>
          <StatusText error={error} check={check}>
            {check
              ? error
                ? "이미 존재하는 닉네임입니다."
                : "사용 가능한 닉네임입니다."
              : ""}
          </StatusText>
        </Container>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
