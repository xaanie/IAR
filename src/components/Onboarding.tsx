import React, { useState } from 'react';
import { Rocket, Globe, ArrowRight, CheckCircle2, User, Mail, Lock, MapPin, GraduationCap, Phone, FileText, ArrowLeft } from 'lucide-react';
import { register, setCurrentUser } from '../services/authService';
import { User as UserType } from '../types';

interface OnboardingProps {
  onComplete: () => void;
  onLogin: () => void;
}

const welcomeSteps = [
  {
    icon: Rocket,
    title: "Welcome to the Hub",
    description: "Your official MSU International & Alumni Relations gateway. Connect, grow, and take your career to the global stage.",
    color: "bg-blue-500",
  },
  {
    icon: Globe,
    title: "Global Mentorship",
    description: "Access our exclusive database of mentors from over 7 countries. Learn from those who have successfully navigated the global market.",
    color: "bg-[#ffcc00]",
  }
];

type OnboardingMode = 'welcome' | 'register';

const Onboarding: React.FC<OnboardingProps> = ({ onComplete, onLogin }) => {
  const [mode, setMode] = useState<OnboardingMode>('welcome');
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    campus: '',
    major: '',
    graduationYear: '',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }

    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (mode === 'welcome') {
      if (currentStep < welcomeSteps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setMode('register');
        setCurrentStep(0);
      }
    } else {
      if (validateStep(currentStep)) {
        if (currentStep < 2) {
          setCurrentStep(prev => prev + 1);
        } else {
          handleRegister();
        }
      }
    }
  };

  const handleRegister = () => {
    if (!validateStep(2)) return;

    try {
      const user = register(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName
      );

      // Update with additional profile info
      const updatedUser: UserType = {
        ...user,
        campus: formData.campus as UserType['campus'],
        major: formData.major || undefined,
        graduationYear: formData.graduationYear || undefined,
        phoneNumber: formData.phoneNumber || undefined,
        profileComplete: Boolean(formData.campus),
      };

      setCurrentUser(updatedUser);
      onComplete();
    } catch (error: any) {
      setErrors({ email: error.message || 'Registration failed. Please try again.' });
    }
  };

  const StepIcon = mode === 'welcome' ? welcomeSteps[currentStep]?.icon : User;

  if (mode === 'welcome') {
    return (
      <div className="min-h-screen bg-[#009fe3] flex items-center justify-center p-6">
        <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-xl overflow-hidden animate-scaleUp">
          <div className="p-12 text-center space-y-10">
            <div className="flex justify-center space-x-3">
              {welcomeSteps.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-2 rounded-full transition-all duration-500 ${i === currentStep ? 'w-10 bg-[#ffcc00]' : 'w-2 bg-slate-200'}`}
                ></div>
              ))}
            </div>

            <div className={`w-24 h-24 ${welcomeSteps[currentStep].color} text-white rounded-[2rem] flex items-center justify-center mx-auto shadow-xl animate-bounce`}>
              <StepIcon className="w-12 h-12" />
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-black text-blue-900 leading-tight uppercase tracking-tighter">{welcomeSteps[currentStep].title}</h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed px-4">
                {welcomeSteps[currentStep].description}
              </p>
            </div>

            <div className="pt-8 space-y-4">
              <button 
                onClick={handleNext}
                className="w-full py-5 bg-[#009fe3] text-white rounded-2xl font-black text-xl hover:brightness-110 transition shadow-2xl shadow-blue-200 flex items-center justify-center space-x-3"
              >
                <span>{currentStep < welcomeSteps.length - 1 ? 'Continue' : 'Get Started'}</span>
                <ArrowRight className="w-6 h-6 text-[#ffcc00]" />
              </button>
              
              <div className="space-y-3">
                <button 
                  onClick={onLogin}
                  className="w-full py-4 bg-white border-2 border-[#009fe3] text-[#009fe3] rounded-2xl font-black text-lg hover:bg-blue-50 transition"
                >
                  Already have an account? Login
                </button>
                <button 
                  onClick={onComplete}
                  className="text-sm font-bold text-slate-400 hover:text-blue-900 transition underline decoration-2 underline-offset-4"
                >
                  Skip Introduction
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Registration form steps
  const registrationSteps = [
    {
      title: 'Create Account',
      description: 'Set up your login credentials',
      fields: [
        { key: 'email', label: 'Email Address', type: 'email', icon: Mail, required: true },
        { key: 'password', label: 'Password', type: 'password', icon: Lock, required: true },
        { key: 'confirmPassword', label: 'Confirm Password', type: 'password', icon: Lock, required: true },
      ]
    },
    {
      title: 'Personal Information',
      description: 'Tell us about yourself',
      fields: [
        { key: 'firstName', label: 'First Name', type: 'text', icon: User, required: true },
        { key: 'lastName', label: 'Last Name', type: 'text', icon: User, required: true },
        { key: 'phoneNumber', label: 'Phone Number (Optional)', type: 'tel', icon: Phone, required: false },
      ]
    },
    {
      title: 'Academic Details',
      description: 'Complete your profile (you can update later)',
      fields: [
        { key: 'campus', label: 'Campus', type: 'select', icon: MapPin, required: false, options: ['Gweru Main', 'Harare', 'Zvishavane'] },
        { key: 'major', label: 'Major/Program (Optional)', type: 'text', icon: GraduationCap, required: false },
        { key: 'graduationYear', label: 'Graduation Year (Optional)', type: 'text', icon: GraduationCap, required: false },
      ]
    }
  ];

  const currentRegistrationStep = registrationSteps[currentStep];

  return (
    <div className="min-h-screen bg-[#009fe3] flex items-center justify-center p-6">
      <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-scaleUp">
        <div className="p-8 md:p-12">
          {/* Progress */}
          <div className="flex justify-center space-x-3 mb-8">
            {registrationSteps.map((_, i) => (
              <div 
                key={i} 
                className={`h-2 rounded-full transition-all duration-500 ${i === currentStep ? 'w-10 bg-[#ffcc00]' : i < currentStep ? 'w-6 bg-green-500' : 'w-2 bg-slate-200'}`}
              ></div>
            ))}
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-blue-900 leading-tight uppercase tracking-tighter mb-2">
              {currentRegistrationStep.title}
            </h2>
            <p className="text-slate-500 font-medium">{currentRegistrationStep.description}</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6 mb-8">
            {currentRegistrationStep.fields.map((field) => {
              const Icon = field.icon;
              const value = formData[field.key as keyof typeof formData];
              const error = errors[field.key];

              return (
                <div key={field.key}>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    {field.label}
                  </label>
                  <div className="relative">
                    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                    {field.type === 'select' ? (
                      <select
                        value={value}
                        onChange={(e) => updateFormData(field.key, e.target.value)}
                        className={`w-full pl-12 pr-4 py-4 bg-slate-50 border-2 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition font-semibold ${error ? 'border-red-300' : 'border-slate-100'}`}
                      >
                        <option value="">Select {field.label}</option>
                        {field.options?.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        value={value}
                        onChange={(e) => updateFormData(field.key, e.target.value)}
                        placeholder={`Enter your ${field.label.toLowerCase()}`}
                        className={`w-full pl-12 pr-4 py-4 bg-slate-50 border-2 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none transition font-semibold ${error ? 'border-red-300' : 'border-slate-100'}`}
                      />
                    )}
                  </div>
                  {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                </div>
              );
            })}
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black hover:bg-slate-200 transition flex items-center justify-center space-x-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
            )}
            <button
              onClick={handleNext}
              className={`flex-1 py-4 bg-[#009fe3] text-white rounded-2xl font-black hover:brightness-110 transition shadow-xl flex items-center justify-center space-x-3 ${currentStep === 0 ? 'w-full' : ''}`}
            >
              <span>{currentStep < registrationSteps.length - 1 ? 'Next' : 'Complete Registration'}</span>
              {currentStep < registrationSteps.length - 1 ? (
                <ArrowRight className="w-5 h-5 text-[#ffcc00]" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-[#ffcc00]" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
