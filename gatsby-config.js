module.exports = {
  siteMetadata: {
    title: "kmeans-wall",
  },
  plugins: [
    "gatsby-plugin-theme-ui",
    "gatsby-plugin-sharp",
    "gatsby-plugin-offline",
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/layout`),
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
  ],
};
