import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { styled } from 'styled-components';
import Wrapper from '../Styles/CommonStyles';
import MonthDropdown from './MonthDropdown';
import { fetchPieStats } from '../store/slices/piechartSlice'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Div = styled.div`
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    border-radius: 5px;
    margin: auto;
    width: 500px;
    height: 500px;
`;


const Align = styled.div`
    display: flex;
    justify-content: center;
    padding: 2rem 0;
`;

export default function Piechart() {
    const [month, setMonth] = useState(1);
    const dispatch = useDispatch();
    const { pieChartData } = useSelector((stats) => stats.piechart)

    useEffect(() => {
        dispatch(fetchPieStats({ month: month }))
    }, [month])

    return (
        <Wrapper>
            <h1> Pie Chart Stats</h1>
            <Align>
                <MonthDropdown month={month} setMonth={setMonth} />
            </Align>
            <Div>
                <ResponsiveContainer width="100%" height={500}>
                    <PieChart width={800} height={800}>
                        <Pie data={pieChartData} dataKey="value" cx="50%" cy="50%" outerRadius={110} fill="#8884d8" />
                        <Pie data={pieChartData} dataKey="value" cx="50%" cy="50%" innerRadius={140} outerRadius={170} fill="#4a09e3" label />
                    </PieChart>
                </ResponsiveContainer>
            </Div>

        </Wrapper>
    );
}