import { combineEpics } from 'redux-observable';
import { syncOverviewEpic } from './syncOverview.epic';

export const rootEpic = combineEpics(syncOverviewEpic);
