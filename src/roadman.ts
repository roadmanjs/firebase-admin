import {RoadMan, RoadmanBuild} from '@roadmanjs/core';

import MediaResolver from './media/media.resolver';
import chalk from 'chalk';
import {configureFirebase} from './firebase';
import {log} from '@roadmanjs/logs';

/**
 * A firebase roadman
 * @param RoadmanBuild
 */
export const firebaseRoadman: RoadMan = async (args: RoadmanBuild): Promise<RoadmanBuild> => {
    const {projectId} = await configureFirebase();

    log(
        'ROADMAN: Firebase',
        chalk.greenBright(
            '**************************************ProjectID********************',
            projectId
        )
    );

    return args;
};

export const getMediaFileUploadResolvers = () => [MediaResolver];
