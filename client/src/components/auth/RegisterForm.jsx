import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/slices/authSlice';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const handleRegister = async (e) => {
    e.preventDefault();
    const userData = { name, email, password, role };
    dispatch(registerUser(userData));
  };

  return (
    <form
      onSubmit={handleRegister}
      className="max-w-lg mx-auto p-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl shadow-lg space-y-6"
    >
      <h2 className="text-3xl font-extrabold text-center text-blue-600">
        Create an Account
      </h2>

      <div>
        <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          className="mt-2 w-full p-4 rounded-xl border-gray-300 shadow-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="mt-2 w-full p-4 rounded-xl border-gray-300 shadow-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="mt-2 w-full p-4 rounded-xl border-gray-300 shadow-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <Label htmlFor="role" className="block text-sm font-medium text-gray-700">
          Select Role
        </Label>
        <Select value={role} onValueChange={(val) => setRole(val)}>
          <SelectTrigger className="mt-2 w-full p-4 rounded-xl border-gray-300 shadow-md focus:ring-2 focus:ring-blue-500">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="User">User</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        className="w-full py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200"
      >
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
