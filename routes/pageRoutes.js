const express = require('express');
const router = express.Router();
const path = require('path');

const sendHtml = (res, filename) => {
    res.sendFile(path.join(__dirname, '../', filename));
};

router.get('/', (req, res) => sendHtml(res, 'index.html'));
router.get('/index.html', (req, res) => sendHtml(res, 'index.html'));

router.get('/about.html', (req, res) => sendHtml(res, 'about.html'));
router.get('/contact.html', (req, res) => sendHtml(res, 'contact.html'));
router.get('/cart.html', (req, res) => sendHtml(res, 'cart.html'));
router.get('/shop.html', (req, res) => sendHtml(res, 'shop.html'));
router.get('/product.html', (req, res) => sendHtml(res, 'product.html'));
router.get('/profile.html', (req, res) => sendHtml(res, 'profile.html'));
router.get('/weather.html', (req, res) => sendHtml(res, 'weather.html'));
router.get('/admin.html', (req, res) => sendHtml(res, 'admin.html'));

module.exports = router;