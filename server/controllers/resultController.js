const Results = require('../models/Result')

exports.getResult = async (req, res) => {
    try {
        const r = await Results.find();
        res.json(r)
    } catch (error) {
        res.json({ error })
    }
}

exports.storeResult = async (req, res) => {
    try {
        const { username, result, attempts, points, achived } = req.body;
        if (!username && !result) throw new Error('Data Not Provided...!');

        const data = await Results.create({ username, result, attempts, points, achived });
        res.json({ msg: "Result Saved Successfully...!", data });

    } catch (error) {
        res.json({ error })
    }
}

exports.dropResult = async (req, res) => {
    try {
        await Results.deleteMany();
        res.json({ msg: "Result Deleted Successfully...!" })
    } catch (error) {
        res.json({ error })
    }
}