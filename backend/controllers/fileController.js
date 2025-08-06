const File = require('../models/File');
const XLSX = require('xlsx');
const fs = require('fs');

exports.uploadFile = async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const file = new File({
        filename: req.file.filename,
        originalname: req.file.originalname,
        uploadedBy: req.userId,
    });

    await file.save();

    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    res.json({ message: 'File uploaded', data: sheetData });
};