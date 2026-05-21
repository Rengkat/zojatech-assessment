type Fields = { first_name: string; last_name: string; email: string; password: string };
type Errors = Partial<Fields>;
export function validate(v: Fields): Errors {
  const e: Errors = {};
  if (!v.first_name.trim()) e.first_name = "First name is required.";
  if (!v.last_name.trim()) e.last_name = "Last name is required.";
  if (!v.email.trim()) e.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Enter a valid email address.";
  if (!v.password) e.password = "Password is required.";
  else if (v.password.length < 8) e.password = "Minimum 8 characters.";
  else if (!/[A-Z]/.test(v.password)) e.password = "Must contain an uppercase letter.";
  else if (!/[0-9]/.test(v.password)) e.password = "Must contain a number.";
  else if (!/[!@#$%^&*]/.test(v.password))
    e.password = "Must contain a special character (!@#$%^&*).";
  return e;
}
