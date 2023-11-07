import React from 'react';
// add an import for the analyzeImage function
import { analyzeImage } from './azure-image-analysis';

// Create a simple gui with:
// A title of "Computer Vision"
// A text box to enter the URL of the image to be analyzed or the prompt of the image to generate with a label
// A button to trigger the image analysis and one to trigger image generation
// Ensure to hold the UI and to have a processing indicator while the analysis is running
// Display the results using the DisplayResults function
function App() {
    const [imageUrl, setImageUrl] = React.useState("");
    const [imageDescription, setImageDescription] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const handleImageUrlChange = (event) => {
        setImageUrl(event.target.value);
    };

    const handleAnalyzeImage = () => {
        setIsLoading(true);
        analyzeImage(imageUrl)
            .then((description) => {
                setImageDescription(description);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div>
            <h1>Computer Vision</h1>
            <label>Image URL:</label>
            <input type="text" value={imageUrl} onChange={handleImageUrlChange} />
            <button onClick={handleAnalyzeImage}>Analyze Image</button>
            {isLoading && <p>Loading...</p>}
            {imageDescription && <DisplayResults imageUrl={imageUrl} imageDescription={imageDescription} />}
        </div>
    );
}

// add a 'DisplayResults' function to display the results of the API call in a readable format, along with the URL of the processed image
function DisplayResults(props) {
    return (
        <div>
            <h2>Results</h2>
            <p>Image URL: {props.imageUrl}</p>
            <p>Image description: {props.imageDescription}</p>
            <p><img alt={props.imageDescription} src={props.imageUrl}/></p>
        </div>
    );
}

export default App;
