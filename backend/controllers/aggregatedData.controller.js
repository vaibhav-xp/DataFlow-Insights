const { getBarCharts } = require("./barChart.controller");
const { getStats } = require("./stats.controller");

const aggregatedData = async (req, res) => {
    try {
        const month = Number(req.query.month) || 1;
        const statisticsPromise = getStats(month);
        const barChartDataPromise = getBarCharts(month);
        const pieChartDataPromise = getBarCharts(month);


        const [statisticsData, barChartData, pieChartData] = await Promise.all([
            statisticsPromise,
            barChartDataPromise,
            pieChartDataPromise
        ]);

        const combinedData = {
            statistics: statisticsData,
            barChartData: barChartData,
            pieChartData: pieChartData
        };

        res.status(200).json(combinedData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = aggregatedData;