'use client'

import classNames from 'classnames'


/**
 * @typedef {'narrow' | 'extra-narrow' | 'fit-screen' } Content
 */

/**
 * Container
 * @param {object} props
 * @param {children} props.children
 * @param {string} props.className
 * @param {boolean} props.center
 * @param {Content} props.content
 */
const Container = ({ children, className, center, content }) => {
    const classes = classNames('container', {
        [className]: className,
        'center': center,
        'content--extra-narrow': content && content.includes('extra-narrow'),
        'content--narrow': content && content.includes('narrow'),
        'content--fit-screen': content && content.includes('fit-screen')
    });

    return (
        <div className={classes}>
            {children}
        </div>
    )
}

export default Container;
