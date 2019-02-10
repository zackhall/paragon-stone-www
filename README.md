# Paragon Stone – Manufacturer of Fine Architectural Stone Veener Products

This is a repository for the code used to build the [Paragon Stone](https://paragonstone.com/) website. If you are looking to learn more, you should visit the Paragon Stone website at:

https://paragonstone.com/

There you can find a full-listing of Paragon Stone's [Architectural Stone Veneer Products](https://paragonstone.com/).

| Product | Sample |
| --- | --- |
| [Ashlar Stone](https://paragonstone.com/product/ashlar-stone/) | [<img src="/static/img/sample_catalpa-ashlar-stone.jpg?raw=true" width="200">](https://paragonstone.com/product/ashlar-stone/) |
| [Brick](https://paragonstone.com/product/brick/) | [<img src="/static/img/sample_old-town-red-brick.jpg?raw=true" width="200">](https://paragonstone.com/product/brick/) |
| [Fieldstone](https://paragonstone.com/product/fieldstone/) | [<img src="/static/img/sample_amaretto-fieldstone.jpg?raw=true" width="200">](https://paragonstone.com/product/fieldstone/) |
| [Limestone](https://paragonstone.com/product/limestone/) | [<img src="/static/img/sample_Brandywine-Limestone.jpg?raw=true" width="200">](https://paragonstone.com/product/limestone/) |
| [Ledgestone](https://paragonstone.com/product/ledgestone/) | [<img src="/static/img/sample_poplar-bluff-ledgestone.jpg?raw=true" width="200">](https://paragonstone.com/product/ledgestone/) |
| [Manor Stone](https://paragonstone.com/product/manor-stone/) | [<img src="/static/img/sample_cinder-manor-stone.jpg?raw=true" width="200">](https://paragonstone.com/product/manor-stone/) |
| [Prairie Stone](https://paragonstone.com/product/prairie-stone/) | [<img src="/static/img/sample_auburn-prairie-stone.jpg?raw=true" width="200">](https://paragonstone.com/product/prairie-stone/) |
| [River Rock](https://paragonstone.com/product/river-rock/) | [<img src="/static/img/sample_hickory-river-rock.jpg?raw=true" width="200">](https://paragonstone.com/product/river-rock/) |
| [Stack Ledge](https://paragonstone.com/product/stack-ledge/) | [<img src="/static/img/sample_Stillwood-Stack-Ledge.jpg?raw=true" width="200">](https://paragonstone.com/product/stack-ledge/) |
| [Stackstone or Stacked Stone](https://paragonstone.com/product/stackstone/) | [<img src="/static/img/sample_birch-stackstone.jpg?raw=true" width="200">](https://paragonstone.com/product/stackstone/) |
| [Summit Ledge](https://paragonstone.com/product/summit-ledge/) | [<img src="/static/img/sample_laredo-summit-ledge.jpg?raw=true" width="200">](https://paragonstone.com/product/summit-ledge/) |



## Gatsby + Netlify CMS Starter

**Note:** This starter uses the [Gatsby v2 Beta](https://www.gatsbyjs.org/blog/2018-06-16-announcing-gatsby-v2-beta-launch/).

This repo contains an example business website that is built with [Gatsby](https://www.gatsbyjs.org/), and [Netlify CMS](https://www.netlifycms.org): **[Demo Link](https://gatsby-netlify-cms.netlify.com/)**.

It follows the [JAMstack architecture](https://jamstack.org) by using Git as a single source of truth, and [Netlify](https://www.netlify.com) for continuous deployment, and CDN distribution.

### Prerequisites

- Node (I recommend using v8.2.0 or higher)
- [Gatsby CLI](https://www.gatsbyjs.org/docs/)

### Getting Started (Recommended)

Netlify CMS can run in any frontend web environment, but the quickest way to try it out is by running it on a pre-configured starter site with Netlify. The example here is the Kaldi coffee company template (adapted from [One Click Hugo CMS](https://github.com/netlify-templates/one-click-hugo-cms)). Use the button below to build and deploy your own copy of the repository:

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/AustinGreen/gatsby-starter-netlify-cms&amp;stack=cms"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>

After clicking that button, you’ll authenticate with GitHub and choose a repository name. Netlify will then automatically create a repository in your GitHub account with a copy of the files from the template. Next, it will build and deploy the new site on Netlify, bringing you to the site dashboard when the build is complete. Next, you’ll need to set up Netlify’s Identity service to authorize users to log in to the CMS.

#### Access Locally
```
$ git clone https://github.com/[GITHUB_USERNAME]/[REPO_NAME].git
$ cd [REPO_NAME]
$ yarn
$ npm run develop
```
To test the CMS locally, you'll need run a production build of the site:
```
$ npm run build
$ npm run serve
```

### Getting Started (Without Netlify)
```
$ gatsby new [SITE_DIRECTORY_NAME] https://github.com/AustinGreen/gatsby-starter-netlify-cms/
$ cd [SITE_DIRECTORY_NAME]
$ npm run build
$ npm run serve
```

#### Setting up the CMS
Follow the [Netlify CMS Quick Start Guide](https://www.netlifycms.org/docs/quick-start/#authentication) to set up authentication, and hosting.

### Debugging
Windows users might encounter ```node-gyp``` errors when trying to npm install.
To resolve, make sure that you have both Python 2.7 and the Visual C++ build environment installed.
```
npm config set python python2.7
npm install --global --production windows-build-tools
```

[Full details here](https://www.npmjs.com/package/node-gyp 'NPM node-gyp page')
