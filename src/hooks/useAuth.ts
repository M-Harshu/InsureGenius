import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FirebaseError } from 'firebase/app';
import { useAuth as useAuthContext } from '../contexts/AuthContext';
import type { z } from 'zod';
import type { loginSchema, registerSchema } from '../lib/validations/auth';

type LoginInput = z.infer<typeof loginSchema>;
type RegisterInput = z.infer<typeof registerSchema>;

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, register } = useAuthContext();

  const handleLogin = async (data: LoginInput) => {
    setIsLoading(true);
    try {
      await login(data.email.trim(), data.password);
      toast.success('Successfully logged in!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/invalid-email':
            toast.error('Please enter a valid email address');
            break;
          case 'auth/invalid-credential':
          case 'auth/invalid-password':
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            toast.error('Invalid email or password');
            break;
          case 'auth/user-disabled':
            toast.error('This account has been disabled');
            break;
          case 'auth/too-many-requests':
            toast.error('Too many failed attempts. Please try again later');
            break;
          case 'auth/network-request-failed':
            toast.error('Network error. Please check your connection');
            break;
          default:
            toast.error('Failed to login. Please try again');
        }
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: RegisterInput) => {
    setIsLoading(true);
    try {
      await register(data.email.trim(), data.password);
      toast.success('Successfully registered! Welcome to InsureGenius.');
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            toast.error('An account with this email already exists');
            break;
          case 'auth/invalid-email':
            toast.error('Please enter a valid email address');
            break;
          case 'auth/operation-not-allowed':
            toast.error('Registration is currently disabled');
            break;
          case 'auth/weak-password':
            toast.error('Password should be at least 6 characters');
            break;
          case 'auth/network-request-failed':
            toast.error('Network error. Please check your connection');
            break;
          default:
            toast.error('Failed to register. Please try again');
        }
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleLogin,
    handleRegister,
  };
}