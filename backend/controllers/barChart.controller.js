const { Data } = require('../models/data.models');

const getBarCharts = async (month) => {
    const priceRanges = [
        { range: "0 - 100", min: 0, max: 100 },
        { range: "101 - 200", min: 101, max: 200 },
        { range: "201 - 300", min: 201, max: 300 },
        { range: "301 - 400", min: 301, max: 400 },
        { range: "401 - 500", min: 401, max: 500 },
        { range: "501 - 600", min: 501, max: 600 },
        { range: "601 - 700", min: 601, max: 700 },
        { range: "701 - 800", min: 701, max: 800 },
        { range: "801 - 900", min: 801, max: 900 },
        { range: "901 - above", min: 901, max: Infinity }
    ];
    const barChartData = await Promise.all(priceRanges.map(async ({ range, min, max }) => {
        const count = await Data.countDocuments({
            month: month,
            price: {
                $gte: min,
                ...(max !== Infinity && { $lte: max })
            }
        });
        return { range, count };
    }));

    return barChartData;
}

const barChart = async (req, res) => {

    try {
        const month = Number(req.query.month) || 1;

        const barChartData = await getBarCharts(month);

        res.status(200).json({
            month: month,
            barChartData: barChartData
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { barChart, getBarCharts };