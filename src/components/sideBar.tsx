import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { User, Users, Mail, TrendingUp, Settings, LogOut, X, CircleDollarSign } from "lucide-react";
import logo from "../assets/logo.svg";
import { logout, type AuthState } from "../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../redux/services/AuthApiSlice";

const navItems = [
  { icon: User, label: "My Portfolio", path: "/dashboard" },
  { icon: Users, label: "My Group", path: "/dashboard/group" },
  { icon: Mail, label: "Messages", path: "/dashboard/messages" },
  { icon: TrendingUp, label: "Analytics", path: "/dashboard/analytics" },
  { icon: CircleDollarSign, label: "Pack", path: "/dashboard/pack" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutUser, { isLoading }] = useLogoutMutation();

  const isActive = (itemPath: string) => {
    if (itemPath === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(itemPath);
  };

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
    } catch {
      // Server down or token expired — clear local state anyway
    } finally {
      dispatch(logout());
      navigate("/login");
    }
  };

  return (
    <>
      {/* Desktop Sidebar - always visible */}
      <aside className="hidden lg:flex w-[200px] bg-white min-h-screen flex-col justify-between border-r border-slate-100 py-8 fixed left-0 top-0 h-full z-10">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2 px-6 mb-10">
            <img src={logo} alt="Buddy" className="h-8" />
          </div>

          {/* Navigation */}
          <nav className="flex flex-col">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all ${
                    active
                      ? "text-brand-orange"
                      : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                  }`}>
                  {active && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-brand-orange rounded-r-full" />
                  )}
                  <item.icon size={17} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile Footer */}
        <div className="flex flex-col items-center text-center px-6">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
            alt="Theresa Milly"
            className="w-16 h-16 rounded-full object-cover mb-3"
          />
          <h4 className="font-semibold text-sm text-slate-800">Theresa Milly</h4>
          <p className="text-xs text-slate-400 mb-5">Influencer</p>
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-orange-100 text-brand-orange rounded-xl text-sm font-medium hover:bg-orange-50 transition-colors disabled:opacity-60">
            <LogOut size={15} />
            {isLoading ? "Logging out…" : "Logout"}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`
          lg:hidden w-[200px] bg-white min-h-screen flex flex-col justify-between
          border-r border-slate-100 py-8
          fixed left-0 top-0 h-full z-30
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0 shadow-xl" : "-translate-x-full"}
        `}>
        <button
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
          onClick={onClose}
          aria-label="Close menu">
          <X size={18} />
        </button>

        <div>
          <div className="flex items-center gap-2 px-6 mb-10">
            <img src={logo} alt="Buddy" className="h-8" />
          </div>

          <nav className="flex flex-col">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`relative flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all ${
                    active
                      ? "text-brand-orange"
                      : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                  }`}>
                  {active && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-brand-orange rounded-r-full" />
                  )}
                  <item.icon size={17} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-col items-center text-center px-6">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
            alt="Theresa Milly"
            className="w-16 h-16 rounded-full object-cover mb-3"
          />
          <h4 className="font-semibold text-sm text-slate-800">Theresa Milly</h4>
          <p className="text-xs text-slate-400 mb-5">Influencer</p>
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="w-full flex items-center bg-orange-100 justify-center gap-2 py-2.5 text-brand-orange rounded-xl text-sm font-medium hover:bg-orange-200 transition-colors disabled:opacity-60">
            <LogOut size={15} />
            {isLoading ? "Logging out…" : "Logout"}
          </button>
        </div>
      </aside>
    </>
  );
};
