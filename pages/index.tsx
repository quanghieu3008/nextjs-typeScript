import Link from 'next/link'
// fake
type Props = {
    articles: []
}
let client: any = require('contentful').createClient({
    space: process.env.NEXT_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_CONTENTFUL_ACCESS_TOKEN,
})
export async function getStaticProps() {
    let data: any = await client.getEntries({
        content_type: 'blogNextjs'
    })
    return {
        props: {
            articles: data.items
        }
    }
}
// fake
const IndexPage = ({ articles }: any) => {
    console.log(articles, "log ger");

    return (
        <div>

            {/* <div>

                {documentToReactComponents(articles.fields.content)}
            </div> */}
            {/* {
            articles.map((item: object, key: number) => {
                console.log(item, "okeoekookeoe");

                return ( */}

            <ul>
                {articles.map((article: any, key: number) => (
                    <li key={key}>
                        <Link href={'/detailBlogs/' + article.fields.slug}>
                            <a>{article.fields.date}</a>
                        </Link>
                    </li>
                ))}
            </ul>
            {/* )
            })} */}

        </div>

    )
}

export default IndexPage
