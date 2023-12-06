const path = require(`path`);

// @desc: Create Routes from WP for all countries and pass pageContext to template
// @return: null
const faqsRoutesInit = async (graphql, createPage) => {
  const result = await graphql(`
    {
      allContentfulFaq {
        nodes {
          id
          slug
          type
          country {
            code
          }
          product {
            category
            name
          }
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // function to create pages from a WP parent node and a specific template
  const templatePath = `./src/pages/templates/faqs-template.js`;
  const template = path.resolve(templatePath);

  result.data.allContentfulFaq.nodes.forEach((node) => {
    const { id, slug, country, product, type } = node;
    if (!country && !slug) return;
    const sslCountries = ["cl", "pe", "ar", "co", "ec", "do", "cr", "pa", "mx"];
    let path = `/${country.code}/help-center/${slug}`;

    if (sslCountries.includes(country.code)){
      path = `/${country.code}/centro-de-ayuda/${slug}/`;
    }

    if (product && product[0].category[0] === "food" || type && type[0] === "food"){
      path = `/${country.code}/food/restaurantes/preguntas-frecuentes/${slug}/`;
    }

    // if (product && product[0].category[0] === "food" && product[0].name === "DiDi Restaurant Tienda"){
    //   path = `/${country.code}/delivery/preguntas-frecuentes/${slug}/`;
    // }

    if(product && product[0].category[0] === "food" && product[0].name === "DiDi Restaurant Repartidores"){
      path = `/${country.code}/food/repartidores/preguntas-frecuentes/${slug}`
    }

    if (type && type[0] === "prestamos") {
      path = `/${country.code}/prestamos/preguntas-frecuentes/${slug}/`;
    }

    if (type && type[0] === "pay") {
      path = `/${country.code}/didipay/preguntas-frecuentes/${slug}/`;
    }

    if(type && type[0] === "delivery"){
      path = `/${country.code}/food/repartidores/preguntas-frecuentes/${slug}`
    }

    if(type && type[0] === "card"){
      path = `/${country.code}/tarjeta-de-credito/preguntas-frecuentes/${slug}`
    }


    createPage({
      path: path,
      component: template,
      context: {
        id: id,
        countryCode: country.code,
      },
    });
  });
};

module.exports.init = faqsRoutesInit;
