import { useState, createContext } from "react";

export const articleContext = createContext();

export const ArticleProvider = ({ children }) => {
    const [article, setArticle] = useState(null);

    function setArticleWrapper(data) {
        setArticle(data);
    }

    return (
        <articleContext.Provider value={{ article, setArticleWrapper }}>
            {children}
        </articleContext.Provider>
    )
}