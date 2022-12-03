import React, { useEffect, useRef } from "react";
function LottieCard() {
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
        src="https://assets8.lottiefiles.com/private_files/lf30_iyicd2xy.json"
      />
    </div>
  );
}

export default LottieCard;
