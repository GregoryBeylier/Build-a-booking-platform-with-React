import { Conversation } from "@/lib/api";

/**
 * Conversations fictives utilisées par la page Messages en attendant
 * une véritable API de messagerie.
 */
export const mockConversations: Conversation[] = [
  {
    id: 1,
    hostId: 1,
    name: "Nathalie Jean",
    picture:
      "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/profile-picture-12.jpg",
    unread: false,
    messages: [
      {
        id: 1,
        senderId: 2,
        content:
          "Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?",
        createdAt: "2026-08-03T11:04:03",
      },
      {
        id: 2,
        senderId: 1,
        content: "Bonjour, oui l'appartement est disponible à ces dates là.",
        createdAt: "2026-08-03T11:15:00",
      },
      {
        id: 3,
        senderId: 2,
        content:
          "Parfait, je confirme ma réservation pour le 12 au 14 octobre !",
        createdAt: "2026-08-06T11:06:17",
      },
      {
        id: 4,
        senderId: 1,
        content:
          "Très bien, réservation confirmée. Je vous envoie les instructions d'arrivée la veille.",
        createdAt: "2026-08-06T11:20:00",
      },
      {
        id: 5,
        senderId: 2,
        content: "Merci beaucoup, à bientôt !",
        createdAt: "2026-08-06T11:22:00",
      },
    ],
  },
  {
    id: 8,
    hostId: 8,
    name: "Victor Moran",
    picture:
      "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/profile-picture-7.jpg",
    unread: false,
    messages: [
      {
        id: 1,
        senderId: 2,
        content: "Bonjour, le logement accepte-t-il les animaux ?",
        createdAt: "2026-08-03T09:10:00",
      },
      {
        id: 2,
        senderId: 8,
        content: "Bonjour, oui les animaux sont acceptés sans supplément.",
        createdAt: "2026-08-03T09:40:00",
      },
      {
        id: 3,
        senderId: 2,
        content:
          "Parfait, je confirme ma réservation du 12 au 14 octobre alors !",
        createdAt: "2026-08-06T11:06:29",
      },
      {
        id: 4,
        senderId: 8,
        content:
          "Parfait, je confirme votre réservation du 12 au 14 octobre ! Je vous laisse suivre les étapes du site, merci à vous, bonne journée.",
        createdAt: "2026-08-06T11:10:00",
      },
    ],
  },
  {
    id: 3,
    hostId: 3,
    name: "Franck Maher",
    picture:
      "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/profile-picture-2.jpg",
    unread: true,
    messages: [
      {
        id: 1,
        senderId: 2,
        content: "Bonjour, est-il possible d'arriver après 20h ?",
        createdAt: "2026-08-10T18:00:00",
      },
      {
        id: 2,
        senderId: 3,
        content: "Bonjour, oui aucun souci, il y a une boîte à clés.",
        createdAt: "2026-08-10T18:30:00",
      },
      {
        id: 3,
        senderId: 2,
        content: "Super, merci beaucoup !",
        createdAt: "2026-08-10T18:32:00",
      },
      {
        id: 4,
        senderId: 3,
        content: "Avec plaisir, bon séjour à vous !",
        createdAt: "2026-08-10T18:35:00",
      },
    ],
  },
  {
    id: 10,
    hostId: 10,
    name: "Karen Guillet",
    picture:
      "https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/profile-picture-9.jpg",
    unread: true,
    messages: [
      {
        id: 1,
        senderId: 10,
        content:
          "Bonjour, merci pour votre réservation ! N'hésitez pas si vous avez des questions avant votre arrivée.",
        createdAt: "2026-08-12T14:00:00",
      },
      {
        id: 2,
        senderId: 2,
        content: "Merci beaucoup, tout est clair pour l'instant !",
        createdAt: "2026-08-12T14:20:00",
      },
    ],
  },
];
