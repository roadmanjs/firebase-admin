import 'reflect-metadata';
import 'dotenv/config';

import {RoadMan, RoadmanBuild} from '@roadmanjs/core';

import chalk from 'chalk';
import {projectId} from './firebase';

/**
 * A firebase roadman
 * @param RoadmanBuild
 */
export const firebaseRoadman: RoadMan = async (args: RoadmanBuild): Promise<RoadmanBuild> => {
    console.log(
        'ROADMAN: Firebase',
        chalk.greenBright(
            '**************************************ProjectID********************',
            projectId
        )
    );
    return args;
};
