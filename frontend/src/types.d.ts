declare module '../pages/ImpactStats' {
  import React from 'react';
  const ImpactStats: React.FC;
  export default ImpactStats;
}

declare module '../pages/LatestNewsSection' {
  import React from 'react';
  const LatestNewsSection: React.FC;
  export default LatestNewsSection;
}

declare module '../services/authService' {
  interface RegisterForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
  }

  interface AuthResponse {
    message: string;
    token?: string;
  }

  const AuthService: {
    register: (formData: RegisterForm) => Promise<AuthResponse>;
    login: (email: string, password: string) => Promise<AuthResponse>;
    logout: () => void;
  };

  export default AuthService;
} 