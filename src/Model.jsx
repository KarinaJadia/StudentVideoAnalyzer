const { GoogleGenAI } = require("@google/generative-ai");
const ai = new GoogleGenAI(process.env.REACT_APP_GEMINI_API_KEY);
const model = ai.getGenerativeModel({ model: 'gemini-2.5-flash'});

if (type = "upload") {
    const videoinfo = [
       //question asked in muffin needs to be brought in from state
        {
            fileData: {
                fileUri: "https://www.youtube.com/watch?v=9hE5-98ZeCg"
              } 
        }
    ]   
}
else{
    const videoinfo = await ai.files.upload({
        file: "path/to/sample.mp4", //need to bring in file from db
        config: { mimeType: "video/mp4" },
      });
}


export const generateContent = async (videoinfo) => {
    const result = await model.generateContent(videoinfo);
    console.log(result.response.text());
    return result.response.text; // return the response
}

async function main() {
const contents = [
  {
    role: 'user',
    parts: [
      {
        fileData: {
          fileUri: 'https://www.youtube.com/watch?v=9hE5-98ZeCg',
          mimeType: 'video/*',
        },
        videoMetadata: {
          startOffset: '40s',
          endOffset: '80s',
        }
      }
    ],
  },
];

const response = await ai.models.generateContent({
  model,
  contents,
});

console.log(response.text)

}