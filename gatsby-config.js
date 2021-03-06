module.exports = {
  siteMetadata: {
    author: `Matúš Námešný`,
    user: "hello",
    hostname: "namesny.com",
    email: "matus@namesny.com",
    social: [
      {
        name: "github",
        link: "https://github.com/LordMathis",
      },
      {
        name: "codepen",
        link: "https://codepen.io/LordMathis/",
      },
      {
        name: "linkedin",
        link: "https://www.linkedin.com/in/mat%C3%BA%C5%A1-n%C3%A1me%C5%A1n%C3%BD-3903b6128/",
      }
    ],
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/content/pages`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        filter: node => node.sourceInstanceName === `pages`,
        type: `MarkdownPage`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        filter: node => node.sourceInstanceName === `posts`,
        excerpt_separator: `<!-- end -->`,
        type: `BlogPost`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon-32x32.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-sass`,
  ],
}
