import * as admin from 'firebase-admin';

import {AppOptions, app} from 'firebase-admin';

import config from '../config';

interface FirebaseConfig {
    appOptions: AppOptions;
    name?: string;
}

interface FirebaseProject extends app.App {
    projectId: string;
}

export const configureFirebase = async (fbconfig?: FirebaseConfig): Promise<FirebaseProject> => {
    if (fbconfig) {
        const initAndReturn = () => {
            // initialize app
            const app = admin.initializeApp(fbconfig.appOptions, fbconfig.name);
            return {...app, projectId: fbconfig.name};
        };

        // check if app is already initialized, return it
        if (admin.apps.length) {
            const app = admin.apps.find((app) => app.name === fbconfig.name);
            if (app) {
                return {...app, projectId: app.name};
            }
            return initAndReturn();
        }
        return initAndReturn();
    }

    let defaultApp: app.App;

    // default
    if (!admin.apps.length) {
        defaultApp = await admin.initializeApp(config);
        const {project_id} = config;
        const projectId = project_id;
        return {projectId, ...defaultApp};
    }

    defaultApp = admin.apps[0];
    const projectId = defaultApp.options.projectId;
    return {projectId, ...defaultApp};
};
