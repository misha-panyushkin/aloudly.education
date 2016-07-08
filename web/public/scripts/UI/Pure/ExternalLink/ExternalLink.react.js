import './ExternalLink.less'
import React from 'react'
import _b from 'bem-cn'

export default function ({ link, children, className }) {
    const block = _b('ExternalLink');

    return (
        <a  href={link} 
            target="_blank"
            className={block().mix(className)}>
            <i  className={block('icon').mix('fa fa-external-link')} 
                aria-hidden="true"></i>
            {children}
        </a>
    )
}