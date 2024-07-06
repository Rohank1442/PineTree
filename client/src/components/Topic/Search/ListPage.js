import User from './Userr'

const ListPage = ({ searchResults }) => {
    const results = searchResults?.map(user => <User key={user._id} user={user} />)
    const content = results?.length ? results : <article>No Matching Posts</article>
    return (
        <div className="bg-[#151c25] gradient-bg-artworks">
            <div className="w-4/5 py-10 mx-auto">
                <h4 className="text-white text-3xl font-bold uppercase text-gradient">
                    Latest Quiz
                </h4>
                <main className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-3 py-2.5">{content}</main>
            </div>
        </div >
    )
}

export default ListPage;