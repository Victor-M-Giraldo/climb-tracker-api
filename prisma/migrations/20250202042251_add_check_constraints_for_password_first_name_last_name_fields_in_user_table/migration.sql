-- Adds check constraints for the firstName and lastName fields in the User table. The firstName and lastName fields must be between 2 and 50 characters long.
ALTER TABLE "public"."User"
ADD CONSTRAINT "firstName_len" CHECK (char_length("firstName") >= 2 AND char_length("firstName") <= 50),
ADD CONSTRAINT "lastName_len" CHECK (char_length("lastName") >= 2 AND char_length("lastName") <= 50);

-- Adds check constraints for the password field in the User table. The password field must be between 12 and 64 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.
ALTER TABLE "public"."User"
ADD CONSTRAINT "password_length" CHECK (char_length("password") >= 12 AND char_length("password") <= 64),
ADD CONSTRAINT "password_special_chars" CHECK (
    "password" ~* '.*[A-Z].*' AND
    "password" ~* '.*[a-z].*' AND
    "password" ~* '.*[0-9].*' AND
    "password" ~* '.*[\W_].*'
);
