const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    const parent = getNode(node.parent)
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
    createNodeField({
      node,
      name: 'collection',
      value: parent.sourceInstanceName,
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions

    // Posts query
    const posts = await graphql(
      `
        {
          allMarkdownRemark(filter:{frontmatter: {draft: {ne: true}}, fields: {collection: {eq: "posts"}}}) {
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
    if (posts.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`)
      return
    }

    // Create pages for each markdown file.
    const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)
    posts.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: `/posts${node.fields.slug}`,
        component: blogPostTemplate,
        context: {
          slug: node.fields.slug,
        },
      })
    })

    const pages = await graphql(
      `
        {
          allMarkdownRemark(filter: {fields: {collection: {eq: "pages"}}}) {
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
    if (pages.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`)
      return
    }

    // Create pages for each markdown file.
    const pageTemplate = path.resolve(`src/templates/page.js`)
    pages.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: pageTemplate,
        context: {
          slug: node.fields.slug,
        },
      })
    })
  }