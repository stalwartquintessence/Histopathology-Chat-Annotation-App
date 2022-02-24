import "./App.css";
import { Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";
import AnnotationPage from "./Pages/AnnotationPage";

function App() {
    return (
        <div className="App">
            <Route path="/" component={HomePage} exact />
            <Route path="/chats" component={ChatPage} exact />
            <Route
                path="/chats/annotate"
                target="_blank"
                component={AnnotationPage}
                exact
            />
        </div>
    );
}

export default App;
