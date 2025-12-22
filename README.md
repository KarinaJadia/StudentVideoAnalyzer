# Frontend & User Experience Documentation 

 

## Table of Contents 

1. [Project Overview](#project-overview) 

2. [Component Architecture](#component-architecture) 

3. [User Interface Flow](#user-interface-flow) 

4. [Component Documentation](#component-documentation) 

5. [Styling System](#styling-system) 

6. [State Management](#state-management) 

7. [Navigation System](#navigation-system) 

8. [User Journey Mapping](#user-journey-mapping) 

9. [Running the Application](#running-the-application)
10. [Future Improvements](#future-improvements)
 

 

 

--- 

 

## Project Overview 

 

**StudentVideoAnalyzer** is a React-based web application that enables students to upload lecture videos, generate AI-powered transcripts, and receive intelligent summaries. The frontend is built with React 19.1.1 and utilizes modern JavaScript (ES6+) with Vite as the build tool. 
App developed by Karina Jadia, Faiyhaa Sydra-Saulat, Priya Jeyaprakash, Neev Vachhani, and Xinyi Li for an independent study at UConn under the advisement of Dr. Lina Kloub. 

→ jira board: https://aivideosummary.atlassian.net/jira/software/projects/SCRUM/boards/1 

→ figma board: https://www.figma.com/design/4uKw8gooJb9447BtTdPLcM/AI-Analyzer?node-id=0-1&t=b4vfehAv9AsIkISk-1 
 

### Key Features 

- User authentication and session management 

- Video file upload with drag-and-drop interface 

- Real-time transcript generation and editing 

- AI-powered lecture summarization 

- Interactive chatbot ("Muffin") for Q&A 

- File management and chat history 

- Admin dashboard with user permissions 

 

--- 

 

## Component Architecture 

 

### Main Application Structure 

``` 

src/ 

├── App.jsx # Main application container 

├── main.jsx # React application entry point 

├── apis.js # API communication layer 

├── index.css # Global styles 

└── components/ 

├── Login.jsx # Authentication component 

├── Home.jsx # Landing page 

├── Transcription.jsx # Main lecture processing 

├── FileExplorer.jsx # Chat history management 

├── Admin.jsx # Administrative interface 

├── About.jsx # Information page 

└── ApiTester.jsx # Development testing tool 

``` 

 

### Component Hierarchy 

``` 

App (Root) 

├── Navbar (conditional) 

├── Router Component (pages) 

│ ├── Login 

│ ├── Home 

│ ├── Transcription 

│ ├── FileExplorer 

│ ├── Admin 

│ └── About 

└── Footer (conditional) 

``` 

 

--- 

 

## User Interface Flow 

 

### Authentication Flow 

1. **Login Page**: Users enter credentials 

2. **Credential Validation**: API authentication check 

3. **Session Creation**: Store user ID and redirect to Home 

4. **Remember Me**: Optional credential persistence 

 

### Main Application Flow 

1. **Home Page**: Video upload or link input 

2. **Processing**: File upload → Transcription → Storage 

3. **Transcription Page**: View/edit transcript, generate summary 

4. **Chat Interface**: Interactive Q&A with AI assistant 

5. **File Management**: Access previous lectures and chats 

 

--- 

 

## Component Documentation 

 

### App.jsx - Main Container 

**Purpose**: Root component managing application state and routing 

 

**Key State Variables**: 

- `currentPage`: Current active page/route 

- `userId`: Authenticated user identifier (persisted in localStorage) 

- `currentChatId`: Active chat session identifier 

 

**Props Flow**: 

```javascript 

// State passed to child components 

setCurrentPage → All navigation components 

userId → FileExplorer, Admin, Transcription 

currentChatId → Transcription 

setCurrentChatId → FileExplorer 

``` 

 

**Conditional Rendering**: 

- Navbar: Hidden on login page 

- Footer: Hidden on login and transcription pages 

- Page Components: Rendered based on currentPage state 

 

### Login.jsx - Authentication 

**Purpose**: User authentication with credential validation 

 

**Features**: 

- Form validation (username and password required) 

- "Remember Me" functionality with localStorage persistence 

- Loading states during authentication 

- Error handling with user feedback 

 

**State Management**: 

```javascript 

const [username, setUsername] = useState(""); 

const [password, setPassword] = useState(""); 

const [isLoading, setIsLoading] = useState(false); 

const [rememberMe, setRememberMe] = useState(false); 

``` 

 

**User Experience Elements**: 

- Auto-fill saved username if "Remember Me" was previously checked 

- Disabled form elements during loading 

- Clear error messages for failed authentication 

- Smooth transition to main application on success 

 

### Home.jsx - Landing Page 

**Purpose**: Entry point for new video uploads and AI interactions 

 

**Key Features**: 

- Video link input field 

- File upload with custom styled input 

- "Ask Muffin" prompt interface 

- Clean, welcoming design 

 

**UI Components**: 

- Upload card with dual input options (link/file) 

- Prompt container for AI questions 

- Responsive design with CSS Grid layout 

 

### Transcription.jsx - Core Functionality 

**Purpose**: Main workspace for video processing and AI interactions 

 

**State Management**: 

```javascript 

const [videoUrl, setVideoUrl] = useState(null); 

const [transcript, setTranscript] = useState(""); 

const [summary, setSummary] = useState(""); 

const [loadingTranscript, setLoadingTranscript] = useState(false); 

const [loadingSummary, setLoadingSummary] = useState(false); 

const [muffinQuestion, setMuffinQuestion] = useState(""); 

const [muffinAnswer, setMuffinAnswer] = useState(""); 

``` 

 

**User Interface Sections**: 

1. **Video Player**: HTML5 video element for uploaded content 

2. **Upload Area**: Drag-and-drop interface with file selection 

3. **Transcript Editor**: Editable textarea for transcript content 

4. **AI Summary**: Generated summary display area 

5. **Muffin Chat**: Q&A interface with context awareness 

 

**Loading States**: 

- Transcript generation: "Loading transcript..." message 

- Summary generation: "Generating summary..." with disabled button 

- AI responses: "Thinking..." indicator 

 

### FileExplorer.jsx - Chat History 

**Purpose**: Manage and navigate previous lecture sessions 

 

**Features**: 

- Chronological list of user's chat sessions 

- Formatted creation dates with locale-specific formatting 

- Click-to-open functionality for accessing previous sessions 

- Navigation back to transcription page 

 

**Data Formatting**: 

```javascript 

const formatted = res.map(item => { 

const date = item.created_date ? new Date(item.created_date) : null; 

const created = date 

? date.toLocaleString(undefined, {  

year: "numeric",  

month: "2-digit",  

day: "2-digit",  

hour: "2-digit",  

minute: "2-digit",  

hour12: true  

}) 

: "N/A"; 

 

return { 

id: item.chat_id, 

title: item.chat_title, 

created 

}; 

}); 

``` 

 

### Admin.jsx - Administrative Dashboard 

**Purpose**: User management and system analytics (admin users only) 

 

**Dashboard Components**: 

1. **Analytics Cards**: 

- Bar chart visualization (placeholder implementation) 

- User activity metrics ("125 Users Active This Month") 

- Calendar integration 

 

2. **User Management**: 

- User list with permission checkboxes 

- Read-only permission display 

- Organized permission categories: 

- Access Admin Page 

- Save Transcript 

- Upload Videos 

 

**Current Implementation Note**: Uses mock data for demonstration purposes 

 

--- 

 

## Styling System 

 

### Color Palette 

The application follows a cohesive pastel theme with UConn branding: 

 

```css 

/* Primary Colors */ 

--pastel-purple: #C6A9E0 

--pastel-green: #A7E3C3 

--pastel-orange: #FFD6A5 

--pastel-pink: #F9C6D0 

--pastel-blue: #A5D8FF 

--pastel-red: #FFADAD 

 

/* Brand Colors */ 

--uconn-blue: #000E2F 

--uconn-white: #FFFFFF 

 

/* Neutral Colors */ 

--light-grey: #979797 

--black: #000000 

``` 

 

### Typography System 

**Primary Fonts**: 

- **IBM Plex Sans**: Headings and UI elements 

- **Poppins**: Body text and form inputs 

 

**Font Specifications**: 

```css 

/* Main Headings */ 

font-family: IBM Plex Sans, Bold 

font-size: 24px 

color: #000E2F 

 

/* Subheadings */ 

font-family: IBM Plex Sans, Regular 

font-size: 15px 

color: #979797 

 

/* Form Labels */ 

font-family: Poppins, Medium 

font-size: 14px 

color: #000000 

 

/* Body Text */ 

font-family: Poppins, Regular 

font-size: 15-16px 

color: #000000 

 

/* Buttons */ 

font-family: IBM Plex Sans, SemiBold 

font-size: 16px 

background: linear-gradient(#A5D8FF, #C6A9E0) 

``` 

 

### Component-Specific Styles 

Each component has its dedicated CSS file following the naming convention `ComponentName.css`: 

 

- `App.css` - Global layout and navbar 

- `Login.css` - Authentication form styling 

- `Home.css` - Landing page layout 

- `Transcription.css` - Main workspace styling 

- `FileExplorer.css` - Chat history interface 

- `Admin.css` - Dashboard and admin panel 

 

--- 

 

## State Management 

 

### Global State (App Level) 

```javascript 

// User Session 

const [userId, setUserId] = useState(localStorage.getItem("user_id")); 

 

// Navigation 

const [currentPage, setCurrentPage] = useState('login'); 

 

// Active Session 

const [currentChatId, setCurrentChatId] = useState(null); 

``` 

 

### Component-Level State Patterns 

 

**Form State Pattern** (Login, Upload forms): 

```javascript 

const [inputValue, setInputValue] = useState(""); 

const [isLoading, setIsLoading] = useState(false); 

const [error, setError] = useState(null); 

``` 

 

**Async Operation Pattern** (API calls): 

```javascript 

const [data, setData] = useState(null); 

const [loading, setLoading] = useState(false); 

const [error, setError] = useState(null); 

 

// Usage 

setLoading(true); 

try { 

const result = await apiCall(); 

setData(result); 

} catch (err) { 

setError(err.message); 

} finally { 

setLoading(false); 

} 

``` 

 

### Local Storage Usage 

```javascript 

// User session persistence 

localStorage.setItem("user_id", userId); 

localStorage.getItem("user_id"); 

 

// Remember Me functionality 

localStorage.setItem("rememberedUsername", username); 

localStorage.removeItem("rememberedUsername"); 

``` 

 

--- 

 

## Navigation System 

 

### Navigation Structure 

```javascript 

const navigationItems = [ 

{ name: 'Home', page: 'Home' }, 

{ name: 'Transcription', page: 'transcription' }, 

{ name: 'Files', page: 'FileExplorer' }, 

{ name: 'About', page: 'About' }, 

{ name: 'API Tester', page: 'API Tester' }, // Development only 

{ name: 'Logout ➜]', page: 'login' } 

]; 

``` 

 

### Navigation Behavior 

- **Conditional Display**: Navbar hidden on login page 

- **Active State**: No visual active state currently implemented 

- **Logout**: Clears session and returns to login 

- **Page Transitions**: Instant state-based rendering (no animations) 

 

### Inter-Component Navigation 

```javascript 

// From FileExplorer to Transcription with chat context 

const handleChatClick = (chatId) => { 

setCurrentChatId(chatId); 

setCurrentPage('transcription'); 

}; 

 

// From Home to specific features 

setCurrentPage('transcription'); // Upload new video 

setCurrentPage('FileExplorer'); // View chat history 

``` 

 

--- 

 

## User Journey Mapping 

 

### New User Journey 

1. **Landing**: Login page with credential input 

2. **Authentication**: Validation and session creation 

3. **Welcome**: Home page with upload options 

4. **Upload**: File selection or link input 

5. **Processing**: Automatic transcription generation 

6. **Review**: Transcript editing and summary generation 

7. **Interaction**: Q&A with AI assistant 

8. **Management**: Save and organize lecture sessions 

 

### Returning User Journey 

1. **Quick Login**: Auto-filled credentials if "Remember Me" enabled 

2. **Dashboard**: Home page with recent activity 

3. **File Access**: Browse previous lectures via FileExplorer 

4. **Resume Session**: Continue from previous transcript/chat 

5. **New Content**: Upload additional lectures 

6. **Administration**: Access admin panel (if permitted) 

 

### Error Handling User Experience 

- **Authentication Errors**: Clear feedback with retry option 

- **Upload Failures**: Error messages with troubleshooting steps 

- **Processing Errors**: Graceful degradation with manual options 

- **Network Issues**: Offline indicators and retry mechanisms 

- **Permission Errors**: Appropriate access denied messages 

 

### Accessibility Considerations 

- **Keyboard Navigation**: Tab order and focus management 

- **Screen Readers**: Semantic HTML and ARIA labels 

- **Color Contrast**: High contrast ratios for text readability 

- **Responsive Design**: Mobile and tablet compatibility 

- **Loading States**: Clear indicators for processing operations 

 

### Performance Optimizations 

- **Lazy Loading**: Components loaded on-demand 

- **State Management**: Minimal re-renders with proper state updates 

- **API Caching**: Reduced redundant network requests 

- **File Handling**: Progressive upload with feedback 

- **Memory Management**: Cleanup of video elements and large files 

 

 

## Running the Application 

**Note: ** The frontend will not function without the Python backend + database running. Start the 	backend in a separate terminal before logging in. 

 

 

 	###System Requirements 

- **Node.js & Npm**: Required to run frontend locally 

- **Modern Browser**:  Chrome recommended 

 

###Install Frontend Dependencies: 

- **Official Node.js Download** 

- https://nodejs.org/en/download 

 

- ### Installing React (Via Vite or Create React App) 

- React itself is not “installed” globally --- is installed automatically when project is  

generated 

- **Using Vite ** 

- **Official Guide**: https://vitejs.dev/guide/ 

- **Official React Documentation**: https://react.dev/ 

 

### Cloning Project 

** Before running the application, clone the repository to your local machine ** 

 

- git clone https://github.com/KarinaJadia/StudentVideoAnalyzer.git 

- cd StudentVideoAnalyzer 

 

 

### Frontend Setup 

** Install Frontend Dependencies: npm install 

- make sure npm is up to date; this project uses node.js v22 

 

###Backend Setup (Required) 

- in a **separate terminal**, start the Python backend (main.py) from the ‘backend’ folder: 

- cd backend 

- python main.py 

 

The backend must be connected to a valid database for login and data storage to work. 

 

### Database Note 

                       -	The database connection currently used in the backend was created for the original project demo  

               and may expire (currently attached to a group member’s personal account) 

       -      If it no longer works you will need to: 

- Create your own database instance 

- Update the backend configuration ( see `backend/db_initialize.py and `tables.sql`) with your new 

                               New connection   

 

### Starting the Frontend 

                      With the backend running, return to the project root (if needed) and start the Vite dev server:                     

- npm run dev 


 ## Future Improvements 
 ** Our above documentation describes our MVP at the end of the semester. Included below are some future improvements we would've liked to work on:
 - Currently only accepts uploaded video files or video links; potential to include PDFs, lecture slides, etc
 - Functionality; there isn't an option to delete previously updated videos yet
 - "Ask Muffin" chatbox does not remember previous chats. More training needed to ensure the LLM can store memory and recall previously asked questions
 - Some more enhanced CSS styling for chat functionality
 - MFA implementation; we are using mock data to run our webapp and did not implement multi-factor authentications for it. But in the future, if real data is used, this would need to be considered and implemented.



 

**This documentation provides a comprehensive overview of the frontend architecture and user experience design for the StudentVideoAnalyzer application. Each component is designed with user-centered principles, ensuring intuitive navigation, clear feedback, and efficient task completion.** 
