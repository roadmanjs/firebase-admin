import {RoadMan, RoadmanBuild} from '@roadmanjs/core';

import chalk from 'chalk';
import {configureFirebase} from './firebase';

/**
 * A firebase roadman
 * @param RoadmanBuild
 */
export const firebaseRoadman: RoadMan = async (args: RoadmanBuild): Promise<RoadmanBuild> => {
    const {projectId} = configureFirebase();

    console.log(
        'ROADMAN: Firebase',
        chalk.greenBright(
            '**************************************ProjectID********************',
            projectId
        )
    );

    return args;
};
