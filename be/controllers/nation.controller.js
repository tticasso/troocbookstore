const db = require('../models');
const nation = db.nation;

async function createnation(req, res) {
    const { name } = req.body;

    try {
        const newnation = new nation({
            name,
        });
        await newnation.save();
        res.status(201).json({ message: 'Nation created successfully!', nation: newnation });
    } catch (error) {
        res.status(500).json({ message: 'Error creating nation', error });
    }
}

async function listnations(req, res) {
    try {
        const categories = await nation.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Nation', error });
    }
}

async function getnation(req, res) {
    const { nationId } = req.params;
    try {
        const searchnation = await nation.findById(nationId);
        if (!searchnation) return res.status(404).json({ message: 'Nation not found' });
        res.status(200).json(searchnation);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching nation', error });
    }
}

async function updatenation(req, res) {
    const { nationId } = req.params;
    const { name } = req.body;

    try {
        const nation = await nation.findById(nationId);
        if (!nation) return res.status(404).json({ message: 'Nation not found' });

        if (name) nation.name = name;

        await nation.save();
        res.status(200).json({ message: 'Nation updated successfully', nation });
    } catch (error) {
        res.status(500).json({ message: 'Error updating nation', error });
    }
}

async function deletenation(req, res) {
    const { nationId } = req.params;
    try {
        const nation = await nation.findByIdAndDelete(nationId);
        if (!nation) return res.status(404).json({ message: 'Nation not found' });

        res.status(200).json({ message: 'Nation deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting nation', error });
    }
}

const nationController = {
    createnation, 
    listnations,
    getnation,
    updatenation,
    deletenation
};

module.exports = nationController;
