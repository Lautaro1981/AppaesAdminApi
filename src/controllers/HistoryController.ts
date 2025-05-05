import { Request, Response } from 'express';
import History from '../models/History';

export const createHistoryChallenge = async (req: Request, res: Response): Promise<void> => {
  try {
    const { challengeName, challengeType, subjectMatter, time, questionNumber, preStudy, challengeCreatorID } = req.body;

    if (!challengeName || !challengeType || !subjectMatter || !challengeCreatorID) {
      res.status(400).json({ error: 'Faltan datos.' });
      return;
    }

    const preStudyValue = preStudy || '';

    const newChallenge = await History.create({
      challengeName,
      challengeType,
      subjectMatter,
      time,
      questionNumber,
      preStudy: preStudyValue,
      challengeCreatorID
    });

    res.status(201).json(newChallenge);
  } catch (error: any) {
    console.error('Error al crear reto:', error);
    res.status(500).json({ error: 'Hubo un error al crear el reto' });
  }
};

export const createExerciseByChallengeId = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const challenge = await History.findById(id);
    if (!challenge) {
      res.status(404).json({ message: 'Ejercicio no encontrado' });
      return;
    }

    const data = req.body;

    if (!data.question || !data.rightAnswer || !data.fake1 || !data.fake2 || !data.fake3 || !data.questionCreatorID) {
      res.status(400).json({ error: 'Faltan datos.' });
      return;
    }

    challenge.questions.push(data);

    await challenge.save();

    res.status(201).json(challenge);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el ejercicio' });
  }
};

export const getAllHistoryChallenges = async (req: Request, res: Response): Promise<void> => {
  try {
    const challenges = await History.find({});
    res.json({ challenges });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los retos' });
  }
};

export const getUserHistoryChallenges = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;

  try {
    const challenges = await History.find({ challengeCreatorID: userId });
    res.status(200).json(challenges);
  } catch (error) {
    console.error('Error retrieving challenges:', error);
    res.status(500).json({ message: 'Error retrieving user challenges.' });
  }
};

export const getHistoryChallengeQuestions = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { challengeId } = req.params;

  try {
    const challenge = await History.findById(challengeId);
    res.status(200).json(challenge);
  } catch (error) {
    console.error('Error retrieving questions: ', error);
    res.status(500).json({ message: 'Error retrieving questions.' });
  }
};