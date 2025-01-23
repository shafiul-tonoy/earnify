import BestWorkers from "../components/BestWorkers";
import CustomTitle from "../components/CustomTitle";
import HowItWorks from "../components/HowItWorks";
import PlatformFeatures from "../components/PlatformFeaturres";
import Slider from "../components/Slider";
import Testimonial from "../components/Testimonial";
import WhyImportant from "../components/WhyImportant";

export default function Home(){
    return (
        <>
            <CustomTitle title="Earnify | home"/>
            <Slider />
            <BestWorkers />
            <Testimonial />
            <WhyImportant />
            <HowItWorks />
            <PlatformFeatures />
        </>
    );
}