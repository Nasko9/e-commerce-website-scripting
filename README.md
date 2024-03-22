# E-commerce website scripting

This project uses Puppeteer and Node.js to automate and simulate the use of e-commerce platforms.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Setup](#project-setup)
- [Assumptions](#assumptions)
- [Challenges Faced](#challenges-faced)
- [License](#license)
- [Author](#author)

## Installation

To get a local copy up and running follow these simple steps.

```bash
git clone https://github.com/Nasko9/e-commerce-website-scripting
cd e-commerce-website-scripting
npm install
```

## Project Setup

Before you begin, ensure you have the following environment variables set up in a `.env` file:

## Usage

Here's a quick start guide:

```bash
npm start
```

## Assumptions

During the development of this project, we assumed:

1. Users have a basic understanding of Node.js and Puppeteer.
2. The structure of the target website doesn't change frequently.

## Challenges Faced

Throughout the development process, we encountered several challenges:

- **Dynamic Content:** Dealing with AJAX-loaded content required implementing custom wait strategies.
- **CAPTCHAs and Rate Limits:** Overcoming site protections involved using strategies like rotating user agents.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Author

- LinkedIn - [Miloš Nasković](www.linkedin.com/in/milos-naskovic)
