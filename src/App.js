import "./App.css";
import Slider from "./Slider";
import SidebarItem from "./SidebarItem";
import { useState } from "react";
import { storage } from "./firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const DEFAULT_OPTIONS = [
    {
        name: "Brightness",
        property: "brightness",
        value: 100,
        range: {
            min: 0,
            max: 200,
        },
        unit: "%",
    },
    {
        name: "Contrast",
        property: "contrast",
        value: 100,
        range: {
            min: 0,
            max: 200,
        },
        unit: "%",
    },
    {
        name: "Saturation",
        property: "saturate",
        value: 100,
        range: {
            min: 0,
            max: 200,
        },
        unit: "%",
    },
    {
        name: "Grayscale",
        property: "grayscale",
        value: 0,
        range: {
            min: 0,
            max: 100,
        },
        unit: "%",
    },
    {
        name: "Invert",
        property: "invert",
        value: 0,
        range: {
            min: 0,
            max: 100,
        },
        unit: "%",
    },
    {
        name: "Opacity",
        property: "opacity",
        value: 100,
        range: {
            min: 0,
            max: 100,
        },
        unit: "%",
    },
    {
        name: "Sepia",
        property: "sepia",
        value: 0,
        range: {
            min: 0,
            max: 100,
        },
        unit: "%",
    },
    {
        name: "Hue Rotate",
        property: "hue-rotate",
        value: 0,
        range: {
            min: 0,
            max: 360,
        },
        unit: "deg",
    },
    {
        name: "Blur",
        property: "blur",
        value: 0,
        range: {
            min: 0,
            max: 20,
        },
        unit: "px",
    },
];

function App() {
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
    const [options, setOptions] = useState(DEFAULT_OPTIONS);
    const selectedOption = options[selectedOptionIndex];
    const [image, setImage] = useState([]);
    const [imageList, setImageList] = useState([]);

    function uploadImage() {
        if (image == null) return;
        const imageRef = ref(storage, `images/${v4() + image.name}`);
        uploadBytes(imageRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageList((prev) => [url, ...prev]);
            });
        });
    }

    const handleSLiderChange = ({ target }) => {
        setOptions((prevOptions) => {
            return prevOptions.map((option, index) => {
                if (index !== selectedOptionIndex) return option;
                return { ...option, value: target.value };
            });
        });
    };

    const getImageStyle = () => {
        const filters = options.map((option) => {
            return `${option.property}(${option.value}${option.unit})`;
        });

        return { filter: filters.join(" ") };
    };

    return (
        <div className="container">
            <div className="main-image" style={getImageStyle()}>
                <img key={imageList} src={imageList} alt="" />
            </div>
            <Slider
                min={selectedOption.range.min}
                max={selectedOption.range.max}
                value={selectedOption.value}
                handleChange={handleSLiderChange}
                className="slider" id="myRange"
            />
            <div className="sidebar">
                {options.map((option, index) => {
                    return (
                        <SidebarItem
                            key={index}
                            name={option.name}
                            active={index === selectedOptionIndex}
                            handleClick={() => setSelectedOptionIndex(index)}
                        />
                    );
                })}
            </div>
            
            <div className="upload">
                <label htmlFor="file" class="custom-file-upload">
                    <input
                        type="file"
                        name="file"
                        onChange={(e) => {
                            setImage(e.target.files[0]);
                        }}
                    />
                </label>

                <button onClick={uploadImage}>Upload Image</button>
            </div>
        </div>
    );
}

export default App;
