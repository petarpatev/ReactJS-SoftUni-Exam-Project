import { useEffect, useState, useContext } from "react"
import { modalContext } from "../../contexts/modal";
import * as articleService from "../../api/articles"

import LatestArticle from "../article/LatestArticle";
import Modal from "../modal/Modal";

export default function Home() {

    const [latestArticles, setLatestArticles] = useState([]);
    const { isOpen, setIsOpenWrapper } = useContext(modalContext);
    const [error, setError] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const latestArticles = await articleService.getLatestThree();
                setLatestArticles(latestArticles);
                setError('');
            } catch (err) {
                console.error("Error fetching latest games:", err);
                setError("Failed to load the latest games! Please try again!");
                setIsOpenWrapper(true);
            }
        })()
    }, [])

    return (
        <section id="home-main">
            {isOpen && <Modal setIsOpen={setIsOpenWrapper} errMessage={error} />}
            <div className="home-main-title">
                <h2>Be creator of your own feature</h2>
                <h3>Create article</h3>
            </div>
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