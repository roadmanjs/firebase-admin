import {RoadMan, RoadmanBuild} from '@roadmanjs/core';

import MediaResolver from './media/media.resolver';
// import MediaResolverFastdfs from './media/media.resolver.fastdfs';
import chalk from 'chalk';
import {configureFirebase} from './firebase';
// import {isEmpty} from 'lodash';
import {log} from '@roadmanjs/logs';

/**
 * A firebase roadman
 * @param RoadmanBuild
 * TODO mediaRoadman
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

    // const FASTDFS_SERVER = process.env.FASTDFS_SERVER;

    // log(
    //     'ROADMAN: FASTDFS',
    //     isEmpty(FASTDFS_SERVER)
    //         ? chalk.redBright('FASTDFS_SERVER not set')
    //         : chalk.greenBright(
    //               '**************************************FASTDFS********************',
    //               FASTDFS_SERVER
    //           )
    // );

    return args;
};

export const getMediaFileUploadResolvers = () => [MediaResolver];
