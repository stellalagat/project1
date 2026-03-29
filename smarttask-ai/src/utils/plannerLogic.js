export const generatePlan = (subjects, hours) => {
  if (!subjects.length || hours <= 0) return [];

  const plan = [];
  const timePerSubject = Math.floor(hours / subjects.length);

  subjects.forEach((subject, index) => {
    plan.push({
      id: index,
      subject,
      duration: timePerSubject,
    });
  });

  return plan;
};