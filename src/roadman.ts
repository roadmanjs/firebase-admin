import 'dotenv/config';

import * as admin from 'firebase-admin';

import {RoadMan, RoadmanBuild} from '@roadmanjs/core';

import chalk from 'chalk';
import config from './config';

const {project_id} = config;
const auth = admin.auth;
const projectId = project_id;
export {auth, projectId};

/**
 * A firebase roadman
 * @param RoadmanBuild
 */
export const firebaseRoadman: RoadMan = async (args: RoadmanBuild): Promise<RoadmanBuild> => {
    if (!admin.apps.length) {
        console.log(
            'ROADMAN: Firebase',
            chalk.greenBright(
                '**************************************ProjectID********************',
                projectId
            )
        );
        admin.initializeApp({
            credential: admin.credential.cert(config as any),
            databaseURL: `https://${config.project_id}.firebaseio.com`,
        });
    }

    return args;
};
