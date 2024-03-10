import CreatePostForm from "../../components/Forms/CreatePostForm/CreatePostForm"

const CommunityPage = ({ getUser }) => {
    return (
        <div className="CommunityPage">
            <CreatePostForm getUser={getUser} />
        </div>
    )
}

export default CommunityPage
