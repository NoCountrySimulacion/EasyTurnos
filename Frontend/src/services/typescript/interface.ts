export interface LoginResponse {
	userId: string;
	email: string;
	token: string;
	firstName: string;
	lastName: string;
  }

export interface RegisterResponse {
	userId: string
	token: string
}

export interface LoginCredentials {
	email: string
	password: string
}

export interface RegisterCredentials {
	firstName: string
	lastName: string
	email: string
	phoneNumber: string
	password: string
	confirmPassword: string
}
