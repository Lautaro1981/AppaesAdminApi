import { Router } from 'express';
import { createMathChallenge, getAllMathChallenges, createExerciseByChallengeId, getUserMathChallenges, getMathChallengeQuestions } from '../controllers/MathController';

const mathRouter: Router = Router();

mathRouter.post('/create', createMathChallenge);                                    // http://localhost:8000/api/math/create
mathRouter.get('/challenges', getAllMathChallenges);                                // http://localhost:8000/api/math/challenges
mathRouter.post('/create-challenge-question/:id', createExerciseByChallengeId);     // http://localhost:8000/api/math/create-challenge-question/id
mathRouter.get('/challenges/:userId', getUserMathChallenges);                       // http://localhost:8000/api/math/challenges/:userId
mathRouter.get('/questions/:challengeId', getMathChallengeQuestions);               // http://localhost:8000/api/math/questions/:challengeId

export default mathRouter;
