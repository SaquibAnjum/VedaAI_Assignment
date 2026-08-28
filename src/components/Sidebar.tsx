import React from 'react';
import {
  LayoutGrid,
  Users,
  FileText,
  CheckSquare,
  Clock,
  Settings,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  GraduationCap
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  activeNav: string;
  onSelectNav: (nav: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  activeNav,
  onSelectNav,
}) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: LayoutGrid },
    { id: 'classroom', label: 'My Classroom', icon: Users },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'exams', label: 'Exams', icon: CheckSquare },
    { id: 'library', label: 'My Library', icon: Clock },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-50 h-screen bg-white border-r border-slate-200 transition-all duration-300 flex flex-col justify-between select-none ${
        isCollapsed ? 'w-16 p-2' : 'w-64 p-4'
      }`}
    >
      {/* Top Header Section */}
      <div className="space-y-6">
        {/* Logo & Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-950 flex items-center justify-center text-white font-extrabold text-lg shadow-sm shrink-0">
              V
            </div>
            {!isCollapsed && (
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                VedaAI
              </span>
            )}
          </div>
          <button
            onClick={onToggleCollapse}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <PanelLeftClose size={18} />}
          </button>
        </div>

        {/* AI Teacher's Toolkit Capsule Button */}
        {!isCollapsed ? (
          <button className="w-full flex items-center justify-center gap-2 rounded-full bg-[#18181b] text-white py-2.5 px-4 text-xs font-semibold shadow-md border border-slate-800 hover:bg-black transition-all group">
            <span className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center ring-1 ring-orange-500/50">
              <Sparkles size={12} className="text-orange-400" />
            </span>
            <span>AI Teacher's Toolkit</span>
          </button>
        ) : (
          <div className="flex justify-center">
            <button
              className="w-10 h-10 rounded-full bg-[#18181b] text-white flex items-center justify-center shadow-md hover:bg-black transition-all"
              title="AI Teacher's Toolkit"
            >
              <span className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center ring-1 ring-orange-500/50">
                <Sparkles size={13} className="text-orange-400" />
              </span>
            </button>
          </div>
        )}

        {/* Main Navigation Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectNav(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-slate-100 text-slate-900 font-semibold shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                } ${isCollapsed ? 'justify-center px-0' : ''}`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon
                  size={18}
                  className={isActive ? 'text-slate-900' : 'text-slate-400'}
                />
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Section */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        {/* Settings link */}
        <button
          onClick={() => onSelectNav('settings')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all ${
            isCollapsed ? 'justify-center px-0' : ''
          }`}
          title={isCollapsed ? 'Settings' : undefined}
        >
          <Settings size={18} className="text-slate-400" />
          {!isCollapsed && <span>Settings</span>}
        </button>

        {/* School Profile Card */}
        {!isCollapsed ? (
          <div className="rounded-2xl bg-slate-50 p-3 border border-slate-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
              <GraduationCap size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-800 truncate">
                Delhi Public School
              </p>
              <p className="text-[10px] text-slate-400 font-medium truncate">
                Bokaro Steel City
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div
              className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 cursor-pointer"
              title="Delhi Public School - Bokaro Steel City"
            >
              <GraduationCap size={18} />
            </div>
          </div>
        )}

        {/* Small Bottom Collapse Switcher */}
        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center text-slate-400 hover:text-slate-600 py-1 text-[11px]"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>
    </aside>
  );
};
