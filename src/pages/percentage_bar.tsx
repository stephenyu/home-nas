import * as React from "react";

export const PercentageBar = ({
  used,
  total,
  content
}: {
  used: number;
  total: number;
  content: string;
}) => {
  const percentage = Math.floor((used / total) * 100);
  const style = { width: `${percentage}%` };

  const className = ["percentageBarInner"]

  if (percentage < 20) {
    className.push("usageOne");
  } else if (percentage < 40) {
    className.push("usageTwo");
  } else if (percentage < 60) {
    className.push("usageThree");
  } else if (percentage < 80) {
    className.push("usageFour");
  } else {
    className.push("usageFive");
  }

  return (
    <div className="percentageBar">
      <div className={className.join(" ")} style={style}>
        <span>{content}</span>
      </div>
    </div>
  );
};
