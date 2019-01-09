module.exports = {
  siteMetadata: {
    title: 'Starter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CF_SPACE || 'l0nhnluxx121',
        accessToken: process.env.CF_TOKEN || '5f0a1722a0d7b5d4dd98b2226a8784b308ddc4aeeac4b514772a6fb690445b40'
      },
    },
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`title`, `slug`, `publishDate`],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields` values
          ContentfulBlog: {
            title: node => node.title,
            slug: node => node.slug,
            publishDate: node => node.publishDate,
          },
        },
      },
    },
    'gatsby-transformer-remark',
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-styled-components'
  ],
}