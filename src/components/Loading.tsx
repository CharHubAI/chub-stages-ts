import '../index.scss';


export const Loading = () => {

    return <div className="outer">
        <div className="middle">
            <div className="spinner">
                <img
                    className="loading-spinner"
                    src="https://avatars.charhub.io/flower.png"
                />
            </div>
        </div>
    </div>
}

