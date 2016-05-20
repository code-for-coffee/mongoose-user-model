# Mongoose User Model

Mongoose User Model definition with auto-hashing of password and password comparison features.

- User Model with Password salt/hashing for use with Mongoose.
- You'll need BCrypt - `npm install bcryptjs --save`
- Model assumes that your user has an `email` and `passwordHash` field that is required.
- Built-in email address validation using `/^\S+@\S+$/`.
- This model uses BCrypt for password salting/hashing. Prior to saving a model the user's `passwordHash` will hashed.
- This model exposes two public methods - `comparePassword(attempt)` and `comparePasswordSync(attempt)` that can be called directly on an individual model.

