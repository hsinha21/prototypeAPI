const express = require('express');
const Designation = require('../models/designationModel');
const routes = express.Router();
const shortId = require('shortid');
const TeamEstimation = require('../models/teamEstimationModel');
const request = require('request');

//Api for adding designations to database
routes.get('/addDesignationToDb', (req, res) => {
    let data = [
        {
            designation: 'Director (UAE)',
            rph: 1500
        },
        {
            designation: 'Associate Director (UAE)',
            rph: 1400
        },
        {
            designation: 'Principal Consultant (UAE)',
            rph: 1300
        },
        {
            designation: 'Senior Consultant (UAE)',
            rph: 1200
        },
        {
            designation: 'Consultant (UAE)',
            rph: 1100
        },
        {
            designation: 'Trainee/Intern (UAE)',
            rph: 1000
        },
        {
            designation: 'Director (BLR)',
            rph: 900
        },
        {
            designation: 'Associate Director (BLR)',
            rph: 800
        },
        {
            designation: 'Principal Consultant (BLR)',
            rph: 700
        },
        {
            designation: 'Senior Consultant (BLR)',
            rph: 600
        },
        {
            designation: 'Consultant (BLR)',
            rph: 500
        },
        {
            designation: 'Trainee/Intern (BLR)',
            rph: 400
        },
    ]

    let count = 0;

    for (let i = 0; i < data.length; i++) {
        let newDesignation = new Designation({
            designationId: shortId.generate(),
            designationName: data[i].designation,
            rph: data[i].rph
        })
        newDesignation.save((error, savedDes) => {
            if (error) console.log(error);
            else {
                count++;
                if (count === data.length) {
                    res.json({ success: true, msg: 'All designation saved Successfullly' })
                }
            }
        })

    }
})

routes.get('/getAllDesignation', (req, res) => {
    Designation.find((error, allDes) => {
        if (error) {
            console.log(error);
            res.json({ success: true, msg: 'Error occured while getting designations' });
        }
        else {
            res.json({ success: true, data: allDes, msg: 'All Designatons fetched' });
        }
    })
})

routes.post('/saveCoreTeamEstimation', (req, res) => {
    console.log(req.body);

    let newTeamEstimation = TeamEstimation({
        entryId: shortId.generate(),
        designation: req.body.designation,
        resourceName: req.body.resourceName,
        rhpDesired: req.body.rhpDesired,
        rhpDiscounted: req.body.rhpDiscounted,
        totalHours: req.body.totalHours,
        reqPeriod: req.body.reqPeriod,
        avgHours: req.body.avgHours,
        resourceCostDesired: req.body.resourceCostDesired,
        resourceCostDiscounted: req.body.resourceCostDiscounted,
        createdBy: req.body.creator,
        createdDate: new Date(),
        dateTimeStamp: Date.now()
    })

    newTeamEstimation.save((error, teamEstSaved) => {
        if (error) {
            console.log(error);
            res.json({ success: false, msg: 'Failed to save Team Estimation' });
        } else {
            res.json({ success: true, msg: 'Successfully saved Team Estimation' });
        }

    })
})

routes.get('/getAllTeamEstimation', (req, res) => {
    TeamEstimation.find((error, result) => {
        if (error) {
            console.log(error);
            res.json({ success: false, msg: 'Error while getting Team Estimation' })
        } else if (result.length > 0) {

            request('https://openexchangerates.org/api/latest.json?app_id=afcc9a57ac8a42f98e748e0ef2979966', function (error, response, body) {
                if (error) console.log('error:', error); // Print the error if one occurred
                // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                // console.log('body:', body); // Print the HTML for the Google homepage.
                else {
                    let AEDRate = JSON.parse(body)
                    res.json({ success: true, AEDRate: AEDRate.rates.AED, data: result, msg: 'All Team Estimation found Successfully' })
                }

            });
        } else {
            res.json({ success: true, data: result, msg: 'No data Available' })
        }
    })
})

module.exports = routes;