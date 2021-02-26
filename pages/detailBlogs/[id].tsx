import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from "@contentful/rich-text-types";
import Image from "next/image";
import Example from '../../components/comment'
import Layout from '../../components/Layout';
let client: any = require('contentful').createClient({
    space: process.env.NEXT_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_CONTENTFUL_ACCESS_TOKEN,
})
type Props = {
    articles: [],
    params: any
}
export async function getStaticPaths() {
    let data: any = await client.getEntries({
        content_type: 'blogNextjs'
    })
    console.log(data, "show log ::::::::::");

    return {
        paths: data.items.map((item: any) => ({
            params: { id: item.fields.slug }
        })), fallback: false
    }
}
export async function getStaticProps({ params }: any) {

    console.log(params, "ttttttttttttttttt");

    let data: any = await client.getEntries({
        content_type: 'blogNextjs',
        'fields.slug': params?.id
    })
    return {
        props: {
            articles: data.items[0],
            test: data.items[0].fields.slug,
        }
    }

}


export default function detailBlogs({ articles, test }: any) {
    console.log(articles, "log content text");
    console.log(test);

    return (
        <Layout>
            <div>
                <div>

                    {documentToReactComponents(articles.fields.content,
                        {
                            renderNode: {
                                [BLOCKS.EMBEDDED_ASSET]: node => {
                                    console.log(node, "log ssssssssssssssssss");
                                    return (<Image src={"https:" + node.data.target.fields.file.url}
                                        width={node.data.target.fields.file.details.image.width}
                                        height={node.data.target.fields.file.details.image.height} />)
                                }




                            }
                        }
                    )}
                    <div>

                        <Example test={test} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}