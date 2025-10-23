import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import appService from '@/lib/appService';
import { useRouter } from 'next/router';

// Questionnaire data interface
export interface QuestionnaireData {
  meaningPurposeImportance: number;
  connectionBuildingInterest: number;
  businessCareerImportance: number;
  personalDevelopmentImportance: number;
  familyRelationshipsImportance: number;
  spiritualityGrowthImportance: number;
  healthWellbeingImportance: number;
  adventureLifestyleImportance: number;
  growthLearningImportance: number;
  contributionServiceImportance: number;
  creativityExpressionImportance: number;
  connectionBelongingImportance: number;
  legacyImpactImportance: number;
  freedomIndependenceImportance: number;
  securityStabilityImportance: number;
  collaborationRole: string;
  tangibleResultsImportance: number;
  socialPreference: number;
  routineNoveltyPreference: number;
  interests: string[];
}

// Submit questionnaire hook
export const useSubmitQuestionnaire = () => {
  const { tokens, setUser, user } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: QuestionnaireData) => {
      if (!tokens?.accessToken) {
        throw new Error('No authentication token available');
      }

      return await appService({
        method: 'POST',
        url: '/questionnaire',
        data,
        headerCred: {
          authorization: `Bearer ${tokens.accessToken}`,
        },
        showSuccessMsg: true, // Disable appService success message to avoid double toast
   
      });
    },
    onSuccess: (data) => {
      // Clear session storage on successful submission
      sessionStorage.removeItem('questionnaire-data');
      console.log('Questionnaire submitted successfully:', data);
      
      // Update user's profileCompleted status to true
      if (user) {
        const updatedUser = {
          ...user,
          profileCompleted: true
        };
        setUser(updatedUser);
        console.log('Updated user profileCompleted to true:', updatedUser);
      }
      
      // Redirect to dashboard
      router.push('/dashboard');
    },
    onError: (error: any) => {
      console.error('Failed to submit questionnaire:', error);
    },
  });
};

// Session storage helpers for questionnaire data
export const useQuestionnaireStorage = () => {
  const STORAGE_KEY = 'questionnaire-data';

  const saveToSession = (data: Partial<QuestionnaireData>) => {
    try {
      const existingData = getFromSession();
      const updatedData = { ...existingData, ...data };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    } catch (error) {
      console.error('Failed to save questionnaire data to session storage:', error);
    }
  };

  const getFromSession = (): Partial<QuestionnaireData> => {
    try {
      const data = sessionStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Failed to load questionnaire data from session storage:', error);
      return {};
    }
  };

  const clearSession = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear questionnaire data from session storage:', error);
    }
  };

  return {
    saveToSession,
    getFromSession,
    clearSession,
  };
};

// Default questionnaire data structure
export const defaultQuestionnaireData: QuestionnaireData = {
  meaningPurposeImportance: 0,
  connectionBuildingInterest: 0,
  businessCareerImportance: 0,
  personalDevelopmentImportance: 0,
  familyRelationshipsImportance: 0,
  spiritualityGrowthImportance: 0,
  healthWellbeingImportance: 0,
  adventureLifestyleImportance: 0,
  growthLearningImportance: 0,
  contributionServiceImportance: 0,
  creativityExpressionImportance: 0,
  connectionBelongingImportance: 0,
  legacyImpactImportance: 0,
  freedomIndependenceImportance: 0,
  securityStabilityImportance: 0,
  collaborationRole: '',
  tangibleResultsImportance: 0,
  socialPreference: 0,
  routineNoveltyPreference: 0,
  interests: [],
};