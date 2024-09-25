import React from "react";

function WorkExperience(props) {
  const startDate = new Date(props.startDate);
  const endDate = props.endDate ? new Date(props.endDate) : new Date();
  const tillWorking = props.tillWorking;
  const startAndEndDate = props.startAndEndDate;
  const experienceInMilliseconds = endDate - startDate;
  const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;
  const experienceInYears = Math.floor(
    experienceInMilliseconds / millisecondsInYear
  );

  // Calculate the remaining milliseconds after subtracting the years
  const remainingMilliseconds = experienceInMilliseconds % millisecondsInYear;

  // Convert remaining milliseconds to months
  const millisecondsInMonth = millisecondsInYear / 12;
  const experienceInMonths = Math.floor(
    remainingMilliseconds / millisecondsInMonth
  );

  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      {/* {experienceInYears} years and {experienceInMonths} months */}

      <>
        {tillWorking ? (
          <>{formatDate(startDate)} - Present</>
        ) : (
          <>
            {startAndEndDate ? (
              <>
                {formatDate(startDate)} - {formatDate(endDate)} ({" "}
                {experienceInYears !== 0 && <>{experienceInYears} years</>}{" "}
                {experienceInMonths !== 0 && <>{experienceInMonths} months</>} )
              </>
            ) : (
              <>
                {experienceInYears !== 0 && <>{experienceInYears} years</>}{" "}
                {experienceInMonths !== 0 && <>{experienceInMonths} months</>}
              </>
            )}
          </>
        )}
      </>
    </>
  );
}

export default WorkExperience;
