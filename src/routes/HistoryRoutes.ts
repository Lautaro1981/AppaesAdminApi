import { Router } from 'express';
import { createHistoryChallenge, getAllHistoryChallenges, createExerciseByChallengeId, getUserHistoryChallenges, getHistoryChallengeQuestions } from '../controllers/HistoryController';

const historyRouter: Router = Router();

historyRouter.post('/create', createHistoryChallenge);                              // http://localhost:8000/api/history/create
historyRouter.get('/challenges', getAllHistoryChallenges);                          // http://localhost:8000/api/history/challenges
historyRouter.post('/create-challenge-question/:id', createExerciseByChallengeId);  // http://localhost:8000/api/history/create-challenge-question/id
historyRouter.get('/challenges/:userId', getUserHistoryChallenges);                        // http://localhost:8000/api/history/challenges/:userId
historyRouter.get('/questions/:challengeId', getHistoryChallengeQuestions);               // http://localhost:8000/api/history/questions/:challengeId

export default historyRouter;
