import mongoose, { Schema, Document } from 'mongoose';

interface IUserAdmin extends Document {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

const userAdminSchema: Schema = new Schema<IUserAdmin>(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserAdmin = mongoose.model<IUserAdmin>('UserAdmin', userAdminSchema);

export default UserAdmin;
