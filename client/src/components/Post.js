export default function Post({title, summary, cover, content, createdAt, author}){
    return (
        <div className="post">
            <div className="image">
                <img
                src="https://th.bing.com/th/id/OIP.rvSWtRd_oPRTwDoTCmkP5gAAAA?pid=ImgDet&rs=1"
                alt={title}
                />
            </div>
            <div className="text">
                <h2>{title}</h2>
                <p className="info">
                    <a className="author">{author.username}</a>
                    <time>{new Date(createdAt).toDateString()}</time>
                </p>
                <p className="summary">
                {summary}
                </p>
            </div>
        </div>
    )

}