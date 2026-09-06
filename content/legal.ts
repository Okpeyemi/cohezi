import type { LegalPage } from './types';

/** Adresse de contact affichée publiquement. Doit être routée par le catch-all du domaine. */
export const contactEmail = 'contact@cohezi.io';

/**
 * Hébergeur du site. Coordonnées relevées dans les conditions de service de Vercel.
 * À corriger ici, et nulle part ailleurs, si l'hébergement change.
 */
export const host = {
  name: 'Vercel Inc.',
  address: '440 N Barranca Ave #4133, Covina, CA 91723, États-Unis',
  website: 'https://vercel.com',
} as const;

export const legalNotice: LegalPage = {
  slug: 'mentions-legales',
  title: 'Mentions légales',
  intro:
    'Informations sur l’éditeur et l’hébergeur de Cohezi, conformément à la loi pour la confiance dans l’économie numérique.',
  updatedAt: '2026-09-06',
  sections: [
    {
      heading: 'Éditeur du site',
      blocks: [
        {
          type: 'paragraph',
          text: `Cohezi est édité à titre non professionnel par une personne physique. Conformément à l’article 6-III-2 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique, l’éditeur a communiqué son identité à l’hébergeur du site et peut, à ce titre, ne pas la rendre publique. Cette identité est tenue à la disposition de toute autorité judiciaire qui en ferait la demande.`,
        },
        {
          type: 'paragraph',
          text: `Pour toute question relative au site ou à son contenu, écrivez à ${contactEmail}.`,
        },
      ],
    },
    {
      heading: 'Hébergeur',
      blocks: [
        {
          type: 'paragraph',
          text: `Le site est hébergé par ${host.name}, ${host.address} (${host.website}).`,
        },
      ],
    },
    {
      heading: 'Nature du contenu',
      blocks: [
        {
          type: 'paragraph',
          text: 'Cohezi publie des résumés d’actualité rédigés à partir de sources tierces, systématiquement citées et liées en fin d’article. Aucun texte de ces sources n’est reproduit : seuls les faits, les chiffres, les noms propres et les citations attribuées sont repris.',
        },
        {
          type: 'paragraph',
          text: 'Malgré le soin apporté à la vérification, une erreur reste possible. Si vous en constatez une, signalez-la à l’adresse de contact : elle sera corrigée et la correction sera signalée.',
        },
      ],
    },
    {
      heading: 'Propriété intellectuelle',
      blocks: [
        {
          type: 'paragraph',
          text: 'Les textes publiés sur Cohezi sont la propriété de l’éditeur. Les marques, noms et logos des organisations citées appartiennent à leurs titulaires respectifs et ne sont mentionnés qu’à des fins d’information.',
        },
      ],
    },
  ],
};

export const privacyPolicy: LegalPage = {
  slug: 'politique-de-confidentialite',
  title: 'Politique de confidentialité',
  intro:
    'Ce que devient votre adresse e-mail si vous vous inscrivez à la newsletter, et comment reprendre la main dessus.',
  updatedAt: '2026-09-07',
  sections: [
    {
      heading: 'En résumé',
      blocks: [
        {
          type: 'paragraph',
          text: 'Cohezi ne collecte qu’une seule donnée, votre adresse e-mail, et uniquement si vous la saisissez vous-même dans le formulaire d’inscription à la newsletter. Aucun cookie de mesure d’audience, aucun traceur publicitaire, aucun profilage. La navigation sur le site ne demande rien et n’enregistre rien.',
        },
      ],
    },
    {
      heading: 'Données collectées et finalité',
      blocks: [
        {
          type: 'paragraph',
          text: 'La seule donnée personnelle traitée est votre adresse e-mail. Elle sert exclusivement à vous envoyer la newsletter de Cohezi. Elle n’est ni vendue, ni louée, ni transmise à des tiers à des fins commerciales.',
        },
        {
          type: 'paragraph',
          text: 'La base légale de ce traitement est votre consentement, au sens de l’article 6.1.a du règlement général sur la protection des données. Ce consentement passe par une double confirmation : après avoir saisi votre adresse, vous recevez un courriel et devez cliquer sur le lien qu’il contient. Sans ce clic, aucune inscription n’est enregistrée et votre adresse n’est pas conservée. Vous pouvez retirer votre consentement à tout moment.',
        },
      ],
    },
    {
      heading: 'Qui traite vos données',
      blocks: [
        {
          type: 'paragraph',
          text: 'Le responsable du traitement est l’éditeur du site, joignable à ' + contactEmail + '.',
        },
        {
          type: 'paragraph',
          text: 'Trois prestataires interviennent techniquement, en qualité de sous-traitants :',
        },
        {
          type: 'list',
          items: [
            'Brevo, pour la gestion de la liste d’abonnés et l’envoi de la newsletter. Cette société est française et ses serveurs sont situés dans l’Union européenne.',
            `${host.name}, pour l’hébergement du site. Cette société est établie aux États-Unis : la consultation du site implique donc un transfert de données hors de l’Union européenne, encadré par les clauses contractuelles types de la Commission européenne.`,
            `Hostinger, pour la messagerie du domaine. Elle n’intervient pas dans la newsletter, mais reçoit les courriels que vous adressez à ${contactEmail}. Ses serveurs sont situés dans l’Union européenne.`,
          ],
        },
      ],
    },
    {
      heading: 'Durée de conservation',
      blocks: [
        {
          type: 'paragraph',
          text: 'Votre adresse est conservée tant que vous restez inscrit. Chaque newsletter porte un lien de désinscription : un clic suffit. Votre adresse est supprimée dans le mois qui suit votre désinscription ou votre demande d’effacement. Si la newsletter cessait de paraître, l’ensemble des adresses serait supprimé.',
        },
      ],
    },
    {
      heading: 'Vos droits',
      blocks: [
        {
          type: 'paragraph',
          text: 'Le règlement général sur la protection des données vous reconnaît plusieurs droits sur vos données :',
        },
        {
          type: 'list',
          items: [
            'accéder aux données vous concernant et en obtenir une copie ;',
            'les faire rectifier si elles sont inexactes ;',
            'les faire effacer ;',
            'vous opposer à leur traitement ou en demander la limitation ;',
            'retirer votre consentement à tout moment, sans avoir à vous justifier.',
          ],
        },
        {
          type: 'paragraph',
          text: `Pour exercer l’un de ces droits, écrivez à ${contactEmail}. Une réponse vous sera apportée dans un délai d’un mois. Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la Commission nationale de l’informatique et des libertés, 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07, ou en ligne sur cnil.fr.`,
        },
      ],
    },
    {
      heading: 'Cookies',
      blocks: [
        {
          type: 'paragraph',
          text: 'Cohezi ne dépose aucun cookie de mesure d’audience ni de publicité. Aucun bandeau de consentement n’est donc nécessaire : il n’y a rien à accepter ni à refuser.',
        },
      ],
    },
  ],
};

export const legalPages: LegalPage[] = [legalNotice, privacyPolicy];
