import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useSubmitQuestionnaire, useQuestionnaireStorage, QuestionnaireData } from "../hooks/useQuestionnaire";
import { toastService } from "@/lib/toast";

// Define the interest questions data structure
export interface InterestQuestion {
  id: number;
  question: string;
  labelLeft: string;
  labelRight: string;
  value: number;
}

export interface InterestStepperData {
  currentStep: number;
  answers: Record<number, number | Record<string, number> | string | string[]>; // step number -> slider value, object values, string value, or string array
  isCompleted: boolean;
}

interface InterestStepperContextType {
  data: InterestStepperData;
  updateAnswer: (
    step: number,
    value: number | Record<string, number> | string | string[]
  ) => void;
  setCurrentStep: (step: number) => void;
  getNextStep: () => number | null;
  getPreviousStep: () => number | null;
  resetData: () => void;
  isStepCompleted: (step: number) => boolean;
  getCompletionPercentage: () => number;
  canProceedToNext: (step: number) => boolean;
  getStepValidationMessage: (step: number) => string | null;
  getAllAnswers: () => Record<number, any>;
  submitQuestionnaire: () => void;
  isSubmitting: boolean;
}

// Interest questions data
export const INTEREST_QUESTIONS: InterestQuestion[] = [
  {
    id: 1,
    question: "How important is meaning and purpose in your life?",
    labelLeft: "Not very important",
    labelRight: "Very important",
    value: 2,
  },
  {
    id: 2,
    question: "How important are tangible results and achievements?",
    labelLeft: "Not very Important",
    labelRight: "Very Important",
    value: 2,
  },
  // Step 3 is handled by custom component (multi-category)
  {
    id: 3,
    question: "Which areas are central to your life? (choose up to 3)",
    labelLeft: "",
    labelRight: "",
    value: 2,
  },
  {
    id: 4,
    question: "How important is freedom and independence?",
    labelLeft: "Not very Important",
    labelRight: "Very Important",
    value: 2,
  },
  {
    id: 5,
    question: "How important is security and stability?",
    labelLeft: "Not very Important",
    labelRight: "Very Important",
    value: 2,
  },
  // Step 6 is handled by custom component (multi-category)
  {
    id: 6,
    question: "Which core drivers guide you most in life? (choose up to 3)",
    labelLeft: "",
    labelRight: "",
    value: 2,
  },
  // Step 7 is handled by custom component (radio buttons)
  {
    id: 7,
    question: "When collaborating with others, how do you see yourself?",
    labelLeft: "",
    labelRight: "",
    value: 2,
  },
  {
    id: 8,
    question:
      "Do you prefer small, intimate gatherings or large, lively groups?",
    labelLeft: "Small, intimate gatherings",
    labelRight: "Large, lively groups",
    value: 2,
  },
  {
    id: 9,
    question:
      "Do you prefer routine and familiarity or novelty and constant new experiences?",
    labelLeft: "Routine is best",
    labelRight: "Constant new experiences",
    value: 2,
  },
  {
    id: 10,
    question: "How interested are you in building new meaningful connections?",
    labelLeft: "Not very Important",
    labelRight: "Very Important",
    value: 2,
  },
  // Step 11 is handled by custom component (checkboxes)
  {
    id: 11,
    question:
      "Which of these areas do you enjoy exploring in your life? (choose up to 4)",
    labelLeft: "",
    labelRight: "",
    value: 2,
  },
];

const STORAGE_KEY = "questionnaire-data";

const initialData: InterestStepperData = {
  currentStep: 1,
  answers: {},
  isCompleted: false,
};

const InterestStepperContext = createContext<
  InterestStepperContextType | undefined
>(undefined);

export const useInterestStepperContext = () => {
  const context = useContext(InterestStepperContext);
  if (context === undefined) {
    throw new Error(
      "useInterestStepperContext must be used within an InterestStepperProvider"
    );
  }
  return context;
};

interface InterestStepperProviderProps {
  children: ReactNode;
}

