/**
 * Mock data for authentication endpoints
 */

export const authMockData = {
  // Login response
  loginResponse: {
    content: {
      access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjAwMDAwMDAwMDAwMDAwMDAwMDAwMSIsIm5hbWUiOiJKdWFuIiwiZW1haWwiOiJqdWFuQGV4YW1wbGUuY29tIiwiaWF0IjoxNjc1NzA1MDAwfQ.signature",
      refresh_token: "refresh_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjAwMDAwMDAwMDAwMDAwMDAwMDAwMSIsImlhdCI6MTY3NTcwNTAwMH0.signature",
      user_id: "660000000000000000000001"
    },
    status_code: 200
  },

  // Forgot password response
  forgotPasswordResponse: {
    content: {
      message: "Se ha enviado un correo de recuperación de contraseña",
      email: "juan@example.com"
    },
    status_code: 200
  },

  // Reset password response
  resetPasswordResponse: {
    content: {
      message: "Contraseña actualizada exitosamente"
    },
    status_code: 200
  },

  // Invalid credentials
  invalidCredentialsResponse: {
    content: {
      message: "Credenciales inválidas"
    },
    status_code: 401
  }
};
