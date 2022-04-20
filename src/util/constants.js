export const USERS_URL = "http://localhost:3000/users";
export const LOGIN_URL = "http://localhost:3000/login";
export const POSTS_URL = "http://localhost:3000/posts";
export const BLOCKED_USERS_URL = "http://localhost:3000/blockedUsers";

export const CURRENT_DATE = new Date();

export const EMAIL_REGEX = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
export const INVALID_EMAIL_MESSAGE = "Please enter valid email!";
export const EMPTY_INPUT_MESSAGE = "Please fill all input fields";
export const INVALID_PASSWORD_MESSAGE = "Passwords don't match!";
export const CREDENTIALS_TAKEN_MESSAGE = "This username or email is taken!";
//json-server --watch ./src/services/db.json -m ./node_modules/json-server-auth
