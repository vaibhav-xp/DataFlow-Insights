const { Data } = require('../models/data.models');

const list = async (req, res) => {
    const month = Number(req.query.month) || null;
    const page = Number(req.query.page) || 1;
    const maxResult = Number(req.query.maxResult) || 10;
    const skip = (page - 1) * maxResult;
    const search = req.query.search;

    const searchQuery = {}

    if (search) {
        searchQuery.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { price: { $regex: search, $options: 'i' } },
            { category: { $regex: search, $options: 'i' } },
        ]
    }

    if (month) {
        searchQuery.month = { $eq: month };
    }

    try {
        let totalItems = await Data.countDocuments(searchQuery);

        const totalPages = Math.ceil(totalItems / maxResult);

        let allData = await Data.find(searchQuery).skip(skip).limit(maxResult);

        res.status(200).json({
            pageInfo: {
                page,
                maxResult,
                totalItems,
                totalPages,
            },
            transactions: allData
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = list;
