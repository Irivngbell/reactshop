import fs from 'fs';
import express from 'express';
const router = express.Router();
import * as commonmark from 'commonmark';

/**
 * @route /api/steps/redux
 * @returns html
 */
router.get('/redux', (req, res) => {
    fs.readFile('markdown/redux-steps.md', 'utf-8', function (err, data) {
        const reader = new commonmark.Parser();
        const writer = new commonmark.HtmlRenderer();

        const parsed = reader.parse(data);

        const result = writer.render(parsed);
        res.send(result);
    });
});

/**
 * @route /api/steps/express
 * @returns html
 */
router.get('/express', (req, res) => {
    fs.readFile('markdown/node-steps.md', 'utf-8', function (err, data) {
        const reader = new commonmark.Parser();
        const writer = new commonmark.HtmlRenderer();

        const parsed = reader.parse(data);

        const result = writer.render(parsed);
        res.send(result);
    });
});

export default router;
