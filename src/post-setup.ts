/*
 * 🦆 node-pm-cache: GitHub action to cache Yarn, NPM, and PNPM cache directories!
 * Copyright (c) 2022 Noel <cutie@floofy.dev>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { saveCache } from '@actions/cache';
import * as core from '@actions/core';

const main = async () => {
  if (core.getState('cache-hit') && core.getState('node-modules-cache-hit')) {
    core.info('No need to save cache.');
    return;
  }
  core.info('Saving package manager and node-modules cache...');
  
  const primaryKey = core.getState('nodepm:cachePrimaryKey');
  core.info(`primary key => ${primaryKey}`);

  const nmPrimaryKey = core.getState('nodepm:nmPrimaryKey');
  core.info(`nm primary key => ${nmPrimaryKey}`);

  if (!core.getState('cache-hit')) await saveCache([result.stdout.trim()], primaryKey);
  if (!core.getState('node-modules-cache-hit')) await saveCache([nodeModulesDir], nmPrimaryKey);

  core.info('done!');
};

main().catch((ex) => core.setFailed(ex));
