import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { styled } from 'styled-components';
import Wrapper from '../Styles/CommonStyles';
import MonthDropdown from './MonthDropdown';
import { fetchBarData } from '../store/slices/barchartSlice'
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
`;

const Align = styled.div`
    display: flex;
    justify-content: center;
    padding: 2rem 0;
`;

export default function Barchart() {
    const [month, setMonth] = useState(1);
    const dispatch = useDispatch();
    const { barChartData } = useSelector((stats) => stats.barchart)

    console.log(barChartData);

    useEffect(() => {
        dispatch(fetchBarData({ month: month }))
    }, [month])

    return (
        <Wrapper>
            <h1> Bar Chart Stats</h1>
            <Align>
                <MonthDropdown month={month} setMonth={setMonth} />
            </Align>
            <Div>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        data={barChartData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#8884d8" />
                        <Bar dataKey="uv" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </Div>
        </Wrapper>
    );
}
