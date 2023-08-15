const axios = require('axios');

/**
 * @param {string} url 
 */
async function getUrl(url) {
    const response = await axios.get(url);
    return response.data;
}

/**
 * @param {string} subreddit 
 * @returns {Promise<Array>}
 */
async function getSubredditPosts(subreddit) {
    const data = await getUrl(`https://www.reddit.com/r/linuxmemes/new.json`);

    const posts = data.data.children.map(post => {
        return {
            title: post.data.title,
            url: `https://reddit.com${post.data.permalink}`,
            image: post.data.url || null,
        }
    })

    return posts;
} 

/**
 * @param {string} subreddit
 * @returns {Promise<Array>}
*/
async function getSubredditPostsRaw(subreddit) {
    const data = await getUrl(`https://www.reddit.com/r/${subreddit}/new.json`);

    const posts = data.data.children;

    return posts;
}

module.exports = {
    getSubredditPosts,
    getSubredditPostsRaw,
}