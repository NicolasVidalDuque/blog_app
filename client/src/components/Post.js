
export default function Post(props){
    const {_id, title, summary, cover, content, createdAt, author} = props.post;
    return (
        <div className="post" onClick={() => props.redirect(_id)}>
            <div className="image">
                <img
                src={'http://myblog.onrender.com/'+cover}
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
