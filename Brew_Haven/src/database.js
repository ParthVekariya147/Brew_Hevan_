// database.js

let users = [];

export const createUser = (user) => {
  const existingUser = users.find(u => u.email === user.email);
  if (existingUser) {
    throw new Error('User already exists');
  }
  users.push(user);
};

export const getUser = (email) => {
  return users.find(u => u.email === email);
};

export const updateUser = (email, updatedUser) => {
  const index = users.findIndex(u => u.email === email);
  if (index === -1) {
    throw new Error('User not found');
  }
  users[index] = { ...users[index], ...updatedUser };
};

export const deleteUser = (email) => {
  users = users.filter(u => u.email !== email);
};
