// Import the required modules and data
import { careerPaths } from '../data/careerPaths';

export function analyzeQuizResults(answers) {
  // Simple analysis based on answer patterns
  const strengths = [];
  
  if (answers[0] === 0 || answers[2] === 0) strengths.push('Technical Problem Solving');
  if (answers[0] === 1 || answers[2] === 1) strengths.push('Creative Thinking');
  if (answers[0] === 2 || answers[2] === 2) strengths.push('People Skills');
  if (answers[0] === 3 || answers[2] === 3) strengths.push('Analytical Thinking');

  // Determine career paths based on answers
  const recommendedPaths = careerPaths.filter((path) => {
    const matchingSkills = path.skills.filter(skill => 
      strengths.some(strength => skill.toLowerCase().includes(strength.toLowerCase()))
    );
    return matchingSkills.length > 0;
  });

  const recommendations = [
    'Consider taking online courses in your areas of interest',
    'Look for internship opportunities in your preferred field',
    'Connect with professionals in your chosen career path',
    'Build a portfolio showcasing your skills and projects'
  ];

  return {
    careerPaths: recommendedPaths,
    strengths,
    recommendations
  };
}
