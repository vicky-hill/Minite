import React from 'react'
import classNames from 'classnames'

/**
 * @typedef {'primary' | 'secondary'} VariantType
 * @typedef {'regular' | 'small' | 'big' } SizeType
 */

/**
 * Button
 * @param {object} props
 * @param {VariantType} props.variant
 * @param {SizeType} props.size
 * @param {boolean} props.outline
 * @param {boolean} props.round
 * @param {boolean} props.loading
 * @param {boolean} props.block
 */
const Button = ({ children, variant = 'primary', size = 'regular', className, outline, round, loading, block, gradient, ...props }) => {

    const classes = classNames('btn', {
        [className]: className,
        [`btn-${variant}`]: variant,
        [`btn-${variant}-outline`]: true && outline,
        [`btn--${size}`]: true && size !== 'regular',
        [`btn--gradient-${gradient}`]: gradient,
        'btn--loading': loading,
        'btn--round': round,
        'btn--block': block
    });

    return (
        <button className={classes} {...props} >
            <span className="btn-text">
                {children}
            </span>
        </button>
    )
}

export default Button;
