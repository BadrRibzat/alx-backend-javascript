const Utils = require('./utils');

function sendPaymentRequestToApi(totalAmount, totalShipping) {
    const result = Utils.calculateNumber('SUM', totalAmount, totalShipping);
    console.log(`The total is: ${result}`);
}
  
module.exports = sendPaymentRequestToApi;
root@429eb2a027da:/alx-backend-javascript/0x06-unittests_in_js# rm 4-payment.js root@429eb2a027da:/alx-backend-javascript/0x06-unittests_in_js# vi 4-payment.js
root@429eb2a027da:/alx-backend-javascript/0x06-unittests_in_js# clear


root@429eb2a027da:/alx-backend-javascript/0x06-unittests_in_js# cat 4-payment.test.js 
const { expect } = require('chai');
const sinon = require('sinon');

const Utils = require('./utils');
const sendPaymentRequestToApi = require('./3-payment');

describe('sendPaymentRequestToApi', () => {
  const consoleSpy = sinon.spy(console, 'log');
  it('validates usage of Utils.calculateNumber', () => {
    // Stub the function always return the same number 10
    const calcNumStub = sinon.stub(Utils, 'calculateNumber').returns(10);
    // run the function with the parameters
    sendPaymentRequestToApi(100, 20);
    // check that the stub is being called with type = SUM, a = 100, and b = 20
    expect(calcNumStub.calledWith('SUM', 100, 20)).to.be.true;
    // check that the stub always return the same number 10
    expect(calcNumStub.alwaysReturned(10)).to.be.true;
    // check with spy that console.log is logging the correct message 
    expect(consoleSpy.calledWith('The total is: 10')).to.be.true;

    calcNumStub.restore();
    consoleSpy.restore();
  });
});

