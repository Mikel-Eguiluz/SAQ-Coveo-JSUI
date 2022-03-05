document.addEventListener('DOMContentLoaded', () => {
  // const englishBtn = document.getElementById('englishBtn')
  // const frenchBtn = document.getElementById('frenchBtn')

  // if (window.location.hash.indexOf('t=tab-french') > 0) {
  //   const script = document.createElement('script')
  //   script.src =
  //     'https://static.cloud.coveo.com/searchui/v2.10091/js/cultures/fr.js'
  //   script.id = `frenchScript`
  //   document.head.append(script)
  //   document.getElementById('frenchScript').addEventListener('load', e => {
  //     String.toLocaleString({
  //       fr: {
  //         'Price Ascending': 'Prix Croissant',
  //         'Price Descending': 'Prix Decroissant',
  //         Availability: 'Disponibilité'
  //       }
  //     })
  //   })
  //   frenchBtn.style.display = 'none'
  // } else {
  //   const script = document.createElement('script')
  //   script.src = `https://static.cloud.coveo.com/searchui/v2.10091/js/cultures/en.js`

  //   document.head.append(script)
  //   englishBtn.style.display = 'none'
  // }
  String.toLocaleString({
    fr: {
      'Price Ascending': 'Prix Croissant',
      'Price Descending': 'Prix Decroissant',
      'Rating Ascending': 'Évaluation Croissant',
      'Rating Descending': 'Évaluation Decroissant',
      Availability: 'Disponibilité',
      Category: 'Catégorie',
      Rating: 'Note des clients',
      Region: 'Région',
      Price: 'Prix',
      // QuickView: 'Vue Rapide',
      'SAQ Code': 'Code SAQ',
      // Filters: 'Filtres',
      '0 stars': '0 étoiles',
      '1 stars': '1 étoiles',
      '2 stars': '2 étoiles',
      '3 stars': '3 étoiles',
      '4 stars': '4 étoiles'
    }
  })

  const root = Coveo.$$(document).find('#search')
  Coveo.SearchEndpoint.configureCloudV2Endpoint(
    'meguiluzcoveocomlightarmadillo8tqfs524',
    'xxa36433b0-6d91-47d7-b77e-8ba9a3508ab7'
  )

  document.addEventListener('afterInitialization', () => {
    Coveo.TemplateHelpers.registerTemplateHelper('addTickOrCross', value => {
      if (value === 'in stock') {
        return `<i class="fa-solid fa-check" style="color: green;font-size: 1.15em;"></i>&nbsp; Available`
      } else {
        return `<i class="fa-solid fa-x" style="color: red;font-size: 1.15em;"></i>&nbsp; Not available`
      }
    })

    Coveo.TemplateHelpers.registerTemplateHelper('starRating', value => {
      return `<div class="star-rating">
              <span style="width: ${value}%"></span>
            </div>`
    })

    const btn = document.getElementById('pageSizeSelect')
    btn.addEventListener('change', e => {
      const resultList = document.querySelectorAll(
        '.coveo-results-per-page-list-item-text'
      )
      Coveo.get(
        document.querySelector('.CoveoResultsPerPage')
      ).setResultsPerPage(e.target.value * 1)
    })
  })
  console.log(String.locale)
  Coveo.init(root, {
    FacetSlider: {
      valueCaption:
        String.locale === 'fr'
          ? v => {
              return +Math.trunc(v[0]) + ' $ - ' + Math.trunc(v[1]) + ' $'
            }
          : v => {
              return '$' + Math.trunc(v[0]) + ' - $' + Math.trunc(v[1])
            }
    },
    ResultsPerPage: {
      choicesDisplayed: [12, 24, 36, 48]
    }
  })
})
