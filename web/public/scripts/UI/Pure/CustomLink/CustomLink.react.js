import './CustomLink.less'
import React from 'react'
import _b from 'bem-cn'

export default function ({ link, children, className, faClassName, blank }) {
    const block = _b('CustomLink');

    return (
        <a  href={link} 
            target={blank ? "_blank" : ""}
            className={block().mix(className)}>
            <i  className={block('icon').mix(['fa', faClassName])} 
                aria-hidden="true"></i>
            {children}
        </a>
    )
}