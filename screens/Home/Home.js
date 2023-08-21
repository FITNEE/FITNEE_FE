import React, { useCallback, useEffect, useState } from 'react'
import { ScreenLayout } from '../../Shared'
import { styled } from 'styled-components/native'
import { colors } from '../../colors'
import HomeRoutines from '../../components/HomeRoutines'
import NotHomeRoutine from '../../components/NotHomeRoutine'
import { useRecoilState, useRecoilValue } from 'recoil'
import { TabBarAtom, IsDarkAtom } from '../../recoil/MyPageAtom'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import axios from 'axios'
import Logo from '../../assets/SVGs/Logo.svg'

const Top = styled.View`
    width: 100%;
    padding: 10px 24px;
    flex-direction: row;
    justify-content: space-between;
`
const Home = ({ navigation }) => {
    const isFocus = useIsFocused()
    const [isTabVisible, setIsTabVisible] = useRecoilState(TabBarAtom)
    const [data, setData] = useState('')
    const isDark = useRecoilValue(IsDarkAtom)

    useEffect(() => {
        isFocus && setIsTabVisible(true)
    }, [isFocus])

    const fetchData = async () => {
        try {
            const response = await axios.get('https://gpthealth.shop/app/routine/today')
            console.log('Response : ', response.data)
            setData(response.data)
        } catch (error) {
            console.error('Error:', error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    useFocusEffect(
        useCallback(() => {
            fetchData()
        }, []),
    )
    return (
        <ScreenLayout isDark={isDark} darkBack={colors.black} lightBack={colors.grey_1}>
            <Top>
                <Logo width={88} color={isDark ? colors.white : colors.black} />
                {/* <Premium /> */}
            </Top>
            {data.isSuccess ? <HomeRoutines isDark={isDark} data={data.result} /> : <NotHomeRoutine isDark={isDark} />}
        </ScreenLayout>
    )
}
export default Home
