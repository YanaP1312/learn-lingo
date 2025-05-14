const HeroImage = () => {
  return (
    <div>
      <img
        srcSet="/image/block@2x.jpg 2x, /image/block.jpg 1x"
        src="/image/block.jpg"
        alt="Girl with laptop"
        width="568"
        height="530"
      />
    </div>
  );
};
export default HeroImage;
