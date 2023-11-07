// a new function called analyzeImage that calls the Azure AI Vision service Image Analysis 4.0 API as documented here https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/how-to/call-analyze-image-40?pivots=programming-language-rest-api
// the endpoint is https://analyze-and-generate-images-dougal.cognitiveservices.azure.com/
// the key is afc25871ed7940af894ee1441756594e
// function should receive as input the image URL and return the JSON response of the API
function analyzeImage(imageUrl) { 
    const endpoint = "https://analyze-and-generate-images-dougal.cognitiveservices.azure.com/";
    
    const key = process.env.REACT_APP_SUB_KEY;
    
    const headers = {
        "Ocp-Apim-Subscription-Key": key,
        "content-type": "application/json"
    };
    const body = JSON.stringify({
        "url": imageUrl
    });
    return fetch(`${endpoint}computervision/imageanalysis:analyze?api-version=2023-02-01-preview&features=caption`, {
        method: 'POST',
        headers,
        body
    })
        .then(response => response.json())
        .then(response => response.captionResult.text)
}
// export funciton to be used in App.js
export { analyzeImage };