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

/**
 * @param {string} subreddit
 * @param {string} time
*/
async function getSubredditTopPosts(subreddit, time) {
    const data = await getUrl(`https://www.reddit.com/r/${subreddit}/top.json?t=${time}`);

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
 * @param {string} time
*/
async function getSubredditTopPostsRaw(subreddit, time) {
    const data = await getUrl(`https://www.reddit.com/r/${subreddit}/top.json?t=${time}`);

    const posts = data.data.children;

    return posts;
}

/**
 * @param {string} subreddit
*/
async function getSubredditHotPosts(subreddit) {
    const data = await getUrl(`https://www.reddit.com/r/${subreddit}/hot.json`);

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
*/
async function getSubredditHotPostsRaw(subreddit) {
    const data = await getUrl(`https://www.reddit.com/r/${subreddit}/hot.json`);

    const posts = data.data.children;

    return posts;
}

/**
 * @param {string} subreddit
*/
async function getSubredditRisingPosts(subreddit) {
    const data = await getUrl(`https://www.reddit.com/r/${subreddit}/rising.json`);

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
*/
async function getSubredditRisingPostsRaw(subreddit) {
    const data = await getUrl(`https://www.reddit.com/r/${subreddit}/rising.json`);

    const posts = data.data.children;

    return posts;
}

module.exports = {
    getSubredditPosts,
    getSubredditPostsRaw,
    getSubredditTopPosts,
    getSubredditTopPostsRaw,
    getSubredditHotPosts,
    getSubredditHotPostsRaw,
    getSubredditRisingPosts,
    getSubredditRisingPostsRaw,
}