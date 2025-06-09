// src/utils/validation.js
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validateUsername = (username) => {
  const regex = /^[a-zA-Z0-9_]{3,}$/;
  return regex.test(username);
};

export const validatePassword = (password) => {
  // At least 6 chars, 1 letter, 1 number
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return regex.test(password);
};



