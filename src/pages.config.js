/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import AboutUs from './pages/AboutUs';
import BudgetChallenge from './pages/BudgetChallenge';
import BudgetingBasics from './pages/BudgetingBasics';
import Chatbot from './pages/Chatbot';
import ConstitutionRights from './pages/ConstitutionRights';
import CreditDebt from './pages/CreditDebt';
import ELA from './pages/ELA';
import ELASimulator from './pages/ELASimulator';
import ElectionsVoting from './pages/ElectionsVoting';
import Finance from './pages/Finance';
import GovernmentStructure from './pages/GovernmentStructure';
import Home from './pages/Home';
import InvestmentSimulator from './pages/InvestmentSimulator';
import Math from './pages/Math';
import MathSimulator from './pages/MathSimulator';
import NewsBiasChecker from './pages/NewsBiasChecker';
import Politics from './pages/Politics';
import Progress from './pages/Progress';
import Quiz from './pages/Quiz';
import SavingInvesting from './pages/SavingInvesting';
import __Layout from './Layout.jsx';


export const PAGES = {
    "AboutUs": AboutUs,
    "BudgetChallenge": BudgetChallenge,
    "BudgetingBasics": BudgetingBasics,
    "Chatbot": Chatbot,
    "ConstitutionRights": ConstitutionRights,
    "CreditDebt": CreditDebt,
    "ELA": ELA,
    "ELASimulator": ELASimulator,
    "ElectionsVoting": ElectionsVoting,
    "Finance": Finance,
    "GovernmentStructure": GovernmentStructure,
    "Home": Home,
    "InvestmentSimulator": InvestmentSimulator,
    "Math": Math,
    "MathSimulator": MathSimulator,
    "NewsBiasChecker": NewsBiasChecker,
    "Politics": Politics,
    "Progress": Progress,
    "Quiz": Quiz,
    "SavingInvesting": SavingInvesting,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};