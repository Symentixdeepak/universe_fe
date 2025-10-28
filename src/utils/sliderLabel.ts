export const getImportanceLabel = (value: number, stepNumber: number) => {

  if (stepNumber === 8) {

    switch (value) {
      case 1:
        return "Small, intimate gathering";
      case 2:
        return "Close group of friends";
      case 3:
        return "Moderate-sized social event";
      case 4:
        return "Big, energetic crowd";
      case 5:
        return "Large, lively groups";
      default:
        return "";
    }
  } else if (stepNumber === 9) {
    switch (value) {
      case 1:
        return "Routine is best";
      case 2:
        return "Prefer familiar";
      case 3:
        return "Mix it up";
      case 4:
        return "Like new things";
      case 5:
        return "Constant new experiences";
      default:
        return "";
    }
  } else {

    switch (value) {
      case 1:
        return "Not very important";
      case 2:
        return "Slightly important";
      case 3:
        return "Moderately important";
      case 4:
        return "Quite important";
      case 5:
        return "Very important";
      default:
        return "";
    }
  }

};