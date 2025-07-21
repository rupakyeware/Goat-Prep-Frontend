import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function RangeSlider({
    min = 0,
    max = 100,
    value,
    label,
    onChange,
    step = 1,
    className = ""
}) {
    return (
        <div className="flex items-center gap-2 w-full">
            <Slider
                className="flex-grow"
                min={min}
                max={max}
                value={value}
                onChange={onChange}
                step={step}
                trackStyle={{ backgroundColor: '#F4C430' }}
                handleStyle={{
                    borderColor: '#F4C430',
                    backgroundColor: '#F4C430'
                }}
                railStyle={{ backgroundColor: '#1f2937' }}
            />
            <span className="text-white w-10 text-right">{value ?? 0}</span>
        </div>
    );
}