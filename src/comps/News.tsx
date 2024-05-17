import { useEffect, useState } from 'react';
import { get_stock_tags } from '../scripts/StockMarket';
import '../style/News.css'

type news = {
    header: string;
    text: string;
    event: CallableFunction;
}

enum newstypes { MERGER }

let news_amount = 0;
const generate_article = () => {
    const tags = get_stock_tags();
    const rnum = () => { return Math.ceil(Math.random() * tags.length) - 1 };
    const stocka = tags[rnum()], stockb = tags[rnum()];
    let article: news = { header: "", text: "", event: () => { } };
    article.header = stocka + " and " + stockb;
    article.text = "Friends forever! Lovers, when?";
    article.event = () => { };
    return article;
}

export default function NewsTag() {
    const [news, setNews] = useState(Array<news>);
    const [amount, setAmount] = useState(0);
    const new_article = (article: news) => {
        news.push(article);
        setNews(news);
        if (news.length >= 9) {
            news.shift();
        };
        setAmount(amount => amount + 1);
    }

    useEffect(() => {
        new_article(generate_article());
    }, [])

    return (
        <>
            <div className="NewsContainer" id='NewsContainer'>
                {news.map(nclip =>
                    <div className="NewsClipping">
                        <h3>{nclip.header}</h3>
                        <p>{nclip.text}</p>
                    </div>
                )}
            </div>
        </>
    );
}