export const InterestStepperProvider: React.FC<InterestStepperProviderProps> = ({
  children,
}) => {
  const [data, setData] = useState<InterestStepperData>(initialData);
  const [isInitialized, setIsInitialized] = useState(false);
  const { saveToSession, getFromSession, clearSession } = useQuestionnaireStorage();
  const submitQuestionnaireMutation = useSubmitQuestionnaire();

  // Load data from sessionStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = getFromSession();
      if (Object.keys(savedData).length > 0) {
        // Convert questionnaire data back to stepper format
        const stepperData = convertQuestionnaireToStepper(savedData);
        setData(stepperData);
      }
      setIsInitialized(true);
    }
  }, []);

  // Save data to sessionStorage whenever it changes (but not on initial load)
  useEffect(() => {
    if (typeof window !== "undefined" && isInitialized) {
      const questionnaireData = convertStepperToQuestionnaire(data.answers);
      saveToSession(questionnaireData);
    }
  }, [data, isInitialized]);

  // Helper function to convert stepper answers to questionnaire format
  const convertStepperToQuestionnaire = (answers: Record<number, any>): Partial<QuestionnaireData> => {
    const questionnaire: Partial<QuestionnaireData> = {};

    // Step 1: meaningPurposeImportance
    if (answers[1] !== undefined) questionnaire.meaningPurposeImportance = answers[1];
    
    // Step 2: connectionBuildingInterest  
    if (answers[2] !== undefined) questionnaire.connectionBuildingInterest = answers[2];
    
    // Step 3: Multiple fields (businessCareerImportance, personalDevelopmentImportance, etc.)
    if (answers[3] && typeof answers[3] === 'object') {
      const step3Data = answers[3] as Record<string, number>;
      if (step3Data.businessCareerImportance !== undefined) questionnaire.businessCareerImportance = step3Data.businessCareerImportance;
      if (step3Data.personalDevelopmentImportance !== undefined) questionnaire.personalDevelopmentImportance = step3Data.personalDevelopmentImportance;
      if (step3Data.familyRelationshipsImportance !== undefined) questionnaire.familyRelationshipsImportance = step3Data.familyRelationshipsImportance;
      if (step3Data.spiritualityGrowthImportance !== undefined) questionnaire.spiritualityGrowthImportance = step3Data.spiritualityGrowthImportance;
      if (step3Data.healthWellbeingImportance !== undefined) questionnaire.healthWellbeingImportance = step3Data.healthWellbeingImportance;
      if (step3Data.adventureLifestyleImportance !== undefined) questionnaire.adventureLifestyleImportance = step3Data.adventureLifestyleImportance;
    }
    
    // Step 4: freedomIndependenceImportance
    if (answers[4] !== undefined) questionnaire.freedomIndependenceImportance = answers[4];
    
    // Step 5: securityStabilityImportance
    if (answers[5] !== undefined) questionnaire.securityStabilityImportance = answers[5];
    
    // Step 6: Multiple fields (growthLearningImportance, contributionServiceImportance, etc.)
    if (answers[6] && typeof answers[6] === 'object') {
      const step6Data = answers[6] as Record<string, number>;
      if (step6Data.growthLearningImportance !== undefined) questionnaire.growthLearningImportance = step6Data.growthLearningImportance;
      if (step6Data.contributionServiceImportance !== undefined) questionnaire.contributionServiceImportance = step6Data.contributionServiceImportance;
      if (step6Data.creativityExpressionImportance !== undefined) questionnaire.creativityExpressionImportance = step6Data.creativityExpressionImportance;
      if (step6Data.connectionBelongingImportance !== undefined) questionnaire.connectionBelongingImportance = step6Data.connectionBelongingImportance;
      if (step6Data.legacyImpactImportance !== undefined) questionnaire.legacyImpactImportance = step6Data.legacyImpactImportance;
    }
    
    // Step 7: collaborationRole
    if (answers[7] !== undefined) questionnaire.collaborationRole = answers[7] as string;
    
    // Step 8: tangibleResultsImportance
    if (answers[8] !== undefined) questionnaire.tangibleResultsImportance = answers[8];
    
    // Step 9: routineNoveltyPreference
    if (answers[9] !== undefined) questionnaire.routineNoveltyPreference = answers[9];
    
    // Step 10: socialPreference
    if (answers[10] !== undefined) questionnaire.socialPreference = answers[10];
    
    // Step 11: interests
    if (answers[11] !== undefined) questionnaire.interests = answers[11] as string[];

    return questionnaire;
  };

  // Helper function to convert questionnaire data back to stepper format
  const convertQuestionnaireToStepper = (questionnaire: Partial<QuestionnaireData>): InterestStepperData => {
    const answers: Record<number, any> = {};

    // Convert back to stepper format
    if (questionnaire.meaningPurposeImportance !== undefined) answers[1] = questionnaire.meaningPurposeImportance;
    if (questionnaire.connectionBuildingInterest !== undefined) answers[2] = questionnaire.connectionBuildingInterest;
    
    // Step 3 object
    const step3: Record<string, number> = {};
    if (questionnaire.businessCareerImportance !== undefined) step3.businessCareerImportance = questionnaire.businessCareerImportance;
    if (questionnaire.personalDevelopmentImportance !== undefined) step3.personalDevelopmentImportance = questionnaire.personalDevelopmentImportance;
    if (questionnaire.familyRelationshipsImportance !== undefined) step3.familyRelationshipsImportance = questionnaire.familyRelationshipsImportance;
    if (questionnaire.spiritualityGrowthImportance !== undefined) step3.spiritualityGrowthImportance = questionnaire.spiritualityGrowthImportance;
    if (questionnaire.healthWellbeingImportance !== undefined) step3.healthWellbeingImportance = questionnaire.healthWellbeingImportance;
    if (questionnaire.adventureLifestyleImportance !== undefined) step3.adventureLifestyleImportance = questionnaire.adventureLifestyleImportance;
    if (Object.keys(step3).length > 0) answers[3] = step3;
    
    if (questionnaire.freedomIndependenceImportance !== undefined) answers[4] = questionnaire.freedomIndependenceImportance;
    if (questionnaire.securityStabilityImportance !== undefined) answers[5] = questionnaire.securityStabilityImportance;
    
    // Step 6 object
    const step6: Record<string, number> = {};
    if (questionnaire.growthLearningImportance !== undefined) step6.growthLearningImportance = questionnaire.growthLearningImportance;
    if (questionnaire.contributionServiceImportance !== undefined) step6.contributionServiceImportance = questionnaire.contributionServiceImportance;
    if (questionnaire.creativityExpressionImportance !== undefined) step6.creativityExpressionImportance = questionnaire.creativityExpressionImportance;
    if (questionnaire.connectionBelongingImportance !== undefined) step6.connectionBelongingImportance = questionnaire.connectionBelongingImportance;
    if (questionnaire.legacyImpactImportance !== undefined) step6.legacyImpactImportance = questionnaire.legacyImpactImportance;
    if (Object.keys(step6).length > 0) answers[6] = step6;
    
    if (questionnaire.collaborationRole !== undefined) answers[7] = questionnaire.collaborationRole;
    if (questionnaire.tangibleResultsImportance !== undefined) answers[8] = questionnaire.tangibleResultsImportance;
    if (questionnaire.routineNoveltyPreference !== undefined) answers[9] = questionnaire.routineNoveltyPreference;
    if (questionnaire.socialPreference !== undefined) answers[10] = questionnaire.socialPreference;
    if (questionnaire.interests !== undefined) answers[11] = questionnaire.interests;

    // Determine current step based on completed answers
    let currentStep = 1;
    for (let i = 1; i <= 11; i++) {
      if (answers[i] !== undefined) {
        currentStep = Math.min(i + 1, 11);
      }
    }

    return {
      currentStep,
      answers,
      isCompleted: false,
    };
  };

  // Submit questionnaire function
  const submitQuestionnaire = () => {
    const questionnaireData = convertStepperToQuestionnaire(data.answers);
    
    // Validate all required fields are filled
    const requiredFields = [
      'meaningPurposeImportance', 'connectionBuildingInterest', 'businessCareerImportance',
      'personalDevelopmentImportance', 'familyRelationshipsImportance', 'spiritualityGrowthImportance',
      'healthWellbeingImportance', 'adventureLifestyleImportance', 'freedomIndependenceImportance',
      'securityStabilityImportance', 'growthLearningImportance', 'contributionServiceImportance',
      'creativityExpressionImportance', 'connectionBelongingImportance', 'legacyImpactImportance',
      'collaborationRole', 'tangibleResultsImportance', 'routineNoveltyPreference', 'socialPreference',
      'interests'
    ];

    const missingFields = requiredFields.filter(field => questionnaireData[field as keyof QuestionnaireData] === undefined);
    
    if (missingFields.length > 0) {
      toastService.error('Please complete all steps before submitting.');
      return;
    }

    submitQuestionnaireMutation.mutate(questionnaireData as QuestionnaireData, {
      onSuccess: () => {
        toastService.success('Questionnaire submitted successfully!');
        clearSession();
        resetData();
      },
      onError: (error: any) => {
        toastService.error(`Failed to submit questionnaire: ${error.message}`);
      },
    });
  };

  const updateAnswer = (
    step: number,
    value: number | Record<string, number> | string | string[]
  ) => {
    setData((prev) => {
      // Only update if the value actually changed
      const prevValue = prev.answers[step];
      const hasChanged =
        typeof value === "object" && !Array.isArray(value)
          ? JSON.stringify(prevValue) !== JSON.stringify(value)
          : Array.isArray(value)
          ? JSON.stringify(prevValue) !== JSON.stringify(value)
          : prevValue !== value;

      if (hasChanged) {
        return {
          ...prev,
          answers: {
            ...prev.answers,
            [step]: value,
          },
        };
      }
      return prev; // No change needed
    });
  };

  const setCurrentStep = (step: number) => {
    if (step >= 1 && step <= 11) {
      setData((prev) => {
        // Only update if the step actually changed
        if (prev.currentStep !== step) {
          return {
            ...prev,
            currentStep: step,
            isCompleted: false, // Keep isCompleted false for valid steps
          };
        }
        return prev; // No change needed
      });
    } else if (step > 11) {
      // Only set completion if not already completed
      setData((prev) => {
        if (!prev.isCompleted) {
          return {
            ...prev,
            currentStep: 11, // Keep at step 11 max
            isCompleted: true,
          };
        }
        return prev; // No change needed
      });
    }
  };

  const getNextStep = (): number | null => {
    if (data.currentStep < 11) {
      return data.currentStep + 1;
    }
    return null;
  };

  const getPreviousStep = (): number | null => {
    if (data.currentStep > 1) {
      return data.currentStep - 1;
    }
    return null;
  };

  const resetData = () => {
    setData(initialData);
    setIsInitialized(false);
    clearSession();
    // Re-initialize after clearing
    setTimeout(() => setIsInitialized(true), 0);
  };

  const isStepCompleted = (step: number): boolean => {
    return data.answers.hasOwnProperty(step);
  };

  const canProceedToNext = (step: number): boolean => {
    const answer = data.answers[step];

    switch (step) {
      case 3: // Multi-category step
      case 6: // Multi-category step
        return (
          answer &&
          typeof answer === "object" &&
          !Array.isArray(answer) &&
          Object.keys(answer).length > 0
        );
      case 7: // Radio button step
        return Boolean(answer && typeof answer === "string" && answer.length > 0);
      case 11: // Checkbox step
        return Boolean(answer && Array.isArray(answer) && answer.length > 0);
      default:
        // Slider steps - always valid because they have default values
        return true;
    }
  };

  const getStepValidationMessage = (step: number): string | null => {
    if (canProceedToNext(step)) return null;

    switch (step) {
      case 3:
      case 6:
        return "Please rate at least one category to continue.";
      case 7:
        return "Please select an option to continue.";
      case 11:
        return "Please select at least one area to continue.";
      default:
        // Slider steps - no validation message needed (always valid)
        return null;
    }
  };

  const getAllAnswers = () => {
    return { ...data.answers };
  };

  const getCompletionPercentage = (): number => {
    // Progress based on current step, not completed answers
    // Step 1 = 9.09%, Step 2 = 18.18%, etc.
    return Math.round((data.currentStep / 11) * 100);
  };

  const value: InterestStepperContextType = {
    data,
    updateAnswer,
    setCurrentStep,
    getNextStep,
    getPreviousStep,
    resetData,
    isStepCompleted,
    getCompletionPercentage,
    canProceedToNext,
    getStepValidationMessage,
    getAllAnswers,
    submitQuestionnaire,
    isSubmitting: submitQuestionnaireMutation.isPending,
  };

  return (
    <InterestStepperContext.Provider value={value}>
      {children}
    </InterestStepperContext.Provider>
  );
};
