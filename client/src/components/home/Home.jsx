import { useEffect, useState } from "react"
import * as articleService from "../../api/articles"

import LatestArticle from "../article/LatestArticle";

export default function Home() {

    const [latestArticles, setLatestArticles] = useState([]);

    useEffect(() => {
        (async () => {
            const latestArticles = await articleService.getLatestThree();
            setLatestArticles(latestArticles);
        })()
    }, [])

    return (
        <section id="welcome-world">
            <div className="welcome-message">
                <h2>Be creator of your own feature</h2>
                <h3>Create article</h3>
            </div>
            <img src="public/images/articlewall.jpg" alt="hero" />
            <div id="home-page">
                <h1>Latest Articles</h1>
                {latestArticles.length > 0
                    ? latestArticles.map(article => <LatestArticle key={article._id} latestArticle={article} />)
                    : <p className="no-articles">No games yet</p>
                }
            </div>
        </section>
    )
}