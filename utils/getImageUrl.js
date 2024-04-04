const imagekitBaseUrl = "https://ik.imagekit.io/minite";

/**
 * Get image kit url
 * @param {string} year 
 * @param {string} image 
 * @returns image src url
 */
const getImageUrl = (year, image) => {
    return `${imagekitBaseUrl}/Minite/${year}/${image}`;
}

export default getImageUrl

