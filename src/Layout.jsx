import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, BookOpen, TrendingUp, FileSearch, Trophy, Mail, Phone, Info } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  // Scroll to top whenever the route changes
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Load Google AdSense
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7051312589378141";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const navItems = [
    { name: "Home", path: createPageUrl("Home"), icon: Home },
    { name: "Politics", path: createPageUrl("Politics"), icon: BookOpen },
    { name: "Finance", path: createPageUrl("Finance"), icon: TrendingUp },
    { name: "Math", path: createPageUrl("Math"), icon: BookOpen },
    { name: "ELA", path: createPageUrl("ELA"), icon: BookOpen },
    { name: "Progress", path: createPageUrl("Progress"), icon: Trophy },
    { name: "Bias Checker", path: createPageUrl("NewsBiasChecker"), icon: FileSearch },
    { name: "About", path: createPageUrl("AboutUs"), icon: Info },
  ];

  const isActive = (path) => location.pathname === path;

  // TEMPORARY: Site closed
  const siteIsClosed = false;

  if (siteIsClosed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex items-center justify-center p-4">
        <div className="text-center max-w-2xl">
          <div className="text-8xl mb-8">⚠️</div>
          <h1 className="text-5xl font-black text-white mb-6">Permanently Closed</h1>
          <p className="text-xl text-gray-300 mb-8">
            We're experiencing internal issues and have decided to permanently close the site and organization. Thank you for your support!
          </p>
          <div className="text-gray-400">
            <p>For questions, contact us at:</p>
            <a href="mailto:civiccents01@gmail.com" className="text-blue-400 hover:text-blue-300">
              civiccents01@gmail.com
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
      <style>{`
        :root {
          --primary-blue: #1E40AF;
          --accent-blue: #3B82F6;
          --dark: #0F172A;
          --light: #F8FAFC;
        }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-blue-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center gap-2 h-16">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-300 ${
                    active
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : "text-gray-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium text-sm">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Navigation - Scrollable */}
          <nav className="md:hidden overflow-x-auto py-3">
            <div className="flex gap-2 min-w-max px-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 whitespace-nowrap ${
                      active
                        ? "bg-blue-600 text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-blue-900/20 bg-slate-950/50 backdrop-blur-xl mt-12">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">Civiccents.org</h3>
              <p className="text-gray-400 text-sm mb-3">
                Empowering the next generation through education
              </p>
              <p className="text-gray-500 text-xs">
                © 2024 Civiccents.org - All rights reserved
              </p>
            </div>
            
            <div className="flex flex-col gap-3">
              <a 
                href="mailto:civiccents01@gmail.com" 
                className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-800 rounded-xl text-gray-300 hover:text-blue-400 transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">civiccents01@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}