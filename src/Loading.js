import React from 'react'

function Loading({src}) {
    return (
        <div className="spinner">
            <div className="lock_body" />
            <img className="load_image" src={src} alt="" />
        </div>
    )
}

export default Loading;

export function LoadingReleaseBody({ ...restProps}) {
    return <div className="release_body"/>
}
