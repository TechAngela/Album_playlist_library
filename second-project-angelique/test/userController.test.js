import bcrypt from "bcrypt"
import { signupController, Login } from '../controllers/userController.js';
import User from '../models/userModels.js'; 
jest.mock('bcrypt');
const mockHash = bcrypt.hash;
const mockCompare = bcrypt.compare;
const mockRequest = (body) => ({ body });
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('User Controller', () => {
  const mockUser = {
    username: 'testuser',
    password: 'hashedpassword',
  };
  User.findOne = jest.fn();

  it('should create a new user', async () => {
    const req = mockRequest({ username: 'testuser', password: 'testpassword' });
    const res = mockResponse();
    mockHash.mockResolvedValue('hashedpassword');

    await signupController(req, res);

    expect(User.prototype.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'User created successfully',
    });
  });

  it('should handle signup error', async () => {
    const req = mockRequest({ username: 'testuser', password: 'testpassword' });
    const res = mockResponse();

    mockHash.mockRejectedValue(new Error('Hashing error'));

    await signupController(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Hashing error',
    });
  });

  it('should handle user login', async () => {
    const req = mockRequest({ username: 'testuser', password: 'testpassword' });
    const res = mockResponse();
    User.findOne.mockResolvedValue(mockUser);
    mockCompare.mockResolvedValue(true);

    await Login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'User logged in successfully',
    });
  });

  it('should handle user not found during login', async () => {
    const req = mockRequest({ username: 'nonexistentuser', password: 'testpassword' });
    const res = mockResponse();
    User.findOne.mockResolvedValue(null);

    await Login(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'User not found',
    });
  });

  it('should handle invalid password during login', async () => {
    const req = mockRequest({ username: 'testuser', password: 'incorrectpassword' });
    const res = mockResponse();
    User.findOne.mockResolvedValue(mockUser);
    mockCompare.mockResolvedValue(false);

    await Login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Invalid password',
    });
  });

  it('should handle login error', async () => {
    const req = mockRequest({ username: 'testuser', password: 'testpassword' });
    const res = mockResponse();
    User.findOne.mockRejectedValue(new Error('Database error'));

    await Login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Database error',
    });
  });
});