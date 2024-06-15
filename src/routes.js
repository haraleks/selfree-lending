const express = require('express')
const router = express.Router()
const path = require('path');

router.get('/', (req, res) => {

    res.render('index.ejs');

    res.status(200).end();
});

router.get('/contract-offer', (req, res) => {
    const filePath = path.join(__dirname, '../public/assets/files/contractOffer.pdf');
    res.sendFile(filePath);
});

router.get('/regulation', (req, res) => {
    const filePath = path.join(__dirname, '../public/assets/files/ustav.pdf');
    res.sendFile(filePath);
});

router.get('/regulation-students', (req, res) => {
    const filePath = path.join(__dirname, '../public/assets/files/pravilaVnutrRasporyadka.pdf');
    res.sendFile(filePath);
});

router.get('/regulation-labor', (req, res) => {
    const filePath = path.join(__dirname, '../public/assets/files/pravilaVnutrRasporyadkaRabochih.pdf');
    res.sendFile(filePath);
});

router.get('/students-study-mode', (req, res) => {
    const filePath = path.join(__dirname, '../public/assets/files/rezhimZanatyi.pdf');
    res.sendFile(filePath);
});

router.get('/student-certification', (req, res) => {
    const filePath = path.join(__dirname, '../public/assets/files/formsPeriodicPoryadokUspevaemAttest.pdf');
    res.sendFile(filePath);
});

router.get('/contract-start-pause-end', (req, res) => {
    const filePath = path.join(__dirname, '../public/assets/files/PoryadokRashtorzhenyaPriostanovlVoznikOtnoshenuy.pdf');
    res.sendFile(filePath);
});

router.get('/education-paid', (req, res) => {
    const filePath = path.join(__dirname, '../public/assets/files/moneyStudy.pdf');
    res.sendFile(filePath);
});

// API

router.post('/api/sendForm', (req, res) => {
    const send = require('../api/sendForm');
    const response = send(req.body);

    if(response.status == 'success') {
        res.status(200)
    }

    if(response.status == 'error') {
        res.status(400);
    }

    res.json(response);
});

module.exports = router 