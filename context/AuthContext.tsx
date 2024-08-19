'use client';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  FC,
  SetStateAction,
  Dispatch,
} from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  login: (login: string, password: string) => Promise<void>;
  checkUserLoggedIn: () => Promise<void>;
  logout: () => Promise<void>;
  userIsLoading: boolean;
  setUserIsLoading: Dispatch<SetStateAction<boolean>>;

  userLogedIn: boolean | undefined;
  setUserLogedIn: Dispatch<SetStateAction<boolean | undefined>>;
}

interface User {
  id: number;
  login: string;
  created_at: string;
  updated_at: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userLogedIn, setUserLogedIn] = useState<boolean | undefined>();
  const router = useRouter();
  const [userIsLoading, setUserIsLoading] = useState<boolean>(false);

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    setUserIsLoading(true);

    const token = localStorage.getItem('access_token');

    if (token) {
      try {
        const res = await axios.post(
          'https://extra.turkmentv.gov.tm/api/auth/me',
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setUser(res.data);

        router.push('/sms/dashboard');
        setUserIsLoading(false);
      } catch (error) {
        await refreshAccessToken();
      }
    } else {
      router.push('/sms/sign_up');
      setUserIsLoading(false);
    }
  };

  const login = async (login: string, password: string) => {
    try {
      const res = await axios.post('https://extra.turkmentv.gov.tm/api/auth/login', {
        login: login,
        password: password,
      });
      localStorage.setItem('access_token', res.data.access_token);
      setUser(res.data);
      router.push('/sms/dashboard');
      setUserIsLoading(false);
    } catch (error) {
      setUserLogedIn(false);
    }
  };

  const refreshAccessToken = async () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const res = await axios.post(
          'https://extra.turkmentv.gov.tm/api/auth/refresh',
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        localStorage.setItem('access_token', res.data.access_token);
        const meRes = await axios.post(
          'https://extra.turkmentv.gov.tm/api/auth/me',
          {},
          {
            headers: { Authorization: `Bearer ${res.data.access_token}` },
          },
        );
        setUser(meRes.data);
        setUserIsLoading(false);
      } catch (error) {
        localStorage.removeItem('access_token');
        setUser(null);
        router.push('/sms/sign_up');
        setUserIsLoading(false);
      }
    }
  };

  const logout = async () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      await axios.post(
        'https://extra.turkmentv.gov.tm/api/auth/logout',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      localStorage.removeItem('access_token');
      setUser(null);
      router.push('/sms/sign_up');
      setUserIsLoading(false);
      setUserLogedIn(undefined);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        checkUserLoggedIn,
        userIsLoading,
        setUserIsLoading,
        userLogedIn,
        setUserLogedIn,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
