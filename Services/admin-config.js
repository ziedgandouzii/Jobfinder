import AdminJS from 'adminjs';
const AdminJSMongoose = require('@adminjs/mongoose');
const express = require('express');
const mongoose = require('mongoose');

AdminJS.registerAdapter(AdminJSMongoose);

const adminJsOptions = {
    resources: [/* Add your resources here */],
    rootPath: '/admin',
};

const adminJs = new AdminJS(adminJsOptions);

const router = AdminJS.expressRouter(adminJs);

module.exports = {
    router,
    path: '/admin',
    before: [],
    database: mongoose,
};
