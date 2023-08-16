const redditTools = require('../tools.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'subreddit',
    description: 'A bunch of tools with subreddits',

    options: [
        {
            name: 'new',
            description: 'Get the newest posts from a subreddit',
            type: 1,
            options: [
                {
                    name: 'subreddit',
                    description: 'The subreddit to get the posts from',
                    type: 3,
                    required: true
                },
                {
                    name: 'limit',
                    description: 'The amount of posts to get',
                    type: 4,
                    min_value: 1,
                    max_value: 10,
                    required: false
                }
            ]
        },
        {
            name: 'top',
            description: 'Get the top posts from a subreddit',
            type: 1,
            options: [
                {
                    name: 'subreddit',
                    description: 'The subreddit to get the posts from',
                    type: 3,
                    required: true
                },
                {
                    name: 'limit',
                    description: 'The amount of posts to get',
                    type: 4,
                    min_value: 1,
                    max_value: 10,
                    required: false
                },
                {
                    name: 'time',
                    description: 'The time to get the posts from',
                    type: 3,
                    choices: [
                        {
                            name: 'Now',
                            value: 'hour'
                        },
                        {
                            name: 'Today',
                            value: 'day'
                        },
                        {
                            name: 'This week',
                            value: 'week'
                        },
                        {
                            name: 'This month',
                            value: 'month'
                        },
                        {
                            name: 'This year',
                            value: 'year'
                        },
                        {
                            name: 'All time',
                            value: 'all'
                        }
                    ]
                }
            ]
        },
        {
            name: 'hot',
            description: 'Get the hottest posts from a subreddit',
            type: 1,
            options: [
                {
                    name: 'subreddit',
                    description: 'The subreddit to get the posts from',
                    type: 3,
                    required: true
                },
                {
                    name: 'limit',
                    description: 'The amount of posts to get',
                    type: 4,
                    min_value: 1,
                    max_value: 10,
                    required: false
                }
            ]
        },
        {
            name: 'rising',
            description: 'Get the rising posts from a subreddit',
            type: 1,
            options: [
                {
                    name: 'subreddit',
                    description: 'The subreddit to get the posts from',
                    type: 3,
                    required: true
                },
                {
                    name: 'limit',
                    description: 'The amount of posts to get',
                    type: 4,
                    min_value: 1,
                    max_value: 10,
                }
            ]
        }
    ],

    execute: async (interaction, client) => {
        interaction.deferReply({
            ephemeral: true
        }); // Defer the reply to make sure the interaction doesn't get timed out
        const subCommand = interaction.options.getSubcommand();

        if (subCommand === 'new') {
            const subreddit = interaction.options.getString('subreddit').toLowerCase();
            const limit = interaction.options.getInteger('limit') || 5;

            const posts = await redditTools.getSubredditPostsRaw(subreddit);

            if (posts.length === 0) {
                return interaction.editReply({
                    content: 'No posts found',
                    ephemeral: true
                });
            }

            const embeds = [];

            posts.forEach(post => {
                const currentPosts = embeds.length;
                if (currentPosts === limit) return;

                const embed = new EmbedBuilder()
                    .setTitle(post.data.title)
                    .setURL(`https://reddit.com${post.data.permalink}`)
                    .setAuthor({
                        name: post.data.author,
                    })
                    .setFooter({
                        text: `👍 ${post.data.ups} | 💬 ${post.data.num_comments}`
                    })
                    .setTimestamp(post.data.created_utc * 1000);

                if (post.data.selftext) {
                    embed.setDescription(post.data.selftext);
                } else if (post.data.url) {
                    embed.setImage(post.data.url);
                }

                embeds.push(embed);
            })

            interaction.editReply({
                content: `Showing ${embeds.length} post${embeds.length == 1 ? '' : 's'} from r/${subreddit}`,
                embeds: embeds,
                ephemeral: true
            });
        }

        if (subCommand === 'top') {
            const subreddit = interaction.options.getString('subreddit').toLowerCase();
            const limit = interaction.options.getInteger('limit') || 5;
            const time = interaction.options.getString('time') || 'day';

            const posts = await redditTools.getSubredditTopPostsRaw(subreddit, time);

            if (posts.length === 0) {
                return interaction.editReply({
                    content: 'No posts found',
                    ephemeral: true
                });
            }

            const embeds = [];

            posts.forEach(post => {
                const currentPosts = embeds.length;
                if (currentPosts === limit) return;

                const embed = new EmbedBuilder()
                    .setTitle(post.data.title)
                    .setURL(`https://reddit.com${post.data.permalink}`)
                    .setAuthor({
                        name: post.data.author,
                    })
                    .setFooter({
                        text: `👍 ${post.data.ups} | 💬 ${post.data.num_comments}`
                    })
                    .setTimestamp(post.data.created_utc * 1000);

                if (post.data.selftext) {
                    embed.setDescription(post.data.selftext);
                } else if (post.data.url) {
                    embed.setImage(post.data.url);
                }

                embeds.push(embed);
            })

            interaction.editReply({
                content: `Showing ${embeds.length} post${embeds.length == 1 ? '' : 's'} from r/${subreddit}`,
                embeds: embeds,
                ephemeral: true
            });
        }

        if (subCommand === 'hot') {
            const subreddit = interaction.options.getString('subreddit').toLowerCase();
            const limit = interaction.options.getInteger('limit') || 5;

            const posts = await redditTools.getSubredditHotPostsRaw(subreddit);

            if (posts.length === 0) {
                return interaction.editReply({
                    content: 'No posts found',
                    ephemeral: true
                });
            }

            const embeds = [];

            posts.forEach(post => {
                const currentPosts = embeds.length;
                if (currentPosts === limit) return;

                const embed = new EmbedBuilder()
                    .setTitle(post.data.title)
                    .setURL(`https://reddit.com${post.data.permalink}`)
                    .setAuthor({
                        name: post.data.author,
                    })
                    .setFooter({
                        text: `👍 ${post.data.ups} | 💬 ${post.data.num_comments}`
                    })
                    .setTimestamp(post.data.created_utc * 1000);

                if (post.data.selftext) {
                    embed.setDescription(post.data.selftext);
                } else if (post.data.url) {
                    embed.setImage(post.data.url);
                }

                embeds.push(embed);
            })

            interaction.editReply({
                content: `Showing ${embeds.length} post${embeds.length == 1 ? '' : 's'} from r/${subreddit}`,
                embeds: embeds,
                ephemeral: true
            });
        }

        if (subCommand === 'rising') {
            const subreddit = interaction.options.getString('subreddit').toLowerCase();
            const limit = interaction.options.getInteger('limit') || 5;

            const posts = await redditTools.getSubredditRisingPostsRaw(subreddit);

            if (posts.length === 0) {
                return interaction.editReply({
                    content: 'No posts found',
                    ephemeral: true
                });
            }

            const embeds = [];

            posts.forEach(post => {
                const currentPosts = embeds.length;
                if (currentPosts === limit) return;

                const embed = new EmbedBuilder()
                    .setTitle(post.data.title)
                    .setURL(`https://reddit.com${post.data.permalink}`)
                    .setAuthor({
                        name: post.data.author,
                    })
                    .setFooter({
                        text: `👍 ${post.data.ups} | 💬 ${post.data.num_comments}`
                    })
                    .setTimestamp(post.data.created_utc * 1000);

                if (post.data.selftext) {
                    embed.setDescription(post.data.selftext);
                } else if (post.data.url) {
                    embed.setImage(post.data.url);
                }

                embeds.push(embed);
            })

            interaction.editReply({
                content: `Showing ${embeds.length} post${embeds.length == 1 ? '' : 's'} from r/${subreddit}`,
                embeds: embeds,
                ephemeral: true
            });
        }
    }
}