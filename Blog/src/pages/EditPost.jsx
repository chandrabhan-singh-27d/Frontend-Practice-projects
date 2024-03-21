import { useEffect, useState } from "react"
import postService from "../appwrite/appwritePostConf"
import { PostForm, Container } from '../components'
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
    const [post, setPost] = useState();
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            if (slug) {
                try {
                    const postRes = await postService.getPost(slug);
                    if (postRes) {
                        setPost(postRes)
                    }
                } catch (error) {
                    console.log("Error in getting post to edit: ", error);
                    throw error;
                }

            } else {
                navigate("/")
            }
        })()
    }, [slug, navigate])
    return post ? (
        <div className="py-8">
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost