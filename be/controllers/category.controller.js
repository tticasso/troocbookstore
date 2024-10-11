const db = require('../models');
const Category = db.category;

async function createCategory(req, res) {
    const { name } = req.body;

    try {
        const newCategory = new Category({
            name,
        });
        await newCategory.save();
        res.status(201).json({ message: 'Category created successfully!', category: newCategory });
    } catch (error) {
        res.status(500).json({ message: 'Error creating category', error });
    }
}

async function listCategories(req, res) {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }
}

async function getCategory(req, res) {
    const { categoryId } = req.params;
    try {
        const category = await Category.findById(categoryId);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching category', error });
    }
}

async function updateCategory(req, res) {
    const { categoryId } = req.params;
    const { name } = req.body;

    try {
        const category = await Category.findById(categoryId);
        if (!category) return res.status(404).json({ message: 'Category not found' });

        if (name) category.name = name;

        await category.save();
        res.status(200).json({ message: 'Category updated successfully', category });
    } catch (error) {
        res.status(500).json({ message: 'Error updating category', error });
    }
}

async function deleteCategory(req, res) {
    const { categoryId } = req.params;
    try {
        const category = await Category.findByIdAndDelete(categoryId);
        if (!category) return res.status(404).json({ message: 'Category not found' });

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error });
    }
}

const categoryController = {
    createCategory, 
    listCategories,
    getCategory,
    updateCategory,
    deleteCategory
};

module.exports = categoryController;
