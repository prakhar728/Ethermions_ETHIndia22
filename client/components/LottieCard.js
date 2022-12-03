import React, { useEffect, useRef } from "react";
function LottieCard({ src }) {
  const ref = useRef(null);
  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });
  return (
    <div style={{ width: "550px" }}>
      <lottie-player
        id="firstLottie"
        ref={ref}
        autoplay
        loop
        mode="normal"
        width="500"
        height="500"
        src={src}
      />
    </div>
  );
}

export default LottieCard;

