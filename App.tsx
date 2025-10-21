
import React, { useState, useCallback, useEffect } from 'react';
import { DonorProfile, PersonalizedJourney, Campaign } from './types';
import { ALL_CAMPAIGNS } from './constants';
import { generatePersonalizedJourney } from './services/geminiService';

import Header from './components/Header';
import OnboardingWizard from './components/OnboardingWizard';
import PersonalizedJourneyComponent from './components/PersonalizedJourney';
import NgoDashboard from './components/NgoDashboard';
import LoadingSpinner from './components/LoadingSpinner';

type AppView = 'onboarding' | 'journey' | 'dashboard' | 'privacy';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('onboarding');
  const [donorProfile, setDonorProfile] = useState<DonorProfile | null>(null);
  const [personalizedJourney, setPersonalizedJourney] = useState<PersonalizedJourney | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleOnboardingComplete = useCallback(async (profile: DonorProfile) => {
    setDonorProfile(profile);
    setIsLoading(true);
    setError(null);
    try {
      const journey = await generatePersonalizedJourney(profile, ALL_CAMPAIGNS as Campaign[]);
      setPersonalizedJourney(journey);
      setView('journey');
    } catch (err) {
      console.error("Failed to generate personalized journey:", err);
      setError("We couldn't generate your personalized journey at this time. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetOnboarding = () => {
    setDonorProfile(null);
    setPersonalizedJourney(null);
    setView('onboarding');
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-96">
          <LoadingSpinner />
          <p className="mt-4 text-lg text-gray-600">Crafting your personalized donor journey...</p>
        </div>
      );
    }

    if (error) {
       return (
        <div className="text-center p-8 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">An Error Occurred</h2>
          <p>{error}</p>
          <button onClick={resetOnboarding} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
            Start Over
          </button>
        </div>
      );
    }

    switch (view) {
      case 'onboarding':
        return <OnboardingWizard onComplete={handleOnboardingComplete} />;
      case 'journey':
        if (personalizedJourney && donorProfile) {
          return <PersonalizedJourneyComponent journey={personalizedJourney} donor={donorProfile} onReset={resetOnboarding} />;
        }
        return <OnboardingWizard onComplete={handleOnboardingComplete} />;
      case 'dashboard':
        return <NgoDashboard />;
      default:
        return <OnboardingWizard onComplete={handleOnboardingComplete} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Header currentView={view} setView={setView} />
      <main className="container mx-auto p-4 md:p-8">
        {renderContent()}
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
        <p>A prototype for personalized donor engagement in Singapore. Inspired by MSF & NCSS.</p>
      </footer>
    </div>
  );
};

export default App;
