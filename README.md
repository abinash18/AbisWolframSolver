# Abis Wolfram Solver

## A free wolfram full results and step by step api resolver.

Fully frontend no suspicious proxy like the other repo [here](https://github.com/WolfreeAlpha)

This program is completely rebuilt with a reformed UI and is a fully single page application.

Since I removed the CORS Proxy by using jQuery's AJAX the requests to the api return faster and there is no worry of you cookies being stolen or your IP being logged. All traffic is either going from or into your computer. Except github pages hosting the site.

All javascript is perfusly documented and unobscured so you can look through it to verify theres no funny business. Except the css it is minified.

Albeit I still give credit to the original creator for the API keys. Since one key only allows 2000 api calls a month, I am using the ones from the original repo.

TODO:
- Add page static downloading
  - Export to markdown
  - Export static html with embedded js
  - Export to PDF
- Add Infos
- Add drop down for copy to clipboard single pod
  - Latex
  - MathML
  - Inline Markdown
  - Inline Latex 

- Add drop down for downloading single pod
  - Export SVG
  - Export Markdown
  - Export PNG

- Add support for hiding steps.

- Add support for step by step solutions as in having a next step and previous step button for applicable pods.
- Implement this type of loading bar https://stackoverflow.com/questions/38311590/animating-linear-gradient-to-create-a-loading-bar
- Implement support for singular pod state change.
- Perfect mobile use
- Add support for drawing equations
- Add support for Image recognition of math as input. OCR.space
- Make script more verbose.
- Make it save previous states.