const { Data } = require('../models/data.models');

const getPieChart = async (month) => {
    return await Data.aggregate([
        { $match: { month: month } },
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $project: { _id: 0, category: "$_id", count: 1 } }
    ]);
}

const pieChart = async (req, res) => {
    const month = Number(req.query.month) || 1;

    try {
        const pieChartData = await getPieChart(month);

        res.status(200).json({
            month: month,
            pieChartData: pieChartData
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { pieChart, getPieChart };