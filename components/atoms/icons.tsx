import { AiOutlineLogin } from "react-icons/ai";
import { FaUser } from "react-icons/fa"; 
import { FiMail, FiEye, FiEyeOff } from "react-icons/fi"; 
import { BsLock } from "react-icons/bs"; 

export const LoginIcon: React.FC<{ color: string }> = ({ color }) => (
	<AiOutlineLogin size={24} color={color} />
);

export const UserIcon: React.FC<{ color: string }> = ({ color }) => (
	<FaUser size={20} color={color} />
);

export const EmailIcon: React.FC<{ color: string }> = ({ color }) => (
	<FiMail size={20} color={color} />
);

export const PasswordIcon: React.FC<{ color: string }> = ({ color }) => (
	<BsLock size={20} color={color} />
);

export const PasswordVisibleIcon: React.FC<{ color: string }> = ({ color }) => (
	<FiEye size={18} color={color} />
);

export const PasswordNoVisibleIcon: React.FC<{ color: string }> = ({ color }) => (
	<FiEyeOff size={18} color={color} />
);
