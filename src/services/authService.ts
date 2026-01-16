import { User } from '../types';

const STORAGE_KEY = 'msu_hub_user';
const USERS_KEY = 'msu_hub_users';

// Get current user from localStorage
export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem(STORAGE_KEY);
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

// Save current user to localStorage
export const setCurrentUser = (user: User): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

// Logout user
export const logout = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

// Register new user
export const register = (email: string, password: string, firstName: string, lastName: string): User => {
  // Get existing users
  const usersStr = localStorage.getItem(USERS_KEY);
  const users: Array<{ email: string; password: string }> = usersStr ? JSON.parse(usersStr) : [];

  // Check if user already exists
  if (users.some(u => u.email === email)) {
    throw new Error('User with this email already exists');
  }

  // Create new user
  const newUser: User = {
    id: Date.now().toString(),
    email,
    firstName,
    lastName,
    profileComplete: false,
    createdAt: new Date().toISOString(),
  };

  // Save user credentials (in a real app, password should be hashed)
  users.push({ email, password });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  // Set as current user
  setCurrentUser(newUser);

  return newUser;
};

// Login user
export const login = (email: string, password: string): User => {
  const usersStr = localStorage.getItem(USERS_KEY);
  const users: Array<{ email: string; password: string }> = usersStr ? JSON.parse(usersStr) : [];

  const userCred = users.find(u => u.email === email && u.password === password);
  if (!userCred) {
    throw new Error('Invalid email or password');
  }

  // Get user profile data
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.email === email) {
    return currentUser;
  }

  // Create a basic user if profile doesn't exist yet
  const user: User = {
    id: Date.now().toString(),
    email,
    firstName: email.split('@')[0],
    lastName: '',
    profileComplete: false,
    createdAt: new Date().toISOString(),
  };

  setCurrentUser(user);
  return user;
};

// Update user profile
export const updateUserProfile = (updates: Partial<User>): User => {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    throw new Error('No user logged in');
  }

  const updatedUser: User = {
    ...currentUser,
    ...updates,
    profileComplete: Boolean(
      (updates.firstName || currentUser.firstName) &&
      (updates.lastName || currentUser.lastName) &&
      (updates.email || currentUser.email) &&
      (updates.campus || currentUser.campus)
    ),
  };

  setCurrentUser(updatedUser);
  return updatedUser;
};

