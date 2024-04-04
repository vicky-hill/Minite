import NextLink from 'next/link'
import { useSearchParams } from 'next/navigation'

const paths = {
    home() {
        return '/'
    }
}

/**
 * @typedef {'home'} PathType
 */

/**
 * Link
 * @param {object} props
 * @param {PathType} props.path
 * @param {String} props.urlKey
 * @param {string} props.href
 */
export default function Link({ path, name, urlKey, href, children, ...rest }) {
    const searchParams = useSearchParams();
    const clearParams = ['req'];
    let params = '';
    

    searchParams.forEach((value, name) => {
        if (!clearParams.includes(name)) {
            params = !params ? `?${name}=${value}` : `${params}&${name}=${value}`
        }
    })

    const getHref = () => {
        if (href) return href + params;
        if (path) return paths[path](urlKey) + params;
    }

    return (
        <NextLink href={getHref()} {...rest}>
            {children}
        </NextLink>
    )
}

