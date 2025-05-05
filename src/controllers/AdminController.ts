import { Request, Response, RequestHandler } from 'express';
import UserAdmin from '../models/UserAdmin';
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

// Interfaz para el cuerpo de la solicitud en los métodos
interface RegisterRequestBody {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

interface AuthenticatedRequest extends Request {
    userAdmin: {
      id: string;
    };
  }

// Register User Admin
export const registerUserAdmin: RequestHandler = async (req: Request<{}, {}, RegisterRequestBody>, res: Response): Promise<void> => {
  const { name, lastName, email, password } = req.body;

  try {
    const existingUser = await UserAdmin.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'Este correo ya está registrado' });
      return;
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const createdUser = await UserAdmin.create({
      name,
      lastName,
      email,
      password: hashedPassword,
    });

    const accessToken = jsonwebtoken.sign(
      { userAdmin: { id: createdUser._id } },
      process.env.SECRET as string,
      { expiresIn: '4h' }
    );

    await createdUser.save();

    res.status(201).json({
      token: accessToken,
      id: createdUser._id,
      name: createdUser.name,
      lastName: createdUser.lastName,
      email: createdUser.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear usuario' });
  }
};

// Login User Admin
export const userAdminLogin: RequestHandler = async (req: Request<{}, {}, LoginRequestBody>, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const registeredUser = await UserAdmin.findOne({ email });
    if (!registeredUser) {
      res.status(400).json({ message: 'El usuario o la contraseña no corresponde' });
      return;
    }

    const rightPassword = await bcryptjs.compare(password, registeredUser.password);
    if (!rightPassword) {
      res.status(400).json({ message: 'El usuario o la contraseña no corresponde' });
      return;
    }

    const payload = { userAdmin: { id: registeredUser._id } };
    const accessToken = jsonwebtoken.sign(payload, process.env.SECRET as string, { expiresIn: '4h' });

    await registeredUser.save();

    res.json({
      token: accessToken,
      id: registeredUser._id,
      name: registeredUser.name,
      lastName: registeredUser.lastName,
      email: registeredUser.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

// Verify User Admin
export const userVerify: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { userAdmin } = req as Request & { userAdmin: { id: string } };
  
    try {
      const user = await UserAdmin.findById(userAdmin.id).select('-password');
      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
        return;
      }
      res.json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al verificar el usuario' });
    }
  };

