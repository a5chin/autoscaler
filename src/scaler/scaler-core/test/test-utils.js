/* Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License
 */
const sinon = require('sinon');
const fs = require('fs');
const State = require('../state.js');

/**
 * @typedef {import('../../../autoscaler-common/types').AutoscalerSpanner
 * } AutoscalerSpanner
 */


/**
 * Read Spanner params from file
 *
 * @param {Object} [overrideParams]
 * @return {Object}
 */
function createSpannerParameters(overrideParams) {
  return {
    ...JSON.parse(fs.readFileSync('./test/samples/parameters.json').toString()),
    ...overrideParams,
  };
}

/**
 * @return {State} state class stub
 */
function createStubState() {
  const stubState = new State(/** @type {AutoscalerSpanner} */ ({}));
  sinon.stub(stubState, 'get').resolves(0);
  sinon.stub(stubState, 'set').resolves(0);
  sinon.stub(stubState, 'now').value(Date.now());
  return stubState;
}

/**
 * @return {string} downstream message
 */
function createDownstreamMsg() {
  return JSON.parse(fs.readFileSync('./test/samples/downstream-msg.json')
      .toString());
}

module.exports = {
  createSpannerParameters,
  createStubState,
  createDownstreamMsg,
};
