const { Data } = require('../models/data.models');

const getStats = async (month) => {
    let matchStage = { sold: true };

    if (month !== null) {
        matchStage.month = month;
    }

    const totalSaleAmount = await Data.aggregate([
        { $match: matchStage },
        { $group: { _id: null, totalAmount: { $sum: { $toDouble: "$price" } } } }
    ]);

    const totalSoldItems = await Data.countDocuments({ ...matchStage });
    const totalNotSoldItems = await Data.countDocuments({ ...matchStage, sold: false });

    return {
        month: month,
        totalSaleAmount: totalSaleAmount.length ? totalSaleAmount[0].totalAmount : 0,
        totalSoldItems: totalSoldItems,
        totalNotSoldItems: totalNotSoldItems
    };
}

const stats = async (req, res) => {
    const month = Number(req.query.month) || null;
    try {
        const data = await getStats(month);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { stats, getStats };