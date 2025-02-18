export function validateEmail(email: string) {
  email = email.trim();
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let error = '';
  if (!email) {
    error = 'Email is required';
  } else if (!re.test(email)) {
    error = 'Email is invalid';
  }
  return { email: error };
}

export function validatePassword(password: string) {
  let error = '';
  if (!password) {
    error = 'Password is required';
  } else if (password.length < 6) {
    error = 'Password must be at least 6 characters';
  }
  return { password: error };
}

export function validateConfirmPassword(
  password: string,
  confirmPassword: string
) {
  let error = '';
  if (!confirmPassword) {
    error = 'Confirmation password is required';
  } else if (password !== confirmPassword) {
    error = 'Passwords do not match';
  }
  return { confirmPassword: error };
}
