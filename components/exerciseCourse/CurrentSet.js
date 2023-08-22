import React from 'react'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { useRecoilValue } from 'recoil'
import { IsDarkAtom } from '../../recoil/MyPageAtom'
import Check_disabled from '../../assets/SVGs/Check_Disabled.svg'

const Box1 = styled.View`
  width: 130px;
  flex-direction: row;
  align-items: baseline;
  height: 32px;
  padding-top: 3px;
`

const Box2 = styled.View`
  width: 84px;
  flex-direction: row;
  align-items: baseline;
  height: 32px;
  padding-top: 3px;
`

const Box3 = styled.View`
  width: 49px;
  flex-direction: row;
  align-items: baseline;
  height: 32px;
  padding-top: 3px;
`

const Container = styled.View`
  width: 327px;
  height: 56px;
  border-radius: 12px;
  flex-direction: row;
  align-items: center;
  background: ${({ isDark }) => (isDark ? colors.grey_8 : colors.grey_1)};
  justify-content: space-between;
  margin-bottom: 8px;
  padding: 24px;
`

const CurrentText = styled.Text`
  color: ${({ isDark }) => (isDark ? colors.white : colors.black)};
  font-size: 20px;
  font-family: Pretendard-SemiBold;
  line-height: 32px;
`

const CurrentUnit = styled.Text`
  color: ${({ isDark }) => (isDark ? colors.white : colors.black)};
  font-size: 15px;
  font-family: Pretendard-SemiBold;
`

const Container2 = styled.View`
  width: 249px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 24px 12px 24px 12px;
`

const CurrentText2 = styled.Text`
  font-size: 15px;
  font-family: Pretendard-SemiBold;
  line-height: 32px;
  color: ${colors.grey_7};
`

export default function CurrentSet({ set, kg, num }) {
  const isDark = useRecoilValue(IsDarkAtom)

  return (
    <Container isDark={isDark}>
      <Box1>
        <CurrentText isDark={isDark}>{set}</CurrentText>

        <CurrentUnit isDark={isDark}>세트</CurrentUnit>
      </Box1>

      <Box2>
        {kg !== 'null' ? (
          <CurrentText isDark={isDark}>{kg}</CurrentText>
        ) : (
          <CurrentText2 isDark={isDark}>빈 봉</CurrentText2>
        )}
        {kg !== 'null' ? <CurrentUnit isDark={isDark}>kg</CurrentUnit> : null}
      </Box2>

      <Box3>
        <CurrentText isDark={isDark}>{num}</CurrentText>
        <CurrentUnit isDark={isDark}>회</CurrentUnit>
      </Box3>
      <Check_disabled width={24} height={24} />
    </Container>
  )
}
