import { contactEmail } from './legal';
import type { StaticPage } from './types';

export const aboutPage: StaticPage = {
  slug: 'a-propos',
  title: 'À propos',
  intro:
    'Cohezi résume l’actualité de l’intelligence artificielle en français, en citant ses sources. Voici comment.',
  sections: [
    {
      heading: 'Ce qu’est Cohezi',
      blocks: [
        {
          type: 'paragraph',
          text: 'Cohezi est un média d’actualité consacré à l’intelligence artificielle. Il paraît trois fois par semaine et couvre quatre domaines : l’actualité des produits et de la technique, le business et les financements, les usages et leurs effets sur la société, et les analyses de fond — régulation, droit, méthode.',
        },
        {
          type: 'paragraph',
          text: 'Le pari est simple. Le sujet produit chaque jour plus de communiqués que de faits, et plus d’annonces que de résultats. Nous ne cherchons pas à tout couvrir, mais à trier, à replacer dans son contexte, et à dire d’où vient chaque information.',
        },
      ],
    },
    {
      heading: 'Comment un article est fabriqué',
      blocks: [
        {
          type: 'paragraph',
          text: 'Cohezi ne va pas sur le terrain. Nous n’avons ni interview exclusive, ni document de première main : notre travail est la sélection, la synthèse et la mise en perspective de ce que d’autres ont établi. Ce statut d’agrégateur impose des règles strictes, que voici en entier.',
        },
        {
          type: 'list',
          items: [
            'Chaque article cite une à quatre sources, nommées et liées en fin de page. Quand il n’en existe qu’une, elle est nommée dans le texte, pour que vous sachiez que tout repose sur elle.',
            'Aucune phrase d’un article source n’est reproduite. Les corps sont rédigés intégralement par nous à partir des faits.',
            'Sont repris tels quels, et uniquement cela : les chiffres, les noms propres, et les citations de personnes — courtes, entre guillemets, toujours attribuées à leur auteur et au média qui les a recueillies.',
            'Chaque source est rechargée et relue au moment d’écrire, pas seulement au moment où le sujet a été repéré.',
            'Une projection n’est jamais présentée comme une mesure. Un chiffre d’affaires prévisionnel est qualifié comme tel.',
          ],
        },
      ],
    },
    {
      heading: 'Quand les sources se contredisent',
      blocks: [
        {
          type: 'paragraph',
          text: 'Nous rapportons l’écart au lieu de choisir un camp. C’est souvent là que se trouve l’information la plus utile.',
        },
        {
          type: 'paragraph',
          text: 'Un exemple réel, tiré de notre couverture de GPT-6 Astra : Numerama, reprenant les chiffres d’OpenAI, annonçait 98,6 % à l’épreuve ARC-AGI-3. Next, citant le rapport de l’ARC Prize Foundation, donnait 62,7 % avec le harnais d’évaluation standard, et 99,9 % avec un harnais adapté au fournisseur. Aucun des deux ne se trompait. L’article donne les deux chiffres et explique que le protocole change le résultat — ce qui en dit plus long sur les annonces de performance que n’importe lequel des deux pris isolément.',
        },
      ],
    },
    {
      heading: 'Ce que Cohezi ne fait pas',
      blocks: [
        {
          type: 'list',
          items: [
            'Aucune publicité n’est diffusée sur le site à ce jour, et aucun contenu n’est sponsorisé.',
            'Aucune photographie de presse n’est reprise : les visuels des articles sont générés, faute de droits sur les images des agences.',
            'Aucun cookie de mesure d’audience ni de publicité n’est déposé. La fréquentation est mesurée sans rien écrire sur votre appareil.',
          ],
        },
        {
          type: 'paragraph',
          text: 'L’éditeur du site n’est pas nommé publiquement. Cohezi est publié à titre non professionnel, régime qui permet de ne communiquer son identité qu’à l’hébergeur — laquelle reste à la disposition de toute autorité judiciaire. Ce choix vaut tant que le site ne dégage aucun revenu.',
        },
        {
          type: 'paragraph',
          text: `Vous avez repéré une erreur ? Signalez-la à ${contactEmail} : elle sera corrigée, et la correction signalée dans l’article — nous ne modifions pas un texte en silence.`,
        },
      ],
    },
  ],
  cta: { label: 'Lire les articles', href: '/articles' },
};

export const contactPage: StaticPage = {
  slug: 'contact',
  title: 'Contact',
  intro: `Une seule adresse, relevée par une personne : ${contactEmail}.`,
  sections: [
    {
      heading: 'Signaler une erreur',
      blocks: [
        {
          type: 'paragraph',
          text: 'C’est le message le plus utile que vous puissiez nous envoyer. Indiquez l’article concerné et ce qui vous paraît faux. Si l’erreur est avérée, elle est corrigée et la correction est signalée dans l’article — nous ne modifions pas un texte en silence.',
        },
      ],
    },
    {
      heading: 'Presse et interventions',
      blocks: [
        {
          type: 'paragraph',
          text: 'Pour une demande de citation, une intervention ou une question sur notre méthode de travail, écrivez à la même adresse en précisant votre échéance. Cohezi étant édité à titre non professionnel, les échanges se font par écrit.',
        },
      ],
    },
    {
      heading: 'Partenariats et publicité',
      blocks: [
        {
          type: 'paragraph',
          text: 'Cohezi ne diffuse aucune publicité et ne publie aucun contenu sponsorisé à ce jour. Les propositions en ce sens n’aboutiront pas, mais les propositions éditoriales — échange de sources, collaboration sur un sujet, signalement d’un document — sont les bienvenues.',
        },
      ],
    },
    {
      heading: 'Vos données',
      blocks: [
        {
          type: 'paragraph',
          text: 'Pour exercer vos droits sur vos données personnelles — accès, rectification, effacement, opposition — écrivez à cette adresse en le précisant. Une réponse vous parviendra dans un délai d’un mois. Le détail figure dans notre politique de confidentialité.',
        },
      ],
    },
  ],
  cta: { label: `Écrire à ${contactEmail}`, href: `mailto:${contactEmail}` },
};

export const staticPages: StaticPage[] = [aboutPage, contactPage];
