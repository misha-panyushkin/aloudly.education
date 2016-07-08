import './Article.less'
import React from 'react'
import _b from 'bem-cn'

export default function Article ({ title, children, _block }) {
    const block = _b('Article');
    let skinBlock = '';
    let skinBlockHeader = '';
    let skinBlockBody = '';
    
    if (_block) {
        skinBlock = _block().toString();
        skinBlockHeader = _block('header').toString();
        skinBlockBody = _block('body').toString();
    }

    return (
        <article
            className={block().mix(['selectable', skinBlock])}>
            <h2 className={block('header').mix(['cHeader', skinBlockHeader])}>
                {title}
            </h2>
            <div className={block('body').mix([skinBlockBody])}>
                {children}
            </div>
        </article>
    )
}