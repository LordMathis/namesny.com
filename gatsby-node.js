const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions

    const result = await graphql(
      `
        {
          allMarkdownRemark(filter: {frontmatter: {draft: {ne: true}}}) {
            edges {
              node {
                fields {
                  slug
                }
              }
            }
          }
        }
      `
    )

    // Handle errors
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`)
      return
    }

    // Create pages for each markdown file.
    const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      console.log(node);  
      createPage({
        path: `/posts${node.fields.slug}`,
        component: blogPostTemplate,
        // In your blog post template's graphql query, you can use pagePath
        // as a GraphQL variable to query for data from the markdown file.
        context: {
          slug: node.fields.slug,
        },
      })
    })
  }