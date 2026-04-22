function calculateATS(resumeText, jobDescription) {
  const jdWords = jobDescription.toLowerCase().split(/\W+/);
  const resume = resumeText.toLowerCase();

  const uniqueKeywords = [...new Set(jdWords)].filter(w => w.length > 2);

  let matched = [];
  let missing = [];

  uniqueKeywords.forEach(word => {
    if (resume.includes(word)) {
      matched.push(word);
    } else {
      missing.push(word);
    }
  });

  const score = ((matched.length / uniqueKeywords.length) * 100).toFixed(2);

  //  smart suggestions
  let suggestions = [];

  if (missing.length > 0) {
    suggestions.push(`Add missing skills: ${missing.slice(0, 5).join(", ")}`);
  }

  if (!resume.includes("project")) {
    suggestions.push("Add project experience section");
  }

  if (!resume.includes("developed") && !resume.includes("built")) {
    suggestions.push("Use action verbs like 'developed', 'implemented'");
  }

  if (resume.length < 300) {
    suggestions.push("Increase resume content with more details");
  }

  return {
    score,
    matched,
    missing,
    suggestions
  };
}


module.exports = { calculateATS }; 