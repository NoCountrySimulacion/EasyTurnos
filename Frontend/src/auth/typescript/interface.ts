import { ReactNode } from 'react'

export interface ModalProps {
  open: boolean
  handleClose: () => void
}

export interface AuthContextType {
  user: UserLogged | null
  decodedToken: DecodedToken | null
  error: string | null
  isSignIn: boolean
  isUserSignedIn: () => boolean
  loginUser: (email: string, password: string) => Promise<void>
  registerUser: (
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>
  logout: () => void
}

export interface UserLogged {
  token: string
  firstName: string
  lastName: string
}

export interface DecodedToken {
  sub: string;
  jti: string;
  email: string;
  professionalId: string;
  role: string;
  clientId: string;
  exp: number;
  iss: string;
  aud: string;
}



export interface AuthProviderProps {
  children: ReactNode
}

export interface LoginFormValues {
  userEmail: string
  userPassword: string
}

export interface FormValues {
  userName: string
  userLastName: string
  userEmail: string
  userPhoneNumber: string
  userPassword: string
  userPasswordConfirm: string
}
