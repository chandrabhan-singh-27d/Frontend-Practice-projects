import { useEffect, useState } from "react"
import { Container, PostCard } from "../components"
import postService from "../appwrite/appwritePostConf"

const AllPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const postsRes = await postService.getPostList([]);
                if (postsRes) setPosts(posts.documents);
            } catch (error) {
                console.log("error in getting posts list: ", error)
                throw error
            }
        })()

    }, [])

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map(post => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts