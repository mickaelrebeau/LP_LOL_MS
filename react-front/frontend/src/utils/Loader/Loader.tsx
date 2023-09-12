import "./Loader.css";
import loader from "../../assets/image/loader.gif"

const Loader = () => {
  return (

    <div className="loader">
    
    <img src={loader} alt="teemo" className="loader_image" /> 
      {/* loader 2 */}
      {/* <div className="anim2">
        <div className="anim2__rect1"></div>
        <div className="anim2__rect2"></div>
        <div className="anim2__rect3"></div>
        <div className="anim2__rect4"></div>
        <div className="anim2__rect5"></div>
      </div> */}



    </div>
  );
};

export default Loader;
