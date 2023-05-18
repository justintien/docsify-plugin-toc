<br />
<div id="top"></div>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors](https://img.shields.io/github/contributors/sg-developer-portal/doc-portal-docsify-plugin-toc.svg)][contributors-url]
[![Forks](https://img.shields.io/github/forks/sg-developer-portal/doc-portal-docsify-plugin-toc.svg)][forks-url]
[![Stargazers](https://img.shields.io/github/stars/sg-developer-portal/doc-portal-docsify-plugin-toc.svg)][stars-url]
[![MIT License](https://img.shields.io/github/license/sg-developer-portal/doc-portal-docsify-plugin-toc.svg)][license-url]
[![npm](https://img.shields.io/npm/v/@developerportalsg/docsify-plugin-toc.svg?style=flat-square)][npm-url]

<!-- PROJECT LOGO -->
<br />

<div align="center">
  <a href="https://github.com/sg-developer-portal/doc-portal-docsify-plugin-toc">
    <img src="src/assets/logo_developer.gov.sg.svg" alt="Logo" height="100">
  </a>
  
  <h3 align="center">Docsify Table of Content Plugin (TOC)</h3>

  <p align="center">
    A Docsify Table Of Content Plugin styled to <a href="https://designsystem.tech.gov.sg/">SGDS Convention</a> for the <a href="https://docs.developer.tech.gov.sg/">Singapore Government Documentation Portal</a>
    <br />
    <br />
    <a href="#Usage">Usage</a>
    ·
    <a href="https://github.com/sg-developer-portal/doc-portal-docsify-plugin-toc/issues">Report Bugs</a>
    ·
    <a href="https://github.com/sg-developer-portal/doc-portal-docsify-plugin-toc/issues">Request Features</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->

## Table of Contents

-   [About The Project](#about-the-project)
-   [Built-With](#built-with)
-   [Contributing](#contributing)
-   [License](#license)
-   [References](#references)

## About the project

Hello there! We are the team behind the Docsify Table of Content Plugin (TOC), styled to SGDS Convention for the Singapore Government Documentation Portal.

Our mission is to provide a comprehensive solution to help organize your documentation and make it easy to navigate through. With our plugin, your readers can easily find the content they need and jump to the desired section with just a click.

We are dedicated to providing a high-quality product, and we welcome any feedback or suggestions to make it even better.

<img width="1440" alt="image" src="src/assets/snapshot.png">

## Usage

1. Configure docsify-plugin-toc:

    ```html
    <script>
    	window.$docsify = {
    		toc: {
    			tocMaxLevel: 5,
    			target: "h2, h3, h4, h5, h6",
    			ignoreHeaders: ["<!-- {docsify-ignore} -->", "<!-- {docsify-ignore-all} -->"],
    		},
    	};
    </script>
    ```

<p align="right">(<a href="#top">back to top</a>)</p>

2. Insert style/script into docsify document:

    ```html
    <!-- head -->
    <!-- Theme -->
    <link
      rel="stylesheet"
      href="//cdn.jsdelivr.net/npm/@sg-developer-portal/doc-theme-default@0.0.13/public/dist/doc.css"
    />
    <!-- Table Of Content -->
    <link rel="stylesheet" href="https://unpkg.com/@developerportalsg/docsify-plugin-toc/dist/light.css" />
    <!-- Also insert you custom css -->

    <!-- body -->
    <script src="https://unpkg.com/@developerportalsg/docsify-plugin-toc/dist/docsify-plugin-toc.min.js"></script>
    ```

<p align="right">(<a href="#top">back to top</a>)</p>

## Options

| Argument        | Type       | Description                                                                                                                                           |
| --------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tocMaxLevel`   | `number`   | The maximum depth of the headings printed on the ToC. If you set `tocMaxLevel` to 3, I recommend you to set `subMaxLevel` to 2 avoid ToC duplication. |
| `target`        | `string`   | The target heading printed on the ToC. It's used as an argument to query DOM with `querySelectorAll()`                                                |
| `ignoreHeaders` | `string[]` | ignore header name keyword list, (e.g. ['develop', /develop/i], support Regular expressions)                                                          |

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

## Built with

Our plugin is built using Docsify, a lightweight documentation generator, along with other technologies such as HTML, JavaScript and CSS.

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

## References

You can find our plugin on GitHub. Please refer to the README file for detailed instructions on how to use it.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/sg-developer-portal/doc-portal-docsify-plugin-toc.svg?style=for-the-badge
[contributors-url]: https://github.com/sg-developer-portal/doc-portal-docsify-plugin-toc/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/sg-developer-portal/doc-portal-docsify-plugin-toc.svg?style=for-the-badge
[forks-url]: https://github.com/sg-developer-portal/doc-portal-docsify-plugin-toc/network/members
[stars-shield]: https://img.shields.io/github/stars/sg-developer-portal/doc-portal-docsify-plugin-toc.svg?style=for-the-badge
[stars-url]: https://github.com/sg-developer-portal/doc-portal-docsify-plugin-toc/stargazers
[issues-shield]: https://img.shields.io/github/issues/sg-developer-portal/doc-portal-docsify-plugin-toc.svg?style=for-the-badge
[issues-url]: https://github.com/sg-developer-portal/doc-portal-docsify-plugin-toc/issues
[license-shield]: https://img.shields.io/github/license/sg-developer-portal/doc-portal-docsify-plugin-toc.svg?style=for-the-badge
[license-url]: https://github.com/sg-developer-portal/docsify-toc-plugin/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[npm-url]: https://www.npmjs.com/package/@developerportalsg/docsify-plugin-toc
