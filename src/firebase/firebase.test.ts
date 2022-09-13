import 'mocha';

import {configureFirebase} from './';
import {expect} from 'chai';

const FIREBASE_CUSTOM_CONFIG = process.env.FIREBASE_CUSTOM_CONFIG || '{}';
const getCustomProjectConfig = () => JSON.parse(FIREBASE_CUSTOM_CONFIG);
const opts = {
    appOptions: getCustomProjectConfig(),
    name: 'crypsey-01',
};

describe('Firebase', () => {
    it('should init firebase default project', async () => {
        const firebaseProject = await configureFirebase();
        const projectId = firebaseProject.projectId;
        console.log('projectId', projectId);
        expect(projectId).to.equal('stqnetwork-dev');
    });

    it('should init firebase custom project', async () => {
        const firebaseProject = await configureFirebase(opts);
        const projectId = firebaseProject.projectId;
        console.log('projectId', projectId);
        expect(projectId).to.equal('crypsey-01');
    });

    it('should init firebase custom project with default project', async () => {
        await configureFirebase(); // init default project.

        // init second project
        const firebaseProject = await configureFirebase(opts);
        const projectId = firebaseProject.projectId;
        console.log('projectId', projectId);
        expect(projectId).to.equal('crypsey-01');
    });

    it('should return existing custom firebase project with default project', async () => {
        await configureFirebase(); // init default project.

        // init second project
        const firebaseProject = await configureFirebase(opts);
        const projectId = firebaseProject.projectId;
        console.log('projectId', projectId);
        expect(projectId).to.equal('crypsey-01');
    });
});
