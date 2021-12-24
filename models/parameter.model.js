const mongoose = require('mongoose');

const parameterSchema = new mongoose.Schema({
    moisture: {
        type: Number,
        required: true
    },
    temperature: {
        type: Number,
        required: true
    },
    pressure: {
        type: Number,
        required: true
    },
    altitude: {
        type: Number,
        required: true
    },
    lpg: {
        type: Number,
        required: true
    },
    co: {
        type: Number,
        required: true
    },
    smoke: {
        type: Number,
        required: true
    },
    greenhouse: {
        type: Number,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
    plant: {
        type: String,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    },
    light: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: false
    },
} , { timestamps: true });

const Parameter = mongoose.model('Parameter', parameterSchema);

module.exports = Parameter;