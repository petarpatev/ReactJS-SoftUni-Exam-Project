import { useEffect, useState } from "react"

import * as articleService from "../../api/articles"

import Article from "../article/Article";

export default function Catalog() {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        (async () => {
            const articles = await articleService.getAll();
            setArticles(articles.reverse())
        })()
    }, [])

    return (
        <section id="catalog-page">
            <h1>All Articles</h1>
            {articles.length > 0
                ? articles.map(article => <Article key={article._id} article={article} />)
                : <h3 className="no-articles">No articles yet</h3>
            }
        </section>
    )
}