import mongoose, { Document, Schema } from 'mongoose';

interface Question {
  question: string;
  imgLink: string;
  rightAnswer: string;
  fake1: string;
  fake2: string;
  fake3: string;
  subjectMatter: string;
  questionCreatorName: string;
  questionCreatorID: string;
}

export interface MathDocument extends Document {
  challengeName: string;
  challengeType: string;
  subjectMatter: string;
  time: number;
  questionNumber: number;
  preStudy: string;
  challengeCreatorID: string;
  questions: Question[];
  createdAt?: Date;
  updatedAt?: Date;
}

const questionSchema = new Schema<Question>(
  {
    question: { type: String, required: true },
    imgLink: { type: String, required: false },
    rightAnswer: { type: String, required: true },
    fake1: { type: String, required: true },
    fake2: { type: String, required: true },
    fake3: { type: String, required: true },
    subjectMatter: { type: String, required: true },
    questionCreatorName: { type: String, required: true },
    questionCreatorID: { type: String, required: true },
  },
  {
    timestamps: true // Esto agrega createdAt y updatedAt a cada pregunta
  }
);

const mathSchema = new Schema<MathDocument>(
  {
    challengeName: { type: String, required: true },
    challengeType: { type: String, required: true },
    subjectMatter: { type: String, required: true },
    time: { type: Number, required: false },
    questionNumber: { type: Number, required: false },
    preStudy: { type: String, required: false },
    challengeCreatorID: { type: String, required: true },
    questions: [questionSchema],
  },
  {
    timestamps: true,
  }
);

const Math = mongoose.model<MathDocument>('Math', mathSchema, 'MathExercises');
export default Math;
