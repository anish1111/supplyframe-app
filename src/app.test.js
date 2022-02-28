
const res = require('express/lib/response');
const constructPage = require('./app');

test('check for construction of DOM elements of page', () => {
    const renderString = "<div>";
    const bootstrap = "<script>";
    const finalPage = "<body>";
    const result = 200;

  expect(constructPage(renderString, bootstrap, finalPage)).toBe(result);
});
